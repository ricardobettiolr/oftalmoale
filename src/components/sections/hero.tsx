import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/clinic/hero.jpg"
          alt="Dra. María Alejandra Rojas durante una evaluación oftalmológica"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] animate-[slow-zoom_18s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,28,44,0.72)_0%,rgba(8,28,44,0.42)_48%,rgba(8,28,44,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(26,143,138,0.14),transparent_55%)]" />
      </div>

      <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <div className="max-w-2xl">
          <div className="mb-6 bg-transparent opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards]">
            <BrandLogo priority className="h-14 sm:h-16 md:h-[4.5rem]" />
          </div>
          <h1 className="sr-only">
            Oftalmoale — Dra. María Alejandra Rojas, oftalmóloga
          </h1>
          <p className="max-w-xl text-balance text-lg font-normal leading-relaxed text-white/90 opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.15s_forwards] md:text-xl">
            Cuidado oftalmológico preciso — especialista en segmento anterior,
            cirugía de catarata y córnea.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.28s_forwards]">
            <Button asChild size="lg" variant="accent">
              <a href="#cita">Reservar evaluación</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#servicios">Ver servicios</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
