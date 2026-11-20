import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";
import { getPerfil } from "@/sistema/lib/auth";
import { edad, fecha, fechaHora, nombreCompleto } from "@/sistema/lib/format";
import { ESTADOS_CIRUGIA, ESTADOS_CITA, TIPOS_CONSULTA, etiqueta } from "@/sistema/lib/catalogos";
import { Badge, Card, PageHeader, Vacio, btn, btnSec } from "@/sistema/components/ui";
import Dato from "@/sistema/components/Dato";

export default async function FichaPaciente({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const perfil = await getPerfil();
  const doctora = perfil?.rol === "doctora";

  const { data: p } = await supabase.from("pacientes").select("*").eq("id", id).maybeSingle();
  if (!p) notFound();

  const [citas, consultas, cirugias] = await Promise.all([
    supabase.from("citas").select("id,fecha_hora,fecha_preferida,motivo,estado").eq("paciente_id", id).order("created_at", { ascending: false }).limit(10),
    doctora
      ? supabase.from("consultas").select("id,fecha,tipo,diagnostico").eq("paciente_id", id).order("fecha", { ascending: false })
      : Promise.resolve({ data: [] as { id: string; fecha: string; tipo: string; diagnostico: string | null }[] }),
    doctora
      ? supabase.from("cirugias").select("id,ojo,procedimiento,estado,fecha_cirugia").eq("paciente_id", id).order("created_at", { ascending: false })
      : Promise.resolve({ data: [] as { id: string; ojo: string; procedimiento: string; estado: string; fecha_cirugia: string | null }[] }),
  ]);

  return (
    <>
      <PageHeader title={nombreCompleto(p)} subtitle={`${edad(p.fecha_nacimiento)} · C.I. ${p.cedula ?? "sin registrar"}`}>
        {doctora && (
          <Link href={`/sistema/pacientes/${id}/consulta/nueva`} className={btn}>
            + Nueva consulta
          </Link>
        )}
        {doctora && (
          <Link href={`/sistema/cirugias/nueva?paciente=${id}`} className={btnSec}>
            + Indicar cirugía
          </Link>
        )}
        <Link href={`/sistema/agenda/nueva?paciente=${id}`} className={btnSec}>
          Agendar cita
        </Link>
        <Link href={`/sistema/pacientes/${id}/editar`} className={btnSec}>
          Editar datos
        </Link>
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Datos">
          <dl className="grid grid-cols-2 gap-4">
            <Dato label="Fecha de nacimiento" value={fecha(p.fecha_nacimiento)} />
            <Dato label="Sexo" value={p.sexo} />
            <Dato label="Teléfono" value={p.telefono} />
            <Dato label="Correo" value={p.email} />
            <Dato label="Ocupación" value={p.ocupacion} />
            <Dato label="Dirección" value={p.direccion} />
          </dl>
        </Card>

        <Card title="Antecedentes">
          <dl className="grid grid-cols-2 gap-4">
            <Dato label="Oculares" value={p.antecedentes_oculares} />
            <Dato label="Sistémicos" value={p.antecedentes_sistemicos} />
            <Dato label="Familiares" value={p.antecedentes_familiares} />
            <Dato label="Alergias" value={p.alergias} />
            <Dato label="Medicamentos" value={p.medicamentos} />
            <Dato label="Notas" value={p.notas} />
          </dl>
        </Card>

        {doctora && (
          <Card title="Consultas" className="lg:col-span-2">
            {!consultas.data || consultas.data.length === 0 ? (
              <Vacio>Aún no hay consultas registradas.</Vacio>
            ) : (
              <ul className="divide-y divide-slate-100">
                {consultas.data.map((c) => (
                  <li key={c.id}>
                    <Link href={`/sistema/consultas/${c.id}`} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-2.5 hover:bg-slate-50">
                      <span className="w-24 text-sm font-medium text-slate-700">{fecha(c.fecha)}</span>
                      <span className="w-48 text-sm text-slate-600">{etiqueta(TIPOS_CONSULTA, c.tipo)}</span>
                      <span className="flex-1 text-sm text-slate-900">{c.diagnostico ?? "Sin diagnóstico"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}

        {doctora && (
          <Card title="Cirugías" className="lg:col-span-2">
            {!cirugias.data || cirugias.data.length === 0 ? (
              <Vacio>Sin cirugías indicadas.</Vacio>
            ) : (
              <ul className="divide-y divide-slate-100">
                {cirugias.data.map((c) => (
                  <li key={c.id}>
                    <Link href={`/sistema/cirugias/${c.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5 hover:bg-slate-50">
                      <span className="w-24 text-sm font-medium text-slate-700">{fecha(c.fecha_cirugia)}</span>
                      <span className="w-10 text-sm text-slate-600">{c.ojo}</span>
                      <span className="flex-1 text-sm text-slate-900">{c.procedimiento}</span>
                      <Badge valor={c.estado} texto={etiqueta(ESTADOS_CIRUGIA, c.estado)} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}

        <Card title="Citas" className="lg:col-span-2">
          {!citas.data || citas.data.length === 0 ? (
            <Vacio>Sin citas registradas.</Vacio>
          ) : (
            <ul className="divide-y divide-slate-100">
              {citas.data.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5 text-sm">
                  <span className="w-40 font-medium text-slate-700">{c.fecha_hora ? fechaHora(c.fecha_hora) : fecha(c.fecha_preferida)}</span>
                  <span className="flex-1 text-slate-700">{c.motivo ?? "—"}</span>
                  <Badge valor={c.estado} texto={etiqueta(ESTADOS_CITA, c.estado)} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
