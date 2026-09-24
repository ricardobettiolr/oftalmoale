import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SpecialtyLine } from "@/components/specialty-line";

const credentials = [
  {
    year: "2001",
    title: "Medicina",
    place: "Universidad de los Andes (Venezuela)",
  },
  {
    year: "2008",
    title: "Oftalmología",
    place: "Universidad de los Andes (Venezuela)",
  },
  {
    year: "2010",
    title: "Fellow en segmento anterior",
    place: "Clínica Oftalmológica del Caribe (Colombia)",
  },
];

const congresses = [
  "Ponente en congresos nacionales de oftalmología en Venezuela",
  "Ponente en el Precongreso Colombo-Venezolano de Catarata y Refractiva",
  "Congreso Nacional de Oftalmología de Colombia (×2)",
  "Facocaribe, Barranquilla (Colombia)",
  "Facoelche, España",
  "Congresos Panamericanos",
  "ASCRS",
  "Instructora de X.labs de cirugía de FACO y panelista en Facoextrema, Buenos Aires, Argentina",
];

export function About() {
  return (
    <section id="nosotros" className="section-surface section-band">
      <div className="section-pad mx-auto max-w-6xl">
        <div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-x-16 md:gap-y-8">
          <Reveal className="order-1">
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

          <Reveal
            delayMs={120}
            className="order-2 md:col-start-2 md:row-start-1 md:row-span-2"
          >
            <div>
              <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
                Médico oftalmólogo
              </p>
              <h2 className="font-display text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
                Dra. María Alejandra Rojas
              </h2>
              <SpecialtyLine className="mt-5" />
              <p className="mt-7 font-display text-2xl text-[var(--color-ink)] md:text-3xl">
                Más de 2.800 cirugías realizadas en Colombia y Venezuela
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                La Dra. María Alejandra Rojas brinda atención en{" "}
                <strong className="font-semibold text-[var(--color-ink)]">
                  oftalmología general
                </strong>{" "}
                y atención especializada en{" "}
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

          <div className="order-3 space-y-8 md:col-start-1">
            <Reveal delayMs={80}>
              <div>
                <p className="text-sm font-medium tracking-[0.14em] text-[var(--color-accent)] uppercase">
                  Formación
                </p>
                <ol className="mt-4 border-l border-[var(--color-border)] pl-5">
                  {credentials.map((item) => (
                    <li key={item.year} className="relative pb-5 last:pb-0">
                      <span
                        aria-hidden
                        className="absolute -left-[1.4rem] top-1.5 h-2 w-2 rounded-full bg-[var(--color-accent)]"
                      />
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <time className="font-medium tabular-nums tracking-wide text-[var(--color-accent)]">
                          {item.year}
                        </time>
                        <span className="font-medium text-[var(--color-ink)]">
                          {item.title}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm leading-snug text-[var(--color-muted)]">
                        {item.place}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div>
                <p className="text-sm font-medium tracking-[0.14em] text-[var(--color-accent)] uppercase">
                  Congresos
                </p>
                <ul className="mt-3 space-y-2.5">
                  {congresses.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-snug text-[var(--color-muted)]"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
