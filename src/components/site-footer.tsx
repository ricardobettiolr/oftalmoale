import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ink)] text-white">
      <div className="section-pad mx-auto flex max-w-6xl flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <BrandLogo className="h-10" />
        <div className="max-w-md text-sm leading-relaxed text-white/75">
          <p>Dra. María Alejandra Rojas · Oftalmóloga</p>
          <p className="mt-1">
            Especialista en segmento anterior · Cirugía de catarata y córnea
          </p>
          <a
            href="mailto:oftalmoale@gmail.com"
            className="mt-3 inline-block text-white underline-offset-4 hover:underline"
          >
            oftalmoale@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
