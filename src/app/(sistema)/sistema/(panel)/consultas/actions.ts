"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";
import { requireDoctora } from "@/sistema/lib/auth";
import { num, paresOjos, txt } from "@/sistema/lib/form";
import { BIO_CAMPOS, FONDO_CAMPOS } from "@/sistema/lib/catalogos";
import { hoyISO } from "@/sistema/lib/format";

export async function guardarConsulta(formData: FormData) {
  await requireDoctora();
  const supabase = await createClient();

  const id = txt(formData, "id");
  const bio = paresOjos(formData, "bio", BIO_CAMPOS);
  const fon = paresOjos(formData, "fon", FONDO_CAMPOS);

  const row = {
    tipo: txt(formData, "tipo") ?? "general",
    fecha: txt(formData, "fecha") ?? hoyISO(),
    motivo: txt(formData, "motivo"),
    enfermedad_actual: txt(formData, "enfermedad_actual"),
    av_sc_od: txt(formData, "av_sc_od"),
    av_sc_oi: txt(formData, "av_sc_oi"),
    av_cc_od: txt(formData, "av_cc_od"),
    av_cc_oi: txt(formData, "av_cc_oi"),
    refraccion_od: txt(formData, "refraccion_od"),
    refraccion_oi: txt(formData, "refraccion_oi"),
    pio_od: num(formData, "pio_od"),
    pio_oi: num(formData, "pio_oi"),
    pio_metodo: txt(formData, "pio_metodo"),
    biomicroscopia_od: bio.od,
    biomicroscopia_oi: bio.oi,
    fondo_od: fon.od,
    fondo_oi: fon.oi,
    diagnostico: txt(formData, "diagnostico"),
    plan: txt(formData, "plan"),
    indicaciones: txt(formData, "indicaciones"),
    recipe: txt(formData, "recipe"),
    proximo_control: txt(formData, "proximo_control"),
  };

  if (id) {
    const { error } = await supabase.from("consultas").update(row).eq("id", id);
    if (error) throw new Error(error.message);
    redirect(`/sistema/consultas/${id}`);
  }

  const pacienteId = txt(formData, "paciente_id");
  if (!pacienteId) throw new Error("Falta el paciente.");
  const citaId = txt(formData, "cita_id");

  const { data, error } = await supabase
    .from("consultas")
    .insert({ ...row, paciente_id: pacienteId, cita_id: citaId })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  if (citaId) await supabase.from("citas").update({ estado: "atendida" }).eq("id", citaId);
  redirect(`/sistema/consultas/${data.id}`);
}
