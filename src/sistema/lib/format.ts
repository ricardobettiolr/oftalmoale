import { CLINICA } from "./clinic";

export type Row = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/** '2026-11-19' → '19/11/2026' (sin pasar por zonas horarias) */
export function fecha(d?: string | null): string {
  if (!d) return "—";
  const [y, m, dd] = d.slice(0, 10).split("-");
  return `${dd}/${m}/${y}`;
}

export function fechaHora(iso?: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("es-VE", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: CLINICA.zonaHoraria,
  }).format(new Date(iso));
}

export function diaSemana(d: string): string {
  return new Intl.DateTimeFormat("es-VE", { weekday: "long", timeZone: "UTC" }).format(
    new Date(`${d}T00:00:00Z`),
  );
}

/** Fecha de hoy en Venezuela, formato YYYY-MM-DD */
export function hoyISO(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: CLINICA.zonaHoraria }).format(new Date());
}

/** Instante ISO → día venezolano YYYY-MM-DD */
export function diaDe(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: CLINICA.zonaHoraria }).format(new Date(iso));
}

/** Solo la hora (HH:MM) en Venezuela */
export function hora(iso: string): string {
  return new Intl.DateTimeFormat("es-VE", { hour: "2-digit", minute: "2-digit", timeZone: CLINICA.zonaHoraria }).format(new Date(iso));
}

/** Inicio/fin del día venezolano (UTC-4) como instantes ISO */
export function limitesDia(dia: string): { desde: string; hasta: string } {
  return {
    desde: new Date(`${dia}T00:00:00-04:00`).toISOString(),
    hasta: new Date(`${dia}T23:59:59.999-04:00`).toISOString(),
  };
}

/** Valor de <input type="datetime-local"> (hora de Venezuela) → ISO UTC */
export function localAISO(v: string): string {
  return new Date(`${v}:00-04:00`).toISOString();
}

export function edad(nacimiento?: string | null): string {
  if (!nacimiento) return "—";
  const hoy = hoyISO();
  const [y, m, d] = nacimiento.split("-").map(Number);
  const [y2, m2, d2] = hoy.split("-").map(Number);
  let e = y2 - y;
  if (m2 < m || (m2 === m && d2 < d)) e--;
  return `${e} años`;
}

export function nombreCompleto(p?: Row | null): string {
  if (!p) return "—";
  return `${p.nombres ?? ""} ${p.apellidos ?? ""}`.trim() || "—";
}

/** Días transcurridos entre dos fechas YYYY-MM-DD */
export function diasEntre(desde?: string | null, hasta?: string | null): number | null {
  if (!desde || !hasta) return null;
  const a = new Date(`${desde.slice(0, 10)}T00:00:00Z`).getTime();
  const b = new Date(`${hasta.slice(0, 10)}T00:00:00Z`).getTime();
  return Math.round((b - a) / 86_400_000);
}
