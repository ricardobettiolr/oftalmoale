import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <section
      id="experiencia"
      className="border-y border-[var(--color-border)]/70 bg-[color-mix(in_srgb,var(--mist)_70%,white)] py-20 md:py-28"
    >
      <div className="section-pad mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display max-w-3xl text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Experiencia y especialización
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Cuidado especializado para preservar su visión
          </p>
          <p className="mt-6 max-w-3xl leading-relaxed text-[var(--color-muted)]">
            La práctica de la Dra. María Alejandra Rojas está enfocada en el
            diagnóstico y tratamiento de enfermedades del segmento anterior del
            ojo, con especial dedicación a la cirugía de catarata y al manejo de
            patologías de la córnea.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--color-muted)]">
            Cada decisión clínica parte de una evaluación detallada, con
            comunicación directa y seguimiento antes, durante y después del
            tratamiento cuando el caso lo requiere.
          </p>
          <p className="mt-8 text-sm font-medium tracking-[0.12em] text-[var(--color-ink)] uppercase">
            Segmento anterior · Catarata · Córnea
          </p>
        </Reveal>
      </div>
    </section>
  );
}
