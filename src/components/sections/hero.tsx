import Image from "next/image";
import { Button } from "@/components/ui/button";

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
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,28,44,0.82)_0%,rgba(8,28,44,0.5)_48%,rgba(8,28,44,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(26,143,138,0.16),transparent_55%)]" />
      </div>

      <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex rounded-sm bg-black p-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] sm:p-3">
            <Image
              src="/assets/oftalmoale-logo.png"
              alt="Oftalmoale — Dra. María Alejandra Rojas"
              width={520}
              height={134}
              priority
              className="h-14 w-auto sm:h-16 md:h-20"
            />
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
