import { createClient } from "@/sistema/lib/supabase/server";
import { requireDoctora } from "@/sistema/lib/auth";
import { fecha } from "@/sistema/lib/format";
import { Card, PageHeader, btnMini } from "@/sistema/components/ui";
import { actualizarPerfil } from "./actions";

export default async function Equipo() {
  const yo = await requireDoctora();
  const supabase = await createClient();
  const { data: perfiles } = await supabase.from("perfiles").select("*").order("created_at");

  return (
    <>
      <PageHeader title="Equipo" subtitle="Quién puede entrar al sistema. Las cuentas se crean en Supabase (Authentication → Users) y aquí se activan." />
      <Card>
        <ul className="divide-y divide-slate-100">
          {(perfiles ?? []).map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 text-sm">
              <span className="flex-1">
                <span className="font-medium text-slate-900">{p.nombre}</span>
                <span className="text-slate-500"> · {p.rol === "doctora" ? "Doctora" : "Secretaria"} · desde {fecha(p.created_at)}</span>
              </span>
              <span className={p.activo ? "text-emerald-700" : "text-amber-700"}>{p.activo ? "Activo" : "Pendiente de activar"}</span>
              {p.id !== yo.id && (
                <form action={actualizarPerfil}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="activo" value={p.activo ? "false" : "true"} />
                  <button className={btnMini}>{p.activo ? "Desactivar" : "Activar"}</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
