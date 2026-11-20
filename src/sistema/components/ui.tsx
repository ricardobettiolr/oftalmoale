import type { ReactNode } from "react";

export const input =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600";
export const btn =
  "inline-flex items-center justify-center rounded-md bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 cursor-pointer";
export const btnSec =
  "inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer";
export const btnMini =
  "inline-flex items-center justify-center rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer";

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Card({
  title,
  children,
  action,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-base font-semibold text-slate-800">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

type CampoProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
  list?: string;
  step?: string;
  className?: string;
};

export function Campo({ label, name, defaultValue, type = "text", required, placeholder, list, step, className = "" }: CampoProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-slate-600">
        {label}
        {required && " *"}
      </span>
      <input
        className={input}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        list={list}
        step={step}
      />
    </label>
  );
}

export function Area({
  label,
  name,
  defaultValue,
  rows = 3,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      <textarea className={input} name={name} rows={rows} defaultValue={defaultValue ?? ""} placeholder={placeholder} />
    </label>
  );
}

export function Seleccion({
  label,
  name,
  opciones,
  defaultValue,
  vacio,
  required,
  className = "",
}: {
  label: string;
  name: string;
  opciones: readonly { v: string; l: string }[];
  defaultValue?: string | null;
  vacio?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-slate-600">
        {label}
        {required && " *"}
      </span>
      <select className={input} name={name} defaultValue={defaultValue ?? ""} required={required}>
        {vacio !== undefined && <option value="">{vacio}</option>}
        {opciones.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Una fila con el mismo dato para OD y OI */
export function FilaOjos({
  label,
  nameOd,
  nameOi,
  od,
  oi,
  placeholder,
  type = "text",
  step,
}: {
  label: string;
  nameOd: string;
  nameOi: string;
  od?: string | number | null;
  oi?: string | number | null;
  placeholder?: string;
  type?: string;
  step?: string;
}) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr_1fr] items-center gap-2">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input className={input} name={nameOd} type={type} step={step} defaultValue={od ?? ""} placeholder={placeholder} aria-label={`${label} OD`} />
      <input className={input} name={nameOi} type={type} step={step} defaultValue={oi ?? ""} placeholder={placeholder} aria-label={`${label} OI`} />
    </div>
  );
}

export function CabeceraOjos() {
  return (
    <div className="mb-2 grid grid-cols-[8.5rem_1fr_1fr] gap-2 text-center text-xs font-semibold text-slate-500">
      <span />
      <span>OD · ojo derecho</span>
      <span>OI · ojo izquierdo</span>
    </div>
  );
}

const colores: Record<string, string> = {
  solicitada: "bg-amber-100 text-amber-800",
  confirmada: "bg-sky-100 text-sky-800",
  atendida: "bg-emerald-100 text-emerald-800",
  cancelada: "bg-slate-200 text-slate-600",
  no_asistio: "bg-rose-100 text-rose-800",
  indicada: "bg-amber-100 text-amber-800",
  preoperatorio: "bg-violet-100 text-violet-800",
  programada: "bg-sky-100 text-sky-800",
  operada: "bg-emerald-100 text-emerald-800",
  postoperatorio: "bg-teal-100 text-teal-800",
  cerrada: "bg-slate-200 text-slate-600",
};

export function Badge({ valor, texto }: { valor: string; texto: string }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colores[valor] ?? "bg-slate-100 text-slate-700"}`}>
      {texto}
    </span>
  );
}

export function Vacio({ children }: { children: ReactNode }) {
  return <p className="py-6 text-center text-sm text-slate-400">{children}</p>;
}
