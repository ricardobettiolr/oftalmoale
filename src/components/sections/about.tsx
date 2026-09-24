import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

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
        <div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
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
              <p className="mt-6 font-display text-2xl text-[var(--color-ink)] md:text-3xl">
                Más de 2.800 cirugías realizadas en Colombia y Venezuela.
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                Oftalmóloga especialista en cirugía de catarata, córnea y
                segmento anterior, con más de 18 años de trayectoria médica y
                amplia experiencia clínica y quirúrgica.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-[var(--color-muted)]">
                Formada en la Universidad de los Andes (Venezuela), con
                fellowship en segmento anterior en la Clínica Oftalmológica del
                Caribe (Colombia).
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-[var(--color-muted)]">
                Su experiencia abarca la cirugía de catarata y córnea, así como
                la evaluación, diagnóstico y manejo integral de pacientes en
                oftalmología general.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" variant="accent">
                  <a href="#cita">Agendar consulta</a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={100}>
          <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-2 md:items-start md:gap-0">
            <div className="md:pr-10 lg:pr-12">
              <p className="text-sm font-medium tracking-[0.14em] text-[var(--color-accent)] uppercase">
                Formación
              </p>
              <ol className="mt-4 space-y-5">
                {credentials.map((item) => (
                  <li key={item.year}>
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

            <div className="border-t border-[var(--color-border)] pt-10 md:border-t-0 md:border-l md:pt-0 md:pl-10 lg:pl-12">
              <p className="text-sm font-medium tracking-[0.14em] text-[var(--color-accent)] uppercase">
                Congresos
              </p>
              <ul className="mt-4 space-y-2.5">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
