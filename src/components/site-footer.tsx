import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ink)] text-white">
      <div className="section-pad mx-auto flex max-w-6xl flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <Link
          href="/"
          className="relative inline-flex shrink-0 bg-transparent"
          aria-label="Oftalmoale — Dra. María Alejandra Rojas"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[160%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(247,250,251,0.55)_0%,transparent_70%)]"
          />
          <BrandLogo className="relative h-10 object-contain object-left" />
        </Link>
        <div className="grid max-w-2xl gap-8 text-sm leading-relaxed text-white/75 sm:grid-cols-2">
          <div>
            <p>Dra. María Alejandra Rojas · Oftalmóloga</p>
            <p className="mt-2 font-display text-lg leading-snug text-white">
              Segmento anterior · Cirugía de catarata · Córnea
            </p>
            <p className="mt-2 text-white/90">Más de 2.800 cirugías realizadas</p>
            <a
              href="mailto:oftalmoale@gmail.com"
              className="mt-3 inline-block text-white underline-offset-4 hover:underline"
            >
              oftalmoale@gmail.com
            </a>
            <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-white/80">
              <Link href="/" className="hover:text-white hover:underline underline-offset-4">
                Inicio
              </Link>
              <Link
                href="/#cita"
                className="hover:text-white hover:underline underline-offset-4"
              >
                Agenda
              </Link>
              <Link
                href="/cirugias"
                className="hover:text-white hover:underline underline-offset-4"
              >
                Cirugías
              </Link>
            </nav>
          </div>
          <address className="not-italic">
            <p className="text-xs font-medium tracking-[0.14em] text-white/55 uppercase">
              Consultorio
            </p>
            <p className="mt-2">
              Centro Comercial Plaza Mayor, Piso 2
              <br />
              Al lado de Liberty Express
              <br />
              Mérida, Venezuela
            </p>
          </address>
        </div>
      </div>
    </footer>
  );
}
