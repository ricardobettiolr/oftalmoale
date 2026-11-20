import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { cerrarSesion } from "@/sistema/lib/sesion";
import type { Row } from "@/sistema/lib/format";
import NavLinks from "./NavLinks";

export default function Nav({ perfil }: { perfil: Row }) {
  const doctora = perfil.rol === "doctora";
  const items = [
    { href: "/sistema", label: "Inicio" },
    { href: "/sistema/agenda", label: "Agenda" },
    { href: "/sistema/pacientes", label: "Pacientes" },
    ...(doctora ? [{ href: "/sistema/cirugias", label: "Cirugías" }] : []),
    ...(doctora ? [{ href: "/sistema/equipo", label: "Equipo" }] : []),
  ];
  return (
    <header className="no-print border-b-4 border-sky-500 bg-sky-800 shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
        <Link href="/sistema" aria-label="Oftalmoale · Inicio" className="order-1 shrink-0">
          <BrandLogo variant="onDark" priority className="h-9 sm:h-10" />
        </Link>
        <NavLinks items={items} />
        <form action={cerrarSesion} className="order-2 ml-auto flex items-center gap-3 text-sm text-sky-50 md:order-3 md:ml-0">
          <span className="font-medium">{perfil.nombre}</span>
          <button className="cursor-pointer rounded-md border border-white/60 px-3 py-1 font-medium text-white hover:bg-white hover:text-sky-900">
            Salir
          </button>
        </form>
      </div>
    </header>
  );
}
