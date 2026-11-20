import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  INVALID_CONSULTATION_DATE_MESSAGE,
  validatePreferredDate,
} from "@/lib/appointment-dates";

type AppointmentBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  preferredDate?: unknown;
  reason?: unknown;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resolveMailConfig() {
  const host = process.env.SMTP_HOST?.trim() || "";
  const portRaw = process.env.SMTP_PORT?.trim();
  const port = portRaw ? Number(portRaw) : NaN;
  const emailUser = process.env.EMAIL_USER?.trim() || "";
  const emailPass = process.env.EMAIL_PASS?.trim() || "";
  const to =
    process.env.APPOINTMENT_TO_EMAIL?.trim() || "agenda@oftalmoale.com";

  // 465 = implicit TLS; 587 = STARTTLS
  const secure = port === 465;

  return { host, port, secure, emailUser, emailPass, to };
}

type AppointmentData = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  reason: string;
};

/**
 * Guarda la solicitud en la agenda del sistema del consultorio
 * (Supabase, tabla `citas`, ver /sistema).
 *
 * Usa la clave anon: la política RLS `citas_solicitud_publica` solo permite
 * CREAR solicitudes web, nada más. Devuelve true si quedó guardada y false si
 * Supabase no está configurado o la petición falló (el correo sigue su curso).
 */
async function saveToSistema(data: AppointmentData) {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const key = process.env.SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return false;

  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
  // Las claves anon clásicas son JWT; las "publishable" nuevas no lo son.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;

  try {
    const response = await fetch(`${url}/rest/v1/citas`, {
      method: "POST",
      headers,
      // Los recortes coinciden con los límites de la política RLS.
      body: JSON.stringify({
        solicitante_nombre: data.name.slice(0, 120),
        solicitante_email: data.email.slice(0, 120),
        solicitante_telefono: data.phone.slice(0, 40),
        fecha_preferida: data.preferredDate || null,
        motivo: data.reason.slice(0, 1000),
        estado: "solicitada",
        origen: "web",
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error(
        "[appointments] Supabase error",
        response.status,
        await response.text()
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("[appointments] Supabase request failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  let body: AppointmentBody;

  try {
    body = (await request.json()) as AppointmentBody;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const preferredDate = asTrimmedString(body.preferredDate);
  const reason = asTrimmedString(body.reason);

  if (!name || !email || !phone || !reason) {
    return NextResponse.json(
      { error: "Complete nombre, correo, teléfono y motivo de consulta." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Ingrese un correo electrónico válido." },
      { status: 400 }
    );
  }

  const dateCheck = validatePreferredDate(preferredDate);
  if (!dateCheck.ok) {
    return NextResponse.json(
      { error: dateCheck.error || INVALID_CONSULTATION_DATE_MESSAGE },
      { status: 400 }
    );
  }

  const { host, port, secure, emailUser, emailPass, to } = resolveMailConfig();

  const saved = await saveToSistema({
    name,
    email,
    phone,
    preferredDate,
    reason,
  });

  const subject = `Nueva solicitud de cita — ${name}`;
  const text = [
    "Nueva solicitud de cita desde el sitio Oftalmoale",
    "",
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Teléfono: ${phone}`,
    `Fecha preferida: ${preferredDate || "No indicada"}`,
    "",
    "Motivo:",
    reason,
  ].join("\n");

  if (!host || !Number.isFinite(port) || !emailUser || !emailPass) {
    console.info("[appointments] Mock send (SMTP credentials not set)", {
      to,
      subject,
      text,
      host,
      port,
    });
    return NextResponse.json({
      ok: true,
      mock: true,
      saved,
      message:
        "Solicitud registrada en modo desarrollo (sin credenciales SMTP).",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: `"Oftalmoale" <${emailUser}>`,
      to,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[appointments] SMTP error", error);
    // Si la solicitud ya quedó en la agenda del sistema, no se pierde:
    // la paciente no necesita ver un error por el correo.
    if (saved) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { error: "No pudimos enviar el correo. Intente más tarde." },
      { status: 502 }
    );
  }
}
