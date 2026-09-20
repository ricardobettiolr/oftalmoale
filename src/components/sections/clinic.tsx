import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function Clinic() {
  return (
    <section id="consultorio" className="section-pad mx-auto max-w-6xl py-20 md:py-28">
      <Reveal>
        <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
          Consultorio
        </p>
        <h2 className="font-display max-w-2xl text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
          Un espacio clínico pensado para evaluar con calma
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          Tecnología de exploración oftalmológica y un entorno sereno para que
          cada cita se sienta clara, ordenada y humana.
        </p>
        <p className="mt-4 max-w-xl text-[var(--color-muted)]">
          Centro Comercial Plaza Mayor, Piso 2 · Al lado de Liberty Express ·
          Mérida, Venezuela
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-7 md:aspect-[16/10]">
          <Image
            src="/assets/clinic/exam-care.jpg"
            alt="Dra. María Alejandra Rojas realizando un examen con lámpara de hendidura"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal
          delayMs={100}
          className="relative aspect-[4/5] overflow-hidden rounded-sm md:col-span-5 md:aspect-auto md:min-h-full"
        >
          <Image
            src="/assets/clinic/brand-wall.jpg"
            alt="Identidad Oftalmoale en el consultorio de Dra. María Alejandra Rojas"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-center"
          />
        </Reveal>
        <Reveal
          delayMs={160}
          className="relative aspect-[16/10] overflow-hidden rounded-sm md:col-span-12"
        >
          <Image
            src="/assets/clinic/slit-lamp.jpg"
            alt="Detalle de evaluación oftalmológica en el consultorio Oftalmoale"
            fill
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
        </Reveal>
      </div>
    </section>
  );
}
