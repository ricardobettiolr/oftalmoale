import { Button } from "@/components/ui/button";
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
        {/* Neutral dark overlay — stronger on the text side, no blue cast */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.58)_42%,rgba(0,0,0,0.28)_72%,rgba(0,0,0,0.18)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-full max-w-3xl bg-[radial-gradient(ellipse_at_left_center,rgba(0,0,0,0.55)_0%,transparent_72%)] md:w-[70%]" />
      </div>

      <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <div className="relative max-w-2xl">
          {/* Local scrim behind copy for crisp readability */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-sm bg-black/35 blur-2xl md:-inset-x-8 md:-inset-y-8 md:bg-black/30"
          />

          <div className="relative [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_8px_24px_rgba(0,0,0,0.35)]">
            <h1 className="max-w-xl text-balance text-2xl font-semibold leading-snug tracking-tight text-white opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] sm:text-3xl md:text-4xl">
              Precisión y confianza para cuidar tu visión
            </h1>
            <p className="mt-5 font-display text-[2rem] font-medium leading-[1.08] tracking-tight text-white opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.08s_forwards] sm:text-5xl md:text-6xl">
              Dra. María Alejandra Rojas
            </p>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.14s_forwards] md:text-lg">
              Oftalmóloga especialista en segmento anterior, con especial
              dedicación a la cirugía de catarata y córnea.
            </p>
            <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-white/95 opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.2s_forwards] md:text-lg">
              Más de 2.800 cirugías realizadas en Colombia y Venezuela.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.28s_forwards]">
              <Button asChild size="lg" variant="accent">
                <a href="#cita">Agendar cita</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
