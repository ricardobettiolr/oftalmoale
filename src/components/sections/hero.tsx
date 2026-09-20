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
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.45)_52%,rgba(0,0,0,0.28)_100%)]" />
      </div>

      <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <div className="max-w-2xl">
          <h1 className="max-w-xl text-balance text-2xl font-medium leading-snug tracking-tight text-white opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] sm:text-3xl md:text-4xl">
            Precisión, experiencia y confianza para cuidar tu visión
          </h1>
          <p className="mt-5 font-display text-[2rem] leading-[1.08] tracking-tight text-white opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.08s_forwards] sm:text-5xl md:text-6xl">
            Dra. María Alejandra Rojas
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.16s_forwards] md:text-lg">
            Médico oftalmólogo especializada en segmento anterior, cirugía de
            catarata y córnea, con más de 2.800 cirugías realizadas en Mérida,
            Venezuela.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.26s_forwards]">
            <Button asChild size="lg" variant="accent">
              <a href="#cita">Agendar cita</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
