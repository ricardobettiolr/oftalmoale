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
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,28,44,0.78)_0%,rgba(8,28,44,0.48)_52%,rgba(8,28,44,0.28)_100%)]" />
      </div>

      <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-white/70 uppercase opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] sm:text-sm">
            Oftalmóloga · Oftalmoale
          </p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-white opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.06s_forwards] sm:text-5xl md:text-6xl">
            María Alejandra Rojas
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.14s_forwards] md:text-lg">
            Atención clínica precisa en segmento anterior, catarata y córnea.
          </p>
          <p className="mt-6 font-display text-xl text-white opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.2s_forwards] md:text-2xl">
            Más de 2800 cirugías realizadas
          </p>
          <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.28s_forwards]">
            <Button asChild size="lg" variant="accent">
              <a href="#cita">Agendar cita</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#nosotros">Conocer más</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
