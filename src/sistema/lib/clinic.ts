// Datos del consultorio: aparecen en el membrete de informes, récipes y notas operatorias.
// Completar los números de registro profesional antes de imprimir.
export const CLINICA = {
  nombre: "Oftalmoale",
  doctora: "Dra. María Alejandra Rojas",
  titulo: "Médico Oftalmólogo",
  subtitulo: "Segmento anterior · Cirugía de catarata · Córnea",
  direccion: "Centro Comercial Plaza Mayor, Piso 2, junto a Liberty Express. Mérida, Venezuela",
  telefono: "+58 414-7204850",
  email: "agenda@oftalmoale.com",
  registros: ["MPPS: ________", "CMM: ________"],
  // 0 = domingo … 6 = sábado. Lunes, miércoles y viernes.
  diasConsulta: [1, 3, 5],
  zonaHoraria: "America/Caracas", // UTC-4 fijo, sin horario de verano
} as const;
