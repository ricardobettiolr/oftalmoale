import { NextResponse } from "next/server";
import { Resend } from "resend";

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
  const from =
    process.env.APPOINTMENT_FROM_EMAIL ||
    "Oftalmoale <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `Nueva solicitud de cita — ${name}`;
  const text = [
    "Nueva solicitud de cita desde oftalmoale.com",
    "",
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Teléfono: ${phone}`,
    `Fecha preferida: ${preferredDate || "No indicada"}`,
    "",
    "Motivo:",
    reason,
  ].join("\n");

  if (!apiKey) {
    console.info("[appointments] Mock send (RESEND_API_KEY not set)", {
      to,
      from,
      subject,
      text,
    });
    return NextResponse.json({
      ok: true,
      mock: true,
      message: "Solicitud registrada en modo desarrollo (sin RESEND_API_KEY).",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      text,
    });

    if (error) {
      console.error("[appointments] Resend error", error);
      return NextResponse.json(
        { error: "No pudimos enviar el correo. Intente más tarde." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[appointments] Unexpected error", error);
    return NextResponse.json(
      { error: "Error interno al procesar la solicitud." },
      { status: 500 }
    );
  }
}
