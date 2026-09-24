import Link from "next/link";
import { BrandLogoLink } from "@/components/brand-logo-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ink)] text-white">
      <div className="section-pad mx-auto flex max-w-6xl flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <BrandLogoLink contrast="plate" logoClassName="h-10" />
        <div className="grid max-w-2xl gap-8 text-sm leading-relaxed text-white/75 sm:grid-cols-2">
          <div>
            <p>Dra. María Alejandra Rojas · Oftalmóloga</p>
            <p className="mt-2 font-display text-lg leading-snug text-white">
              Oftalmología general · Segmento anterior · Cirugía de catarata ·
              Córnea
            </p>
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
