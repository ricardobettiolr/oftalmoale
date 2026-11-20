import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import type { Row } from "./format";

/** Perfil del usuario con sesión (o null). Se calcula una sola vez por petición. */
export const getPerfil = cache(async (): Promise<Row | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("perfiles").select("*").eq("id", user.id).maybeSingle();
  return data ? { ...data, email: user.email } : null;
});

/** Solo la doctora (rol 'doctora' y activa). Si no, vuelve al inicio. */
export async function requireDoctora(): Promise<Row> {
  const p = await getPerfil();
  if (!p || !p.activo || p.rol !== "doctora") redirect("/sistema");
  return p;
}
