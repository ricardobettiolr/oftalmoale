import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function Clinic() {
  return (
    <section id="consultorio" className="section-surface-alt section-band">
      <div className="section-pad mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
            Consultorio
          </p>
          <h2 className="font-display max-w-3xl text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Un espacio diseñado para una evaluación oftalmológica precisa
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            Un entorno clínico cómodo y organizado, equipado para realizar
            evaluaciones oftalmológicas detalladas y brindar una atención cercana,
            clara y sin prisas.
          </p>
          <address className="mt-6 max-w-xl not-italic leading-relaxed text-[var(--color-muted)]">
            Centro Comercial Plaza Mayor, Piso 2
            <br />
            Al lado de Liberty Express
            <br />
            Mérida, Venezuela
          </address>
        </Reveal>

        <Reveal delayMs={100} className="mt-12">
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-sm md:aspect-[21/10]">
            <Image
              src="/assets/clinic/exam-care.jpg"
              alt="Evaluación oftalmológica especializada — Dra. María Alejandra Rojas durante una evaluación con lámpara de hendidura."
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-cover object-center"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
