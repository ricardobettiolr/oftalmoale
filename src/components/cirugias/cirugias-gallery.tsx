import Image from "next/image";
import { cirugiasCases } from "@/data/cirugias";
import { Reveal } from "@/components/reveal";

export function CirugiasGallery() {
  if (cirugiasCases.length === 0) {
    return (
      <Reveal>
        <div className="rounded-sm border border-dashed border-[var(--color-border)] bg-white/50 px-6 py-16 text-center md:px-10">
          <p className="font-display text-2xl text-[var(--color-ink)] md:text-3xl">
            Pronto publicaremos casos de cirugías
          </p>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-[var(--color-muted)]">
            Estamos preparando una selección de resultados antes y después para
            ilustrar el tipo de evaluación y seguimiento que ofrecemos en
            Oftalmoale.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-10 md:gap-14">
      {cirugiasCases.map((caso, index) => (
        <Reveal key={caso.id} delayMs={60 * Math.min(index, 6)}>
          <article className="border-t border-[var(--color-ink)]/12 pt-8">
            <h2 className="font-display text-2xl text-[var(--color-ink)] md:text-3xl">
              {caso.title}
            </h2>
            {caso.description ? (
              <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
                {caso.description}
              </p>
            ) : null}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[var(--color-mist)]">
                  <Image
                    src={caso.beforeSrc}
                    alt={caso.beforeAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm font-medium tracking-[0.12em] text-[var(--color-ink)] uppercase">
                  Antes
                </figcaption>
              </figure>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[var(--color-mist)]">
                  <Image
                    src={caso.afterSrc}
                    alt={caso.afterAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm font-medium tracking-[0.12em] text-[var(--color-ink)] uppercase">
                  Después
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
