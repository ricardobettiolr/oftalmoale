"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#consultorio", label: "Consultorio" },
  { href: "#cita", label: "Cita" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[color-mix(in_srgb,var(--paper)_90%,transparent)] shadow-[0_1px_0_rgba(11,39,64,0.06)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="section-pad mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 md:h-20">
        <a
          href="#inicio"
          className="inline-flex shrink-0 rounded-sm bg-black px-2 py-1.5 shadow-sm ring-1 ring-white/10"
          aria-label="Oftalmoale — Dra. María Alejandra Rojas"
        >
          <Image
            src="/assets/oftalmoale-logo.png"
            alt="Oftalmoale — Dra. María Alejandra Rojas"
            width={280}
            height={72}
            priority
            className="h-8 w-auto md:h-10"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
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

        <Button
          asChild
          size="sm"
          variant={scrolled ? "default" : "outline"}
          className="hidden sm:inline-flex"
        >
          <a href="#cita">Agendar cita</a>
        </Button>
      </div>
    </header>
  );
}
