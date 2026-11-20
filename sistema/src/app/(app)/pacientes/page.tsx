import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { edad } from "@/lib/format";
import { PageHeader, Card, Vacio, btn, input } from "@/components/ui";

export default async function Pacientes({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("pacientes")
    .select("id,nombres,apellidos,cedula,telefono,fecha_nacimiento")
    .order("apellidos")
    .order("nombres")
    .limit(100);

  const s = (q ?? "").replace(/[%,()*\\]/g, " ").trim();
  if (s) {
    query = query.or(`nombres.ilike.%${s}%,apellidos.ilike.%${s}%,cedula.ilike.%${s}%,telefono.ilike.%${s}%`);
  }
  const { data: pacientes } = await query;

  return (
    <>
      <PageHeader title="Pacientes" subtitle={s ? `Resultados para “${s}”` : "Los 100 primeros por apellido. Usa el buscador para encontrar a alguien."}>
        <Link href="/pacientes/nuevo" className={btn}>
          + Nuevo paciente
        </Link>
      </PageHeader>

      <form className="mb-4 flex gap-2">
        <input className={input} name="q" defaultValue={q ?? ""} placeholder="Buscar por nombre, apellido, cédula o teléfono" />
        <button className={btn}>Buscar</button>
      </form>

      <Card>
        {!pacientes || pacientes.length === 0 ? (
          <Vacio>No hay pacientes{s ? " con esa búsqueda" : " registrados todavía"}.</Vacio>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
                <th className="py-2 pr-3 font-medium">Paciente</th>
                <th className="py-2 pr-3 font-medium">Cédula</th>
                <th className="py-2 pr-3 font-medium">Edad</th>
                <th className="py-2 font-medium">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="py-2 pr-3">
                    <Link href={`/pacientes/${p.id}`} className="font-medium text-sky-800 hover:underline">
                      {p.apellidos}, {p.nombres}
                    </Link>
                  </td>
                  <td className="py-2 pr-3 text-slate-600">{p.cedula ?? "—"}</td>
                  <td className="py-2 pr-3 text-slate-600">{edad(p.fecha_nacimiento)}</td>
                  <td className="py-2 text-slate-600">{p.telefono ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
}
