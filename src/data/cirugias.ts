export type CirugiaCase = {
  id: string;
  title: string;
  description?: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

/**
 * Add before/after surgery cases here.
 * Place images under public/assets/cirugias/ (e.g. caso-01-antes.jpg).
 */
export const cirugiasCases: CirugiaCase[] = [
  // Example (uncomment when assets exist):
  // {
  //   id: "caso-01",
  //   title: "Cirugía de catarata",
  //   description: "Resultado postoperatorio a las semanas de seguimiento.",
  //   beforeSrc: "/assets/cirugias/caso-01-antes.jpg",
  //   afterSrc: "/assets/cirugias/caso-01-despues.jpg",
  //   beforeAlt: "Antes — caso quirúrgico",
  //   afterAlt: "Después — caso quirúrgico",
  // },
];
