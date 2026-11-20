"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";

export async function iniciarSesion(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  });
  if (error) {
    // Distingue la causa para no culpar siempre a la contraseña.
    const motivo =
      error.code === "email_not_confirmed"
        ? "sin_confirmar"
        : error.code === "invalid_credentials"
          ? "credenciales"
          : "servicio";
    redirect(`/sistema/login?error=${motivo}`);
  }
  redirect("/sistema");
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sistema/login");
}
