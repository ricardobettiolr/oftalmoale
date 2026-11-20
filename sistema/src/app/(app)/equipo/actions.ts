"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireDoctora } from "@/lib/auth";
import { txt } from "@/lib/form";

export async function actualizarPerfil(formData: FormData) {
  const yo = await requireDoctora();
  const id = txt(formData, "id");
  if (!id || id === yo.id) return; // la doctora no puede desactivarse a sí misma
  const supabase = await createClient();
  const { error } = await supabase.from("perfiles").update({ activo: txt(formData, "activo") === "true" }).eq("id", id);
  if (error) throw new Error(error.message);
  redirect("/equipo");
}
