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
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Cuidado especializado para preservar su visión
          </p>
          <SpecialtyLine className="mt-8" />
          <p className="mt-8 max-w-3xl leading-relaxed text-[var(--color-muted)]">
            La práctica de la Dra. María Alejandra Rojas incluye consulta de{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              oftalmología general
            </strong>{" "}
            y está enfocada en el diagnóstico y tratamiento de enfermedades del{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              segmento anterior
            </strong>{" "}
            del ojo, con especial dedicación a la{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              cirugía de catarata
            </strong>{" "}
            y al manejo de patologías de la{" "}
            <strong className="font-semibold text-[var(--color-ink)]">córnea</strong>.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--color-muted)]">
            Cada decisión clínica parte de una evaluación detallada, con
            comunicación directa y seguimiento antes, durante y después del
            tratamiento cuando el caso lo requiere.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
