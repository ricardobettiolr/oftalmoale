import Link from "next/link";
import { createClient } from "@/sistema/lib/supabase/server";
import { nombreCompleto } from "@/sistema/lib/format";
import { ORIGENES_CITA } from "@/sistema/lib/catalogos";
import { Area, Campo, Card, PageHeader, Seleccion, btn, btnSec } from "@/sistema/components/ui";
import { crearCita } from "../actions";

export default async function NuevaCita({ searchParams }: { searchParams: Promise<{ paciente?: string }> }) {
  const { paciente } = await searchParams;
  let p = null;
  if (paciente) {
    const supabase = await createClient();
    const { data } = await supabase.from("pacientes").select("id,nombres,apellidos").eq("id", paciente).maybeSingle();
    p = data;
  }

  return (
    <>
      <PageHeader title="Nueva cita" subtitle={p ? nombreCompleto(p) : "Para alguien que aún no tiene ficha; podrás crearla después."} />
      <form action={crearCita}>
        <Card>
          {p && <input type="hidden" name="paciente_id" value={p.id} />}
          <div className="grid gap-4 sm:grid-cols-2">
            {!p && <Campo label="Nombre y apellido" name="solicitante_nombre" required />}
            {!p && <Campo label="Teléfono" name="solicitante_telefono" />}
            <Campo label="Fecha y hora" name="fecha_hora" type="datetime-local" required />
            <Seleccion label="¿Cómo llegó la cita?" name="origen" opciones={ORIGENES_CITA} defaultValue="telefono" />
            <Area label="Motivo" name="motivo" className="sm:col-span-2" rows={2} />
          </div>
          <div className="mt-5 flex gap-2">
            <button className={btn}>Guardar cita</button>
            <Link href="/sistema/agenda" className={btnSec}>
              Cancelar
            </Link>
          </div>
        </Card>
      </form>
    </>
  );
}
