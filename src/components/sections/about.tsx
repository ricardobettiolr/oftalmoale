import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="nosotros" className="section-pad mx-auto max-w-6xl py-20 md:py-28">
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
            <p className="mt-5 font-display text-2xl text-[var(--color-ink)] md:text-3xl">
              Más de 500 cirugías realizadas
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
              En Oftalmoale acompaño a cada paciente con evaluaciones claras,
              tecnología de precisión y un plan de tratamiento pensado para
              proteger su visión a largo plazo.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-[var(--color-muted)]">
              Mi práctica se centra en el segmento anterior del ojo, con
              especial énfasis en cirugía de catarata y córnea — siempre con
              comunicación directa y seguimiento cercano.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
