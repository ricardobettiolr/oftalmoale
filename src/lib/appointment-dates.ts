/** Consultation days: Monday (1), Wednesday (3), Thursday (4). JS getDay(): Sun=0. */
export const CONSULTATION_WEEKDAYS = [1, 3, 4] as const;

export const CONSULTATION_DAYS_NOTE =
  "Las consultas se atienden los lunes, miércoles y jueves.";

export const INVALID_CONSULTATION_DATE_MESSAGE =
  "Seleccione un lunes, miércoles o jueves a partir de hoy.";

/** Local calendar YYYY-MM-DD for today (avoids UTC off-by-one). */
export function todayISODate(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse YYYY-MM-DD as a local calendar date (noon avoids DST edge cases). */
export function parseISODateLocal(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function isConsultationWeekday(date: Date) {
  return (CONSULTATION_WEEKDAYS as readonly number[]).includes(date.getDay());
}

/**
 * Validates preferred consultation date.
 * Empty is allowed (optional field). Non-empty must be a real date,
 * not in the past, and Mon/Wed/Thu.
 */
export function validatePreferredDate(value: string, now = new Date()) {
  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: true as const };
  }

  const date = parseISODateLocal(trimmed);
  if (!date) {
    return { ok: false as const, error: INVALID_CONSULTATION_DATE_MESSAGE };
  }

  const today = parseISODateLocal(todayISODate(now));
  if (!today || date < today) {
    return { ok: false as const, error: INVALID_CONSULTATION_DATE_MESSAGE };
  }

  if (!isConsultationWeekday(date)) {
    return { ok: false as const, error: INVALID_CONSULTATION_DATE_MESSAGE };
  }

  return { ok: true as const };
}
