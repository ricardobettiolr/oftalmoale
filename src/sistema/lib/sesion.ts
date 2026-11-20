"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";

export async function iniciarSesion(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  });
  if (error) redirect("/sistema/login?error=1");
  redirect("/sistema");
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sistema/login");
}
