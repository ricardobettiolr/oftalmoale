import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";
import { requireDoctora } from "@/sistema/lib/auth";
import { edad, fecha, nombreCompleto } from "@/sistema/lib/format";
import { TIPOS_CONSULTA, etiqueta } from "@/sistema/lib/catalogos";
import { Card, PageHeader, btn, btnSec } from "@/sistema/components/ui";
import Dato from "@/sistema/components/Dato";
import ExamenTabla from "@/sistema/components/ExamenTabla";

export default async function VerConsulta({ params }: { params: Promise<{ id: string }> }) {
  await requireDoctora();
  const { id } = await params;
  const supabase = await createClient();
  const { data: c } = await supabase.from("consultas").select("*, pacientes(id,nombres,apellidos,fecha_nacimiento,cedula)").eq("id", id).maybeSingle();
  if (!c) notFound();
  const p = c.pacientes;

  return (
    <>
      <PageHeader title={`Consulta · ${fecha(c.fecha)}`} subtitle={`${etiqueta(TIPOS_CONSULTA, c.tipo)} — ${nombreCompleto(p)} (${edad(p.fecha_nacimiento)})`}>
        <Link href={`/sistema/imprimir/consulta/${id}`} className={btn}>
          Informe / récipe
        </Link>
        <Link href={`/sistema/cirugias/nueva?paciente=${p.id}&consulta=${id}`} className={btnSec}>
          Indicar cirugía
        </Link>
        <Link href={`/sistema/consultas/${id}/editar`} className={btnSec}>
          Editar
        </Link>
        <Link href={`/sistema/pacientes/${p.id}`} className={btnSec}>
          Ficha del paciente
        </Link>
      </PageHeader>

      <div className="space-y-5">
        <Card title="Motivo">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Dato label="Motivo de consulta" value={c.motivo} />
            <Dato label="Enfermedad actual" value={c.enfermedad_actual} />
          </dl>
        </Card>
        <Card title="Examen">
          <ExamenTabla c={c} />
        </Card>
        <Card title="Diagnóstico y plan">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Dato label="Diagnóstico" value={c.diagnostico} className="sm:col-span-2" />
            <Dato label="Plan / conducta" value={c.plan} />
            <Dato label="Indicaciones" value={c.indicaciones} />
            <Dato label="Récipe" value={c.recipe} />
            <Dato label="Próximo control" value={fecha(c.proximo_control)} />
          </dl>
        </Card>
      </div>
    </>
  );
}
