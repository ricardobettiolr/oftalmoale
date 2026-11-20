"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";
import { localAISO } from "@/sistema/lib/format";
import { txt } from "@/sistema/lib/form";

export async function crearCita(formData: FormData) {
  const supabase = await createClient();
  const pacienteId = txt(formData, "paciente_id");
  const cuando = txt(formData, "fecha_hora");

  const { error } = await supabase.from("citas").insert({
    paciente_id: pacienteId,
    solicitante_nombre: pacienteId ? null : txt(formData, "solicitante_nombre"),
    solicitante_telefono: pacienteId ? null : txt(formData, "solicitante_telefono"),
    fecha_hora: cuando ? localAISO(cuando) : null,
    motivo: txt(formData, "motivo"),
    origen: txt(formData, "origen") ?? "presencial",
    estado: cuando ? "confirmada" : "solicitada",
  });
  if (error) throw new Error(error.message);
  redirect("/sistema/agenda");
}

export async function confirmarCita(formData: FormData) {
  const supabase = await createClient();
  const id = txt(formData, "id");
  const cuando = txt(formData, "fecha_hora");
  if (!id || !cuando) throw new Error("Elige fecha y hora para confirmar la cita.");
  const { error } = await supabase.from("citas").update({ fecha_hora: localAISO(cuando), estado: "confirmada" }).eq("id", id);
  if (error) throw new Error(error.message);
  redirect("/sistema/agenda");
}

export async function cambiarEstadoCita(formData: FormData) {
  const supabase = await createClient();
  const id = txt(formData, "id");
  const estado = txt(formData, "estado");
  if (!id || !estado) return;
  const { error } = await supabase.from("citas").update({ estado }).eq("id", id);
  if (error) throw new Error(error.message);
  redirect("/sistema/agenda");
}
