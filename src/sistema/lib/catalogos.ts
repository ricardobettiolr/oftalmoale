import type { Campo } from "./form";

export const TIPOS_CONSULTA = [
  { v: "general", l: "Oftalmología general" },
  { v: "segmento_anterior", l: "Segmento anterior" },
  { v: "cornea", l: "Córnea" },
  { v: "preoperatoria", l: "Evaluación preoperatoria" },
  { v: "postoperatoria", l: "Control postoperatorio" },
  { v: "control", l: "Control" },
] as const;

export const ESTADOS_CITA = [
  { v: "solicitada", l: "Solicitada" },
  { v: "confirmada", l: "Confirmada" },
  { v: "atendida", l: "Atendida" },
  { v: "cancelada", l: "Cancelada" },
  { v: "no_asistio", l: "No asistió" },
] as const;

export const ORIGENES_CITA = [
  { v: "presencial", l: "Presencial" },
  { v: "telefono", l: "Teléfono / WhatsApp" },
  { v: "email", l: "Correo" },
  { v: "web", l: "Web" },
] as const;

export const ESTADOS_CIRUGIA = [
  { v: "indicada", l: "Indicada" },
  { v: "preoperatorio", l: "Preoperatorio" },
  { v: "programada", l: "Programada" },
  { v: "operada", l: "Operada" },
  { v: "postoperatorio", l: "Postoperatorio" },
  { v: "cerrada", l: "Cerrada" },
  { v: "cancelada", l: "Cancelada" },
] as const;

// Sugerencias (el campo admite texto libre)
export const PROCEDIMIENTOS = [
  "Facoemulsificación + LIO",
  "Facoemulsificación + LIO tórico",
  "Facoemulsificación + LIO multifocal",
  "Catarata extracapsular + LIO",
  "Capsulotomía YAG láser",
  "Queratoplastia penetrante",
  "DMEK",
  "DSAEK",
  "Queratoplastia lamelar anterior (DALK)",
  "Cross-linking corneal",
  "Anillos intraestromales",
  "Pterigión con autoinjerto conjuntival",
  "Reparación de herida corneal",
  "Extracción de cuerpo extraño corneal",
];

export const LIO_FORMULAS = ["SRK/T", "Barrett Universal II", "Hoffer Q", "Holladay 2", "Haigis", "Kane", "EVO"];

export const ANESTESIAS = ["Tópica", "Tópica + intracameral", "Peribulbar", "Retrobulbar", "Subtenoniana", "General"];

export const BIO_CAMPOS: readonly Campo[] = [
  { key: "parpados", label: "Párpados y anexos" },
  { key: "conjuntiva", label: "Conjuntiva" },
  { key: "cornea", label: "Córnea" },
  { key: "camara_anterior", label: "Cámara anterior" },
  { key: "iris", label: "Iris / pupila" },
  { key: "cristalino", label: "Cristalino" },
];

export const FONDO_CAMPOS: readonly Campo[] = [
  { key: "vitreo", label: "Vítreo" },
  { key: "papila", label: "Papila" },
  { key: "excavacion", label: "Excavación (C/D)" },
  { key: "macula", label: "Mácula" },
  { key: "vasos", label: "Vasos" },
  { key: "periferia", label: "Retina periférica" },
];

export const etiqueta = (lista: readonly { v: string; l: string }[], v?: string | null) =>
  lista.find((x) => x.v === v)?.l ?? v ?? "—";
