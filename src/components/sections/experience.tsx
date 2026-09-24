import { Reveal } from "@/components/reveal";
import { SpecialtyLine } from "@/components/specialty-line";

export function Experience() {
  return (
    <section id="experiencia" className="section-surface-alt section-band">
      <div className="section-pad mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display max-w-3xl text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Experiencia y especialización
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-[var(--color-muted)]">
            Atención oftalmológica especializada para el diagnóstico,
            tratamiento y cuidado integral de la visión.
          </p>
          <SpecialtyLine className="mt-8" />
          <p className="mt-8 max-w-3xl leading-relaxed text-[var(--color-muted)]">
            La práctica de la Dra. María Alejandra Rojas comprende la
            oftalmología general y se especializa en el diagnóstico y
            tratamiento de enfermedades del segmento anterior, con especial
            dedicación a la cirugía de catarata y al manejo de patologías de la
            córnea.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--color-muted)]">
            Cada paciente recibe una evaluación individualizada, una explicación
            clara de las alternativas de tratamiento y el seguimiento necesario
            durante cada etapa de su atención.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
