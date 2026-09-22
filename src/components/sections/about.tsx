import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SpecialtyLine } from "@/components/specialty-line";

export function About() {
  return (
    <section id="nosotros" className="section-surface section-band">
      <div className="section-pad mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src="/assets/clinic/doctor-portrait.jpg"
                alt="Retrato profesional de Dra. María Alejandra Rojas, oftalmóloga"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div>
              <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
                Médico oftalmólogo
              </p>
              <h2 className="font-display text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
                Dra. María Alejandra Rojas
              </h2>
              <SpecialtyLine className="mt-5" />
              <p className="mt-5 font-display text-2xl text-[var(--color-ink)] md:text-3xl">
                Más de 2.800 cirugías realizadas en Colombia y Venezuela
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                La Dra. María Alejandra Rojas brinda atención oftalmológica
                especializada en{" "}
                <strong className="font-semibold text-[var(--color-ink)]">
                  segmento anterior, catarata y córnea
                </strong>
                . Su práctica se sustenta en una evaluación rigurosa, precisión
                clínica y un acompañamiento cercano en cada etapa del
                tratamiento.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-[var(--color-muted)]">
                Cada paciente recibe una valoración individual, una explicación
                clara de su diagnóstico y un plan de manejo adaptado a sus
                necesidades visuales.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" variant="accent">
                  <a href="#cita">Agendar consulta</a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
