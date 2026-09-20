import Image from "next/image";
import { Reveal } from "@/components/reveal";

const frames = [
  {
    src: "/assets/galaxy/galaxy-01.jpg",
    label: "Antes",
    alt: "Primer plano clínico del ojo en preparación para cirugía de lente intraocular",
  },
  {
    src: "/assets/galaxy/galaxy-02.jpg",
    label: "Durante",
    alt: "Colocación de lente intraocular GALAXY con instrumental quirúrgico",
  },
  {
    src: "/assets/galaxy/galaxy-03.jpg",
    label: "Lente GALAXY",
    alt: "Lente GALAXY RayOne Preloaded Spiral IOL de Rayner en quirófano",
  },
];

export function Galaxy() {
  return (
    <section id="galaxy" className="section-surface-alt section-band">
      <div className="section-pad mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
            Cirugía de catarata
          </p>
          <h2 className="font-display max-w-3xl text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Instalación de lente GALAXY
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            Tecnología RayOne / Rayner (GALAXY Preloaded Spiral IOL) para restaurar
            nitidez visual con un procedimiento planificado y seguimiento cercano.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {frames.map((frame, index) => (
            <Reveal key={frame.src} delayMs={90 * index}>
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[var(--color-mist)]">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm font-medium tracking-[0.14em] text-[var(--color-ink)] uppercase">
                  {frame.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
