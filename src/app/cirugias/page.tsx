import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CirugiasGallery } from "@/components/cirugias/cirugias-gallery";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Cirugías | Oftalmoale",
  description:
    "Galería de cirugías antes y después de la Dra. María Alejandra Rojas — Oftalmoale, Mérida, Venezuela.",
};

export default function CirugiasPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section-surface-alt section-band pt-28 md:pt-32">
          <div className="section-pad mx-auto max-w-6xl">
            <Reveal>
              <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
                Resultados
              </p>
              <h1 className="font-display max-w-3xl text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
                Cirugías
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
                Resultados clínicos documentados con consentimiento, presentados
                de forma clara para ayudar a comprender el proceso de evaluación y
                tratamiento.
              </p>
            </Reveal>

            <div className="mt-12 md:mt-16">
              <CirugiasGallery />
            </div>

            <Reveal delayMs={80}>
              <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-[var(--color-border)] pt-10">
                <Button asChild size="lg" variant="accent">
                  <Link href="/#cita">Agendar cita</Link>
                </Button>
                <Link
                  href="/"
                  className="text-sm text-[var(--color-ink)] underline-offset-4 hover:underline"
                >
                  Volver al inicio
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
