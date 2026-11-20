"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";
import { requireDoctora } from "@/sistema/lib/auth";
import { num, txt } from "@/sistema/lib/form";
import { hoyISO } from "@/sistema/lib/format";

export async function guardarCirugia(formData: FormData) {
  await requireDoctora();
  const supabase = await createClient();
  const id = txt(formData, "id");

  const procedimiento = txt(formData, "procedimiento");
  const ojo = txt(formData, "ojo");
  if (!procedimiento || !ojo) throw new Error("Indica el ojo y el procedimiento.");

  const biometria: Record<string, string | number> = {};
  for (const k of ["longitud_axial", "k1", "k2", "cac"]) {
    const v = num(formData, `bio_${k}`);
    if (v !== null) biometria[k] = v;
  }
  const equipo = txt(formData, "bio_equipo");
  if (equipo) biometria.equipo = equipo;

  const row = {
    ojo,
    procedimiento,
    estado: txt(formData, "estado") ?? "indicada",
    indicacion: txt(formData, "indicacion"),
    biometria,
    lio_modelo: txt(formData, "lio_modelo"),
    lio_poder: num(formData, "lio_poder"),
    lio_constante: txt(formData, "lio_constante"),
    lio_formula: txt(formData, "lio_formula"),
    lio_refraccion_objetivo: num(formData, "lio_refraccion_objetivo"),
    consentimiento_firmado: formData.get("consentimiento_firmado") === "on",
    fecha_cirugia: txt(formData, "fecha_cirugia"),
    lugar: txt(formData, "lugar"),
    anestesia: txt(formData, "anestesia"),
    nota_operatoria: txt(formData, "nota_operatoria"),
    complicaciones: txt(formData, "complicaciones"),
    observaciones: txt(formData, "observaciones"),
  };

  if (id) {
    const { error } = await supabase.from("cirugias").update(row).eq("id", id);
    if (error) throw new Error(error.message);
    redirect(`/sistema/cirugias/${id}`);
  }

  const pacienteId = txt(formData, "paciente_id");
  if (!pacienteId) throw new Error("Falta el paciente.");
  const { data, error } = await supabase
    .from("cirugias")
    .insert({ ...row, paciente_id: pacienteId, consulta_id: txt(formData, "consulta_id") })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  redirect(`/sistema/cirugias/${data.id}`);
}

export async function agregarControl(formData: FormData) {
  await requireDoctora();
  const supabase = await createClient();
  const cirugiaId = txt(formData, "cirugia_id");
  if (!cirugiaId) throw new Error("Falta la cirugía.");

  const { error } = await supabase.from("controles_postop").insert({
    cirugia_id: cirugiaId,
    fecha: txt(formData, "fecha") ?? hoyISO(),
    av: txt(formData, "av"),
    pio: num(formData, "pio"),
    hallazgos: txt(formData, "hallazgos"),
    indicaciones: txt(formData, "indicaciones"),
    proximo_control: txt(formData, "proximo_control"),
  });
  if (error) throw new Error(error.message);

  // Al registrar el primer control, la cirugía pasa a "postoperatorio".
  await supabase.from("cirugias").update({ estado: "postoperatorio" }).eq("id", cirugiaId).in("estado", ["programada", "operada"]);
  redirect(`/sistema/cirugias/${cirugiaId}`);
}
