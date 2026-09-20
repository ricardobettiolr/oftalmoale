import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ink)] text-white">
      <div className="section-pad mx-auto flex max-w-6xl flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <BrandLogo className="h-10" />
        <div className="grid max-w-2xl gap-8 text-sm leading-relaxed text-white/75 sm:grid-cols-2">
          <div>
            <p>Dra. María Alejandra Rojas · Oftalmóloga</p>
            <p className="mt-1">
              Especialista en segmento anterior · Cirugía de catarata y córnea
            </p>
            <p className="mt-2 text-white/90">Más de 2800 cirugías realizadas</p>
            <a
              href="mailto:oftalmoale@gmail.com"
              className="mt-3 inline-block text-white underline-offset-4 hover:underline"
            >
              oftalmoale@gmail.com
            </a>
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
