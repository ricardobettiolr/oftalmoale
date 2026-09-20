import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  const to = process.env.APPOINTMENT_TO_EMAIL || "oftalmoale@gmail.com";
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim();

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

  if (!gmailUser || !gmailAppPassword) {
    console.info(
      "[appointments] Mock send (GMAIL_USER / GMAIL_APP_PASSWORD not set)",
      { to, subject, text }
    );
    return NextResponse.json({
      ok: true,
      mock: true,
      message:
        "Solicitud registrada en modo desarrollo (sin credenciales de Gmail).",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Oftalmoale" <${gmailUser}>`,
      to,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[appointments] Gmail SMTP error", error);
    return NextResponse.json(
      { error: "No pudimos enviar el correo. Intente más tarde." },
      { status: 502 }
    );
  }
}
