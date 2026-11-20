import { notFound } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";
import { requireDoctora } from "@/sistema/lib/auth";
import { edad, nombreCompleto } from "@/sistema/lib/format";
import { PageHeader } from "@/sistema/components/ui";
import ConsultaForm from "../../../../consultas/ConsultaForm";

export default async function NuevaConsulta({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cita?: string }>;
}) {
  await requireDoctora();
  const { id } = await params;
  const { cita } = await searchParams;
  const supabase = await createClient();
  const { data: p } = await supabase.from("pacientes").select("id,nombres,apellidos,fecha_nacimiento").eq("id", id).maybeSingle();
  if (!p) notFound();

  return (
    <>
      <PageHeader title="Nueva consulta" subtitle={`${nombreCompleto(p)} · ${edad(p.fecha_nacimiento)}`} />
      <ConsultaForm pacienteId={id} citaId={cita} cancelar={`/sistema/pacientes/${id}`} />
    </>
  );
}
