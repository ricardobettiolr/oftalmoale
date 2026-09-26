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
    return NextResponse.json(
      { error: "No pudimos enviar el correo. Intente más tarde." },
      { status: 502 }
    );
  }
}
