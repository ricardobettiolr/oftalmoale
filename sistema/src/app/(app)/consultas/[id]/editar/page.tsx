import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireDoctora } from "@/lib/auth";
import { fecha, nombreCompleto } from "@/lib/format";
import { PageHeader } from "@/components/ui";
import ConsultaForm from "../../ConsultaForm";

export default async function EditarConsulta({ params }: { params: Promise<{ id: string }> }) {
  await requireDoctora();
  const { id } = await params;
  const supabase = await createClient();
  const { data: c } = await supabase.from("consultas").select("*, pacientes(nombres,apellidos)").eq("id", id).maybeSingle();
  if (!c) notFound();
  return (
    <>
      <PageHeader title="Editar consulta" subtitle={`${nombreCompleto(c.pacientes)} · ${fecha(c.fecha)}`} />
      <ConsultaForm initial={c} cancelar={`/consultas/${id}`} />
    </>
  );
}
