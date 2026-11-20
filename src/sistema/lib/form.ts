/** Texto del formulario; cadena vacía → null */
export function txt(fd: FormData, k: string): string | null {
  const v = fd.get(k);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t === "" ? null : t;
}

/** Número del formulario (acepta coma decimal); vacío o inválido → null */
export function num(fd: FormData, k: string): number | null {
  const t = txt(fd, k);
  if (t === null) return null;
  const n = Number(t.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

export type Campo = { key: string; label: string };

/** Lee campos `${prefijo}_${clave}_od` / `_oi` y devuelve dos objetos listos para jsonb */
export function paresOjos(fd: FormData, prefijo: string, campos: readonly Campo[]) {
  const od: Record<string, string> = {};
  const oi: Record<string, string> = {};
  for (const c of campos) {
    const a = txt(fd, `${prefijo}_${c.key}_od`);
    if (a) od[c.key] = a;
    const b = txt(fd, `${prefijo}_${c.key}_oi`);
    if (b) oi[c.key] = b;
  }
  return { od, oi };
}
