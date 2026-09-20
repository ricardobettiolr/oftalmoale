import { Reveal } from "@/components/reveal";

const services = [
  {
    title: "Consulta oftalmológica integral",
    copy: "Valoración completa de la salud visual, agudeza y presión intraocular, con explicación clara de hallazgos y próximos pasos.",
  },
  {
    title: "Segmento anterior",
    copy: "Diagnóstico y seguimiento de condiciones de córnea, cristalino y estructuras anteriores del ojo.",
  },
  {
    title: "Cirugía de catarata",
    copy: "Planificación quirúrgica personalizada y acompañamiento pre y postoperatorio para recuperar nitidez visual con seguridad.",
  },
  {
    title: "Cirugía de córnea",
    copy: "Manejo especializado de patología corneal cuando el tratamiento médico no es suficiente.",
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden border-y border-[var(--color-border)]/70 bg-[color-mix(in_srgb,var(--mist)_70%,white)] py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(26,143,138,0.16),transparent_70%)]"
      />
      <div className="section-pad relative mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
            Servicios
          </p>
          <h2 className="font-display max-w-2xl text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Atención enfocada en lo que su visión necesita
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Cada consulta está orientada a un objetivo clínico concreto: entender
            su caso, explicar opciones y actuar con precisión.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delayMs={80 * index}>
              <article className="border-t border-[var(--color-ink)]/15 pt-5">
                <h3 className="font-display text-2xl text-[var(--color-ink)]">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
                  {service.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
