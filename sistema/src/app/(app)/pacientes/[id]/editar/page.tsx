import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui";
import { nombreCompleto } from "@/lib/format";
import PacienteForm from "../../PacienteForm";

export default async function EditarPaciente({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: p } = await supabase.from("pacientes").select("*").eq("id", id).maybeSingle();
  if (!p) notFound();
  return (
    <>
      <PageHeader title={`Editar: ${nombreCompleto(p)}`} />
      <PacienteForm initial={p} cancelar={`/pacientes/${id}`} />
    </>
  );
}
