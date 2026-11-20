import { createClient } from "@/sistema/lib/supabase/server";
import { PageHeader } from "@/sistema/components/ui";
import PacienteForm from "../PacienteForm";

export default async function NuevoPaciente({ searchParams }: { searchParams: Promise<{ cita?: string }> }) {
  const { cita } = await searchParams;
  let initial;

  // Si viene de una solicitud de cita, precargamos lo que escribió la persona.
  if (cita) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("citas")
      .select("solicitante_nombre,solicitante_telefono,solicitante_email")
      .eq("id", cita)
      .maybeSingle();
    if (data) {
      const partes = (data.solicitante_nombre ?? "").trim().split(/\s+/);
      const mitad = Math.ceil(partes.length / 2);
      initial = {
        nombres: partes.slice(0, mitad).join(" "),
        apellidos: partes.slice(mitad).join(" "),
        telefono: data.solicitante_telefono,
        email: data.solicitante_email,
      };
    }
  }

  return (
    <>
      <PageHeader title="Nuevo paciente" subtitle={cita ? "Datos precargados desde la solicitud de cita; revisa nombres y apellidos." : undefined} />
      <PacienteForm initial={initial} citaId={cita} cancelar="/sistema/pacientes" />
    </>
  );
}
