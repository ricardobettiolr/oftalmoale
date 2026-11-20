import Link from "next/link";
import { createClient } from "@/sistema/lib/supabase/server";
import { getPerfil } from "@/sistema/lib/auth";
import { CLINICA } from "@/sistema/lib/clinic";
import { diaSemana, fecha, hoyISO, hora, limitesDia, nombreCompleto } from "@/sistema/lib/format";
import { Card, PageHeader, Vacio, btn, btnSec } from "@/sistema/components/ui";

export default async function Inicio() {
  const supabase = await createClient();
  const perfil = await getPerfil();
  const doctora = perfil?.rol === "doctora";
  const hoy = hoyISO();
  const { desde, hasta } = limitesDia(hoy);

  const [solicitudes, citasHoy, programadas, postop] = await Promise.all([
    supabase.from("citas").select("id", { count: "exact", head: true }).eq("estado", "solicitada"),
    supabase
      .from("citas")
      .select("*, pacientes(id,nombres,apellidos)")
      .eq("estado", "confirmada")
      .gte("fecha_hora", desde)
      .lte("fecha_hora", hasta)
      .order("fecha_hora"),
    doctora
      ? supabase
          .from("cirugias")
          .select("id,ojo,procedimiento,fecha_cirugia,pacientes(nombres,apellidos)")
          .eq("estado", "programada")
          .order("fecha_cirugia", { nullsFirst: false })
          .limit(6)
      : Promise.resolve({ data: null }),
    doctora
      ? supabase.from("cirugias").select("id", { count: "exact", head: true }).eq("estado", "postoperatorio")
      : Promise.resolve({ count: null }),
  ]);

  const pendientes = solicitudes.count ?? 0;

  return (
    <>
      <PageHeader title={`Hola, ${perfil?.nombre ?? CLINICA.doctora}`} subtitle={`${diaSemana(hoy)} ${fecha(hoy)}`}>
        <Link href="/sistema/pacientes/nuevo" className={btn}>
          + Nuevo paciente
        </Link>
        <Link href="/sistema/agenda/nueva" className={btnSec}>
          + Nueva cita
        </Link>
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Citas de hoy" action={<Link href="/sistema/agenda" className="text-sm text-sky-800 hover:underline">Ver agenda</Link>}>
          {!citasHoy.data || citasHoy.data.length === 0 ? (
            <Vacio>No hay citas confirmadas para hoy.</Vacio>
          ) : (
            <ul className="divide-y divide-slate-100">
              {citasHoy.data.map((c) => (
                <li key={c.id} className="flex items-baseline gap-3 py-2.5 text-sm">
                  <span className="w-20 shrink-0 whitespace-nowrap font-semibold text-sky-800">{hora(c.fecha_hora)}</span>
                  <span className="flex-1">
                    {c.pacientes ? (
                      <Link href={`/sistema/pacientes/${c.pacientes.id}`} className="font-medium text-slate-900 hover:underline">
                        {nombreCompleto(c.pacientes)}
                      </Link>
                    ) : (
                      <span className="font-medium text-slate-900">{c.solicitante_nombre ?? "Sin nombre"}</span>
                    )}
                    <span className="text-slate-600"> · {c.motivo ?? "sin motivo"}</span>
                  </span>
                  {doctora && c.paciente_id && (
                    <Link href={`/sistema/pacientes/${c.paciente_id}/consulta/nueva?cita=${c.id}`} className="text-sky-800 hover:underline">
                      Atender
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Pendientes">
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-slate-700">Solicitudes de cita por confirmar</span>
              <Link href="/sistema/agenda" className={`rounded-full px-3 py-0.5 font-semibold ${pendientes > 0 ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"}`}>
                {pendientes}
              </Link>
            </li>
            {doctora && (
              <li className="flex items-center justify-between">
                <span className="text-slate-700">Pacientes en postoperatorio</span>
                <Link href="/sistema/cirugias?estado=postoperatorio" className="rounded-full bg-teal-100 px-3 py-0.5 font-semibold text-teal-800">
                  {postop.count ?? 0}
                </Link>
              </li>
            )}
          </ul>
        </Card>

        {doctora && (
          <Card title="Próximas cirugías" action={<Link href="/sistema/cirugias" className="text-sm text-sky-800 hover:underline">Ver todas</Link>} className="lg:col-span-2">
            {!programadas.data || programadas.data.length === 0 ? (
              <Vacio>No hay cirugías programadas.</Vacio>
            ) : (
              <ul className="divide-y divide-slate-100">
                {programadas.data.map((c) => (
                  <li key={c.id}>
                    <Link href={`/sistema/cirugias/${c.id}`} className="flex items-baseline gap-4 py-2.5 text-sm hover:bg-slate-50">
                      <span className="w-24 font-semibold text-sky-800">{fecha(c.fecha_cirugia)}</span>
                      <span className="flex-1 font-medium text-slate-900">{nombreCompleto(c.pacientes)}</span>
                      <span className="text-slate-600">
                        {c.procedimiento} · {c.ojo}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </div>
    </>
  );
}
