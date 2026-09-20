"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#servicios", label: "Servicios" },
  { href: "#galaxy", label: "GALAXY" },
  { href: "#consultorio", label: "Consultorio" },
  { href: "#cita", label: "Agenda" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || menuOpen
          ? "bg-[color-mix(in_srgb,var(--paper)_94%,transparent)] shadow-[0_1px_0_rgba(11,39,64,0.06)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="section-pad mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 md:h-20">
        <a
          href="#inicio"
          className="relative inline-flex min-w-0 shrink bg-transparent"
          aria-label="Oftalmoale — Dra. María Alejandra Rojas"
          style={{ backgroundColor: "transparent" }}
          onClick={closeMenu}
        >
          {!scrolled && !menuOpen && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[160%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(247,250,251,0.55)_0%,transparent_70%)]"
            />
          )}
          <BrandLogo
            priority
            className="relative h-7 max-w-[min(58vw,220px)] object-contain object-left sm:h-8 md:h-10 md:max-w-none"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition-opacity hover:opacity-100",
                scrolled
                  ? "text-[var(--color-ink)]/75 hover:text-[var(--color-ink)]"
                  : "text-white/85"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant={scrolled || menuOpen ? "default" : "outline"}
            className="hidden sm:inline-flex"
          >
            <a href="#cita">Agendar cita</a>
          </Button>

          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden",
              scrolled || menuOpen
                ? "text-[var(--color-ink)]"
                : "text-white"
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Cerrar" : "Menú"}</span>
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform",
                  menuOpen && "top-1.5 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-opacity",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-transform",
                  menuOpen && "top-1.5 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-[var(--color-border)]/60 bg-[var(--color-paper)] lg:hidden"
        >
          <nav className="section-pad mx-auto flex max-w-6xl flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-base text-[var(--color-ink)] hover:bg-[var(--color-mist)]"
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="lg" variant="accent" className="mt-3 w-full">
              <a href="#cita" onClick={closeMenu}>
                Agendar cita
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
