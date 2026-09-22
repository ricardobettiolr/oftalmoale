import { Reveal } from "@/components/reveal";

const services = [
  {
    title: "Segmento anterior",
    copy: "Evaluación, diagnóstico y seguimiento de condiciones que afectan la córnea, el cristalino y otras estructuras de la parte anterior del ojo.",
  },
  {
    title: "Cirugía de catarata",
    copy: "Evaluación preoperatoria, planificación quirúrgica individualizada y seguimiento postoperatorio orientados a lograr el mejor manejo posible de cada caso.",
  },
  {
    title: "Córnea",
    copy: "Diagnóstico y tratamiento especializado de enfermedades de la córnea, desde el manejo médico hasta la valoración de alternativas quirúrgicas cuando están indicadas.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="section-surface section-band">
      <div className="section-pad mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
            Servicios
          </p>
          <h2 className="font-display max-w-3xl text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Atención oftalmológica enfocada en cada diagnóstico
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-muted)]">
            Cada consulta comienza por comprender su condición visual con
            precisión, explicar los hallazgos de forma clara y definir los
            siguientes pasos de acuerdo con sus necesidades. Incluye una
            evaluación completa de la salud ocular y la función visual, con los
            estudios clínicos necesarios para identificar alteraciones y
            establecer un plan de seguimiento o tratamiento.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delayMs={90 * index}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <article className="border-t-2 border-[var(--color-accent)] pt-5">
                <h3 className="font-display text-2xl text-[var(--color-accent)] md:text-[1.65rem]">
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
