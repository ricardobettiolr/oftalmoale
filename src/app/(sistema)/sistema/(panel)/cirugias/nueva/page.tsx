import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";
import { requireDoctora } from "@/sistema/lib/auth";
import { nombreCompleto } from "@/sistema/lib/format";
import { PROCEDIMIENTOS } from "@/sistema/lib/catalogos";
import { Area, Campo, Card, PageHeader, Seleccion, btn, btnSec } from "@/sistema/components/ui";
import { guardarCirugia } from "../actions";

const OJOS = [
  { v: "OD", l: "OD · ojo derecho" },
  { v: "OI", l: "OI · ojo izquierdo" },
];

export default async function NuevaCirugia({ searchParams }: { searchParams: Promise<{ paciente?: string; consulta?: string }> }) {
  await requireDoctora();
  const { paciente, consulta } = await searchParams;
  if (!paciente) redirect("/sistema/pacientes");

  const supabase = await createClient();
  const { data: p } = await supabase.from("pacientes").select("id,nombres,apellidos").eq("id", paciente).maybeSingle();
  if (!p) redirect("/sistema/pacientes");

  return (
    <>
      <PageHeader title="Indicar cirugía" subtitle={nombreCompleto(p)} />
      <form action={guardarCirugia}>
        <input type="hidden" name="paciente_id" value={p.id} />
        {consulta && <input type="hidden" name="consulta_id" value={consulta} />}
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Seleccion label="Ojo" name="ojo" opciones={OJOS} required />
            <Campo label="Procedimiento" name="procedimiento" list="procedimientos" required placeholder="Facoemulsificación + LIO" />
            <datalist id="procedimientos">
              {PROCEDIMIENTOS.map((x) => (
                <option key={x} value={x} />
              ))}
            </datalist>
            <Area label="Indicación quirúrgica" name="indicacion" className="sm:col-span-2" placeholder="Catarata nuclear grado III con AV 20/200…" />
          </div>
          <p className="mt-3 text-xs text-slate-600">Después podrás cargar biometría, LIO, fecha, nota operatoria y controles.</p>
          <div className="mt-5 flex gap-2">
            <button className={btn}>Crear cirugía</button>
            <Link href={`/sistema/pacientes/${p.id}`} className={btnSec}>
              Cancelar
            </Link>
          </div>
        </Card>
      </form>
    </>
  );
}
