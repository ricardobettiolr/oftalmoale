import Link from "next/link";
import { CLINICA } from "@/lib/clinic";
import { cerrarSesion } from "@/app/login/actions";
import type { Row } from "@/lib/format";

export default function Nav({ perfil }: { perfil: Row }) {
  const doctora = perfil.rol === "doctora";
  const items = [
    { href: "/", label: "Inicio" },
    { href: "/agenda", label: "Agenda" },
    { href: "/pacientes", label: "Pacientes" },
    ...(doctora ? [{ href: "/cirugias", label: "Cirugías" }] : []),
    ...(doctora ? [{ href: "/equipo", label: "Equipo" }] : []),
  ];
  return (
    <header className="no-print border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-sky-800">
          {CLINICA.nombre}
        </Link>
        <nav className="flex flex-1 flex-wrap gap-1">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
              {i.label}
            </Link>
          ))}
        </nav>
        <form action={cerrarSesion} className="flex items-center gap-3 text-sm text-slate-500">
          <span>{perfil.nombre}</span>
          <button className="rounded-md border border-slate-300 px-3 py-1 text-slate-600 hover:bg-slate-50">Salir</button>
        </form>
      </div>
    </header>
  );
}
