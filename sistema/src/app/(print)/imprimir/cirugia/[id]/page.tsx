import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireDoctora } from "@/lib/auth";
import { edad, fecha, nombreCompleto } from "@/lib/format";
import Membrete, { Firma, PieHoja } from "@/components/Membrete";
import PrintButton from "@/components/PrintButton";

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{titulo}</h3>
      <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-900">{children}</div>
    </section>
  );
}

export default async function ImprimirCirugia({ params }: { params: Promise<{ id: string }> }) {
  await requireDoctora();
  const { id } = await params;
  const supabase = await createClient();
  const { data: c } = await supabase.from("cirugias").select("*, pacientes(nombres,apellidos,cedula,fecha_nacimiento)").eq("id", id).maybeSingle();
  if (!c) notFound();
  const p = c.pacientes;
  const lio = [c.lio_modelo, c.lio_poder !== null ? `${c.lio_poder} D` : null, c.lio_constante, c.lio_formula].filter(Boolean).join(" · ");

  return (
    <>
      <div className="no-print mx-auto mb-4 flex max-w-[800px] items-center gap-2 px-4">
        <Link href={`/cirugias/${id}`} className="text-sm text-slate-600 underline">
          ← Volver
        </Link>
        <span className="flex-1" />
        <PrintButton />
      </div>

      <article className="hoja mx-auto max-w-[800px] bg-white p-10 shadow">
        <Membrete />
        <h2 className="mb-4 text-center text-base font-semibold uppercase tracking-wide text-slate-800">Informe quirúrgico</h2>

        <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-1 rounded border border-slate-300 p-3 text-sm">
          <p><span className="font-medium">Paciente:</span> {nombreCompleto(p)}</p>
          <p><span className="font-medium">Fecha de cirugía:</span> {fecha(c.fecha_cirugia)}</p>
          <p><span className="font-medium">C.I.:</span> {p.cedula ?? "—"}</p>
          <p><span className="font-medium">Edad:</span> {edad(p.fecha_nacimiento)}</p>
          <p><span className="font-medium">Procedimiento:</span> {c.procedimiento}</p>
          <p><span className="font-medium">Ojo:</span> {c.ojo === "OD" ? "Derecho (OD)" : "Izquierdo (OI)"}</p>
          {c.lugar && <p><span className="font-medium">Lugar:</span> {c.lugar}</p>}
          {c.anestesia && <p><span className="font-medium">Anestesia:</span> {c.anestesia}</p>}
        </div>

        {c.indicacion && <Bloque titulo="Indicación">{c.indicacion}</Bloque>}
        {lio && <Bloque titulo="Lente intraocular">{lio}</Bloque>}
        {c.nota_operatoria && <Bloque titulo="Descripción de la técnica">{c.nota_operatoria}</Bloque>}
        <Bloque titulo="Complicaciones">{c.complicaciones ?? "Sin complicaciones."}</Bloque>
        {c.observaciones && <Bloque titulo="Observaciones">{c.observaciones}</Bloque>}

        <Firma />
        <PieHoja />
      </article>
    </>
  );
}
