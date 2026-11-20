import { notFound } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";
import { PageHeader } from "@/sistema/components/ui";
import { nombreCompleto } from "@/sistema/lib/format";
import PacienteForm from "../../PacienteForm";

export default async function EditarPaciente({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: p } = await supabase.from("pacientes").select("*").eq("id", id).maybeSingle();
  if (!p) notFound();
  return (
    <>
      <PageHeader title={`Editar: ${nombreCompleto(p)}`} />
      <PacienteForm initial={p} cancelar={`/sistema/pacientes/${id}`} />
    </>
  );
}
