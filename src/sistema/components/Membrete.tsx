import { CLINICA } from "@/sistema/lib/clinic";

export default function Membrete() {
  return (
    <header className="mb-6 border-b-2 border-sky-800 pb-3 text-center">
      <p className="text-2xl font-semibold tracking-wide text-sky-900">{CLINICA.doctora}</p>
      <p className="text-sm font-medium text-slate-700">{CLINICA.titulo}</p>
      <p className="text-xs text-slate-600">{CLINICA.subtitulo}</p>
      <p className="mt-1 text-xs text-slate-500">{CLINICA.registros.join("  ·  ")}</p>
    </header>
  );
}

export function PieHoja() {
  return (
    <footer className="mt-10 border-t border-slate-300 pt-2 text-center text-[11px] text-slate-500">
      {CLINICA.direccion} · Tel. {CLINICA.telefono} · {CLINICA.email}
    </footer>
  );
}

export function Firma() {
  return (
    <div className="mt-16 flex justify-end">
      <div className="w-64 border-t border-slate-700 pt-1 text-center text-xs text-slate-700">
        {CLINICA.doctora}
        <br />
        {CLINICA.titulo}
      </div>
    </div>
  );
}
