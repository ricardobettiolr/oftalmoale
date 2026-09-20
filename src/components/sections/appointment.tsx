"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/reveal";

type Status = "idle" | "loading" | "success" | "error";

export function Appointment() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          preferredDate: data.get("preferredDate"),
          reason: data.get("reason"),
        }),
      });

      const payload = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        setStatus("error");
        setMessage(
          payload.error ??
            "No pudimos enviar su solicitud. Intente de nuevo en unos minutos."
        );
        return;
      }

      setStatus("success");
      setMessage(
        "Solicitud enviada. El equipo de Oftalmoale le contactará para confirmar su cita."
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "Hubo un problema de conexión. Revise su internet e intente nuevamente."
      );
    }
  }

  return (
    <section id="cita" className="section-surface-alt section-band">
      <div className="section-pad mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
            Agenda
          </p>
          <h2 className="font-display text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Solicite su cita
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">
            Complete sus datos y nuestro equipo se pondrá en contacto con usted
            para coordinar la fecha y hora de su consulta.
          </p>
          <address className="mt-6 max-w-md not-italic text-[var(--color-muted)]">
            <p className="text-sm font-medium tracking-[0.14em] text-[var(--color-ink)] uppercase">
              Consultorio
            </p>
            <p className="mt-2 leading-relaxed">
              Centro Comercial Plaza Mayor, Piso 2
              <br />
              Al lado de Liberty Express
              <br />
              Mérida, Venezuela
            </p>
          </address>
          <p className="mt-6 max-w-md text-sm text-[var(--color-muted)]">
            Las solicitudes serán atendidas a través de{" "}
            <span className="text-[var(--color-ink)]">oftalmoale@gmail.com</span>.
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-sm border border-[var(--color-border)] bg-white/70 p-6 shadow-[0_20px_60px_rgba(11,39,64,0.06)] backdrop-blur-sm md:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Su nombre"
                  disabled={status === "loading"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="correo@ejemplo.com"
                  disabled={status === "loading"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+58 …"
                  disabled={status === "loading"}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="preferredDate">Fecha preferida</Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  disabled={status === "loading"}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="reason">Motivo de la consulta</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  required
                  placeholder="Cuéntenos brevemente el motivo de su visita o la evaluación que desea realizar."
                  disabled={status === "loading"}
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="accent"
              className="w-full sm:w-auto"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando…" : "Solicitar cita"}
            </Button>

            {status === "success" && (
              <p
                role="status"
                className="rounded-md border border-[var(--color-accent)]/30 bg-[color-mix(in_srgb,var(--color-accent)_10%,white)] px-4 py-3 text-sm text-[var(--color-ink)]"
              >
                {message}
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                className="rounded-md border border-red-300/70 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {message}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
