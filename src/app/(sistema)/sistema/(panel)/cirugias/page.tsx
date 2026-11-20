import Link from "next/link";
import { createClient } from "@/sistema/lib/supabase/server";
import { requireDoctora } from "@/sistema/lib/auth";
import { fecha, nombreCompleto } from "@/sistema/lib/format";
import { ESTADOS_CIRUGIA, etiqueta } from "@/sistema/lib/catalogos";
import { Badge, Card, PageHeader, Vacio } from "@/sistema/components/ui";

export default async function Cirugias({ searchParams }: { searchParams: Promise<{ estado?: string }> }) {
  await requireDoctora();
  const { estado } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("cirugias")
    .select("id,ojo,procedimiento,estado,fecha_cirugia,pacientes(nombres,apellidos)")
    .order("fecha_cirugia", { ascending: true, nullsFirst: true })
    .limit(200);

  if (!estado) query = query.not("estado", "in", "(cerrada,cancelada)");
  else if (estado !== "todas") query = query.eq("estado", estado);
  const { data: cirugias } = await query;

  const filtros = [{ v: "", l: "Activas" }, ...ESTADOS_CIRUGIA, { v: "todas", l: "Todas" }];
  const activo = estado ?? "";

  return (
    <>
      <PageHeader title="Cirugías" subtitle="Para indicar una cirugía nueva, entra a la ficha del paciente." />

      <div className="mb-4 flex flex-wrap gap-2">
        {filtros.map((f) => (
          <Link
            key={f.v}
            href={f.v ? `/sistema/cirugias?estado=${f.v}` : "/sistema/cirugias"}
            className={`rounded-full px-3 py-1 text-sm ${activo === f.v ? "bg-sky-700 text-white" : "border border-slate-400 bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            {f.l}
          </Link>
        ))}
      </div>

      <Card>
        {!cirugias || cirugias.length === 0 ? (
          <Vacio>No hay cirugías en esta vista.</Vacio>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-left text-xs text-slate-600">
                <th className="py-2 pr-3 font-medium">Fecha</th>
                <th className="py-2 pr-3 font-medium">Paciente</th>
                <th className="py-2 pr-3 font-medium">Ojo</th>
                <th className="py-2 pr-3 font-medium">Procedimiento</th>
                <th className="py-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {cirugias.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="py-2 pr-3 text-slate-700">{fecha(c.fecha_cirugia)}</td>
                  <td className="py-2 pr-3">
                    <Link href={`/sistema/cirugias/${c.id}`} className="font-medium text-sky-800 hover:underline">
                      {nombreCompleto(c.pacientes)}
                    </Link>
                  </td>
                  <td className="py-2 pr-3 text-slate-700">{c.ojo}</td>
                  <td className="py-2 pr-3 text-slate-700">{c.procedimiento}</td>
                  <td className="py-2">
                    <Badge valor={c.estado} texto={etiqueta(ESTADOS_CIRUGIA, c.estado)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
}
