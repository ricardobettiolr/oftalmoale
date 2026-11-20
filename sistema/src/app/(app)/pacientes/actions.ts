"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { txt } from "@/lib/form";

export async function guardarPaciente(formData: FormData) {
  const supabase = await createClient();
  const id = txt(formData, "id");

  const row = {
    nombres: txt(formData, "nombres"),
    apellidos: txt(formData, "apellidos"),
    cedula: txt(formData, "cedula"),
    fecha_nacimiento: txt(formData, "fecha_nacimiento"),
    sexo: txt(formData, "sexo"),
    telefono: txt(formData, "telefono"),
    email: txt(formData, "email"),
    direccion: txt(formData, "direccion"),
    ocupacion: txt(formData, "ocupacion"),
    antecedentes_oculares: txt(formData, "antecedentes_oculares"),
    antecedentes_sistemicos: txt(formData, "antecedentes_sistemicos"),
    antecedentes_familiares: txt(formData, "antecedentes_familiares"),
    alergias: txt(formData, "alergias"),
    medicamentos: txt(formData, "medicamentos"),
    notas: txt(formData, "notas"),
  };
  if (!row.nombres || !row.apellidos) throw new Error("Nombres y apellidos son obligatorios.");

  if (id) {
    const { error } = await supabase.from("pacientes").update(row).eq("id", id);
    if (error) throw new Error(mensaje(error));
    redirect(`/pacientes/${id}`);
  }

  const { data, error } = await supabase.from("pacientes").insert(row).select("id").single();
  if (error) throw new Error(mensaje(error));

  // Si venía de una solicitud de cita, la vinculamos al paciente recién creado.
  const citaId = txt(formData, "cita_id");
  if (citaId) await supabase.from("citas").update({ paciente_id: data.id }).eq("id", citaId);

  redirect(`/pacientes/${data.id}`);
}

function mensaje(error: { code?: string; message: string }) {
  if (error.code === "23505") return "Ya existe un paciente con esa cédula.";
  return error.message;
}
