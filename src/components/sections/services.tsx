import { Reveal } from "@/components/reveal";

const leadService = {
  title: "Oftalmología general",
  copy: "Evaluación integral de la salud ocular y la función visual, orientada al diagnóstico de alteraciones frecuentes, seguimiento de enfermedades oculares y prevención de complicaciones.",
};

const specialtyServices = [
  {
    title: "Segmento anterior",
    copy: "Evaluación, diagnóstico y tratamiento de condiciones que afectan la córnea, el cristalino y otras estructuras de la parte anterior del ojo.",
  },
  {
    title: "Cirugía de catarata",
    copy: "Evaluación preoperatoria, planificación quirúrgica individualizada y seguimiento postoperatorio para abordar cada caso de acuerdo con las características visuales y clínicas del paciente.",
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
            Atención oftalmológica adaptada a cada diagnóstico
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-muted)]">
            La consulta puede comenzar con una evaluación de oftalmología
            general o con una valoración especializada. En ambos casos, el
            objetivo es comprender su condición visual con precisión, explicar
            los hallazgos de forma clara y definir el plan de manejo más
            adecuado para sus necesidades.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <article className="mt-12 max-w-3xl border-t-2 border-[var(--color-accent)] pt-5">
            <h3 className="font-display text-2xl text-[var(--color-accent)] md:text-[1.75rem]">
              {leadService.title}
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-muted)]">
              {leadService.copy}
            </p>
          </article>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
          {specialtyServices.map((service, index) => (
            <Reveal
              key={service.title}
              delayMs={90 * (index + 1)}
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
