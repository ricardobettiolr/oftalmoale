import Image from "next/image";
import { Reveal } from "@/components/reveal";

const photos = [
  {
    src: "/assets/clinic/exam-care.jpg",
    alt: "Evaluación oftalmológica especializada — Dra. María Alejandra Rojas durante una evaluación con lámpara de hendidura.",
    className:
      "relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-7 md:aspect-[16/10]",
  },
  {
    src: "/assets/clinic/brand-wall.jpg",
    alt: "Oftalmoale — Consultorio de la Dra. María Alejandra Rojas en Mérida, Venezuela.",
    className:
      "relative aspect-[4/5] overflow-hidden rounded-sm md:col-span-5 md:aspect-auto md:min-h-full",
  },
  {
    src: "/assets/clinic/slit-lamp.jpg",
    alt: "Precisión en cada evaluación — Exploración clínica orientada a obtener la información necesaria para un diagnóstico y tratamiento adecuados.",
    className:
      "relative aspect-[16/10] overflow-hidden rounded-sm md:col-span-12",
  },
];

export function Clinic() {
  return (
    <section id="consultorio" className="section-surface section-band">
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

        <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
          {photos.map((photo, index) => (
            <Reveal
              key={photo.src}
              delayMs={80 * index}
              className={photo.className}
            >
              <figure className="relative h-full min-h-[220px] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
