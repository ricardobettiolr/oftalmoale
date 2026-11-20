import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/sistema/lib/supabase/server";
import { requireDoctora } from "@/sistema/lib/auth";
import { diasEntre, edad, fecha, hoyISO, nombreCompleto } from "@/sistema/lib/format";
import { ANESTESIAS, ESTADOS_CIRUGIA, LIO_FORMULAS, PROCEDIMIENTOS } from "@/sistema/lib/catalogos";
import { Area, Campo, Card, PageHeader, Seleccion, Vacio, btn, btnSec } from "@/sistema/components/ui";
import { agregarControl, guardarCirugia } from "../actions";

const OJOS = [
  { v: "OD", l: "OD · ojo derecho" },
  { v: "OI", l: "OI · ojo izquierdo" },
];

export default async function DetalleCirugia({ params }: { params: Promise<{ id: string }> }) {
  await requireDoctora();
  const { id } = await params;
  const supabase = await createClient();

  const { data: c } = await supabase.from("cirugias").select("*, pacientes(id,nombres,apellidos,fecha_nacimiento)").eq("id", id).maybeSingle();
  if (!c) notFound();
  const { data: controles } = await supabase.from("controles_postop").select("*").eq("cirugia_id", id).order("fecha");
  const p = c.pacientes;
  const b = c.biometria ?? {};

  return (
    <>
      <PageHeader title={`${c.procedimiento} · ${c.ojo}`} subtitle={`${nombreCompleto(p)} (${edad(p.fecha_nacimiento)})`}>
        <Link href={`/sistema/imprimir/cirugia/${id}`} className={btn}>
          Nota operatoria
        </Link>
        <Link href={`/sistema/pacientes/${p.id}`} className={btnSec}>
          Ficha del paciente
        </Link>
      </PageHeader>

      <form action={guardarCirugia} className="space-y-5">
        <input type="hidden" name="id" value={c.id} />

        <Card title="Indicación">
          <div className="grid gap-4 sm:grid-cols-3">
            <Seleccion label="Estado" name="estado" opciones={ESTADOS_CIRUGIA} defaultValue={c.estado} />
            <Seleccion label="Ojo" name="ojo" opciones={OJOS} defaultValue={c.ojo} required />
            <Campo label="Procedimiento" name="procedimiento" defaultValue={c.procedimiento} list="procedimientos" required />
            <datalist id="procedimientos">
              {PROCEDIMIENTOS.map((x) => (
                <option key={x} value={x} />
              ))}
            </datalist>
            <Area label="Indicación quirúrgica" name="indicacion" defaultValue={c.indicacion} className="sm:col-span-3" rows={2} />
          </div>
        </Card>

        <Card title="Preoperatorio · biometría y lente intraocular">
          <div className="grid gap-4 sm:grid-cols-5">
            <Campo label="Longitud axial (mm)" name="bio_longitud_axial" type="number" step="0.01" defaultValue={b.longitud_axial} />
            <Campo label="K1 (D)" name="bio_k1" type="number" step="0.01" defaultValue={b.k1} />
            <Campo label="K2 (D)" name="bio_k2" type="number" step="0.01" defaultValue={b.k2} />
            <Campo label="Prof. cámara ant. (mm)" name="bio_cac" type="number" step="0.01" defaultValue={b.cac} />
            <Campo label="Equipo de biometría" name="bio_equipo" defaultValue={b.equipo} placeholder="IOLMaster 700…" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-5">
            <Campo label="Modelo de LIO" name="lio_modelo" defaultValue={c.lio_modelo} className="sm:col-span-2" />
            <Campo label="Poder (D)" name="lio_poder" type="number" step="0.5" defaultValue={c.lio_poder} />
            <Campo label="Constante" name="lio_constante" defaultValue={c.lio_constante} placeholder="A: 119.0" />
            <Campo label="Fórmula" name="lio_formula" defaultValue={c.lio_formula} list="formulas" />
            <datalist id="formulas">
              {LIO_FORMULAS.map((x) => (
                <option key={x} value={x} />
              ))}
            </datalist>
            <Campo label="Refracción objetivo (D)" name="lio_refraccion_objetivo" type="number" step="0.25" defaultValue={c.lio_refraccion_objetivo} />
            <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-700 sm:col-span-2">
              <input type="checkbox" name="consentimiento_firmado" defaultChecked={c.consentimiento_firmado} className="size-4" />
              Consentimiento informado firmado
            </label>
          </div>
        </Card>

        <Card title="Cirugía">
          <div className="grid gap-4 sm:grid-cols-3">
            <Campo label="Fecha de cirugía" name="fecha_cirugia" type="date" defaultValue={c.fecha_cirugia} />
            <Campo label="Lugar / clínica" name="lugar" defaultValue={c.lugar} />
            <Campo label="Anestesia" name="anestesia" defaultValue={c.anestesia} list="anestesias" />
            <datalist id="anestesias">
              {ANESTESIAS.map((x) => (
                <option key={x} value={x} />
              ))}
            </datalist>
            <Area label="Nota operatoria" name="nota_operatoria" defaultValue={c.nota_operatoria} rows={6} className="sm:col-span-3" />
            <Area label="Complicaciones" name="complicaciones" defaultValue={c.complicaciones} rows={2} className="sm:col-span-3" />
            <Area label="Observaciones" name="observaciones" defaultValue={c.observaciones} rows={2} className="sm:col-span-3" />
          </div>
        </Card>

        <button className={btn}>Guardar cambios</button>
      </form>

      <Card title="Controles postoperatorios" className="mt-8">
        {!controles || controles.length === 0 ? (
          <Vacio>Aún no hay controles registrados.</Vacio>
        ) : (
          <ul className="mb-6 divide-y divide-slate-100">
            {controles.map((k) => {
              const dia = diasEntre(c.fecha_cirugia, k.fecha);
              return (
                <li key={k.id} className="space-y-1 py-3 text-sm">
                  <div className="flex flex-wrap gap-x-4 font-medium text-slate-800">
                    <span>{fecha(k.fecha)}</span>
                    {dia !== null && <span className="text-sky-800">Día {dia} postop</span>}
                    <span className="text-slate-500">AV: {k.av ?? "—"}</span>
                    <span className="text-slate-500">PIO: {k.pio ?? "—"}</span>
                  </div>
                  {k.hallazgos && <p className="whitespace-pre-wrap text-slate-700">{k.hallazgos}</p>}
                  {k.indicaciones && <p className="whitespace-pre-wrap text-slate-500">Indicaciones: {k.indicaciones}</p>}
                  {k.proximo_control && <p className="text-slate-500">Próximo control: {fecha(k.proximo_control)}</p>}
                </li>
              );
            })}
          </ul>
        )}

        <form action={agregarControl} className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <input type="hidden" name="cirugia_id" value={c.id} />
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Registrar control</h3>
          <div className="grid gap-3 sm:grid-cols-4">
            <Campo label="Fecha" name="fecha" type="date" defaultValue={hoyISO()} />
            <Campo label="Agudeza visual" name="av" />
            <Campo label="PIO (mmHg)" name="pio" type="number" step="0.5" />
            <Campo label="Próximo control" name="proximo_control" type="date" />
            <Area label="Hallazgos" name="hallazgos" rows={2} className="sm:col-span-2" />
            <Area label="Indicaciones" name="indicaciones" rows={2} className="sm:col-span-2" />
          </div>
          <button className={`${btn} mt-3`}>Agregar control</button>
        </form>
      </Card>
    </>
  );
}
