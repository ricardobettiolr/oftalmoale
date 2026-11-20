import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPerfil } from "@/lib/auth";
import { CLINICA } from "@/lib/clinic";
import { diaDe, diaSemana, fecha, hoyISO, hora, limitesDia, nombreCompleto } from "@/lib/format";
import { ORIGENES_CITA, etiqueta } from "@/lib/catalogos";
import { Badge, Card, PageHeader, Vacio, btn, btnMini, btnSec, input } from "@/components/ui";
import { cambiarEstadoCita, confirmarCita } from "./actions";

const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

function BotonEstado({ id, estado, children }: { id: string; estado: string; children: React.ReactNode }) {
  return (
    <form action={cambiarEstadoCita}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="estado" value={estado} />
      <button className={btnMini}>{children}</button>
    </form>
  );
}

export default async function Agenda() {
  const supabase = await createClient();
  const perfil = await getPerfil();
  const doctora = perfil?.rol === "doctora";
  const { desde } = limitesDia(hoyISO());

  const [solicitudes, proximas] = await Promise.all([
    supabase.from("citas").select("*, pacientes(id,nombres,apellidos)").eq("estado", "solicitada").order("created_at"),
    supabase
      .from("citas")
      .select("*, pacientes(id,nombres,apellidos)")
      .eq("estado", "confirmada")
      .gte("fecha_hora", desde)
      .order("fecha_hora")
      .limit(150),
  ]);

  // Agrupar las confirmadas por día
  const porDia = new Map<string, NonNullable<typeof proximas.data>>();
  for (const c of proximas.data ?? []) {
    const d = diaDe(c.fecha_hora);
    porDia.set(d, [...(porDia.get(d) ?? []), c]);
  }

  return (
    <>
      <PageHeader title="Agenda" subtitle={`Días de consulta: ${CLINICA.diasConsulta.map((d) => DIAS[d]).join(", ")}`}>
        <Link href="/agenda/nueva" className={btn}>
          + Nueva cita
        </Link>
      </PageHeader>

      <Card title={`Solicitudes por confirmar (${solicitudes.data?.length ?? 0})`} className="mb-5">
        {!solicitudes.data || solicitudes.data.length === 0 ? (
          <Vacio>No hay solicitudes pendientes.</Vacio>
        ) : (
          <ul className="divide-y divide-slate-100">
            {solicitudes.data.map((s) => (
              <li key={s.id} className="space-y-2 py-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-medium text-slate-900">{s.pacientes ? nombreCompleto(s.pacientes) : (s.solicitante_nombre ?? "Sin nombre")}</span>
                  <span className="text-sm text-slate-500">{[s.solicitante_telefono, s.solicitante_email].filter(Boolean).join(" · ")}</span>
                  <Badge valor="solicitada" texto={etiqueta(ORIGENES_CITA, s.origen)} />
                </div>
                <p className="text-sm text-slate-600">
                  {s.motivo ?? "Sin motivo indicado"}
                  {s.fecha_preferida && <span className="text-slate-400"> · prefiere el {fecha(s.fecha_preferida)}</span>}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <form action={confirmarCita} className="flex flex-wrap items-center gap-2">
                    <input type="hidden" name="id" value={s.id} />
                    <input className={`${input} !w-auto`} type="datetime-local" name="fecha_hora" required aria-label="Fecha y hora de la cita" />
                    <button className={btn}>Confirmar</button>
                  </form>
                  {!s.paciente_id && (
                    <Link href={`/pacientes/nuevo?cita=${s.id}`} className={btnSec}>
                      Crear ficha
                    </Link>
                  )}
                  <BotonEstado id={s.id} estado="cancelada">
                    Descartar
                  </BotonEstado>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Próximas citas">
        {porDia.size === 0 ? (
          <Vacio>No hay citas confirmadas próximas.</Vacio>
        ) : (
          <div className="space-y-5">
            {[...porDia.entries()].map(([dia, lista]) => (
              <div key={dia}>
                <h3 className="mb-1 text-sm font-semibold capitalize text-slate-700">
                  {diaSemana(dia)} {fecha(dia)}
                </h3>
                <ul className="divide-y divide-slate-100 rounded-md border border-slate-200">
                  {lista.map((c) => (
                    <li key={c.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2.5">
                      <span className="w-14 text-sm font-semibold text-sky-800">{hora(c.fecha_hora)}</span>
                      <span className="min-w-40 flex-1 text-sm">
                        {c.pacientes ? (
                          <Link href={`/pacientes/${c.pacientes.id}`} className="font-medium text-slate-900 hover:underline">
                            {nombreCompleto(c.pacientes)}
                          </Link>
                        ) : (
                          <span className="font-medium text-slate-900">{c.solicitante_nombre ?? "Sin nombre"}</span>
                        )}
                        <span className="text-slate-500"> · {c.motivo ?? "sin motivo"}</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {doctora && c.paciente_id && (
                          <Link href={`/pacientes/${c.paciente_id}/consulta/nueva?cita=${c.id}`} className={btnMini}>
                            Atender
                          </Link>
                        )}
                        {!c.paciente_id && (
                          <Link href={`/pacientes/nuevo?cita=${c.id}`} className={btnMini}>
                            Crear ficha
                          </Link>
                        )}
                        <BotonEstado id={c.id} estado="no_asistio">
                          No asistió
                        </BotonEstado>
                        <BotonEstado id={c.id} estado="cancelada">
                          Cancelar
                        </BotonEstado>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
