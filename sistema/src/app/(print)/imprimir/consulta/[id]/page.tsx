import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireDoctora } from "@/lib/auth";
import { edad, fecha, nombreCompleto } from "@/lib/format";
import { TIPOS_CONSULTA, etiqueta } from "@/lib/catalogos";
import ExamenTabla from "@/components/ExamenTabla";
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

export default async function ImprimirConsulta({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tipo?: string }>;
}) {
  await requireDoctora();
  const { id } = await params;
  const { tipo } = await searchParams;
  const esRecipe = tipo === "recipe";

  const supabase = await createClient();
  const { data: c } = await supabase.from("consultas").select("*, pacientes(nombres,apellidos,cedula,fecha_nacimiento)").eq("id", id).maybeSingle();
  if (!c) notFound();
  const p = c.pacientes;

  const pestana = (activa: boolean) =>
    `rounded-md px-3 py-2 text-sm font-medium ${activa ? "bg-slate-800 text-white" : "border border-slate-300 bg-white text-slate-700"}`;

  return (
    <>
      <div className="no-print mx-auto mb-4 flex max-w-[800px] flex-wrap items-center gap-2 px-4">
        <Link href={`/imprimir/consulta/${id}`} className={pestana(!esRecipe)}>
          Informe médico
        </Link>
        <Link href={`/imprimir/consulta/${id}?tipo=recipe`} className={pestana(esRecipe)}>
          Récipe e indicaciones
        </Link>
        <span className="flex-1" />
        <Link href={`/consultas/${id}`} className="text-sm text-slate-600 underline">
          ← Volver
        </Link>
        <PrintButton />
      </div>

      <article className="hoja mx-auto max-w-[800px] bg-white p-10 shadow">
        <Membrete />

        <h2 className="mb-4 text-center text-base font-semibold uppercase tracking-wide text-slate-800">
          {esRecipe ? "Récipe e indicaciones" : "Informe médico oftalmológico"}
        </h2>

        <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-1 rounded border border-slate-300 p-3 text-sm">
          <p><span className="font-medium">Paciente:</span> {nombreCompleto(p)}</p>
          <p><span className="font-medium">Fecha:</span> {fecha(c.fecha)}</p>
          <p><span className="font-medium">C.I.:</span> {p.cedula ?? "—"}</p>
          <p><span className="font-medium">Edad:</span> {edad(p.fecha_nacimiento)}</p>
          {!esRecipe && <p className="col-span-2"><span className="font-medium">Tipo de consulta:</span> {etiqueta(TIPOS_CONSULTA, c.tipo)}</p>}
        </div>

        {esRecipe ? (
          <>
            {c.recipe ? (
              <Bloque titulo="Rp/">{c.recipe}</Bloque>
            ) : (
              <p className="mb-4 text-sm text-slate-400">No hay medicamentos registrados en esta consulta.</p>
            )}
            {c.indicaciones && <Bloque titulo="Indicaciones">{c.indicaciones}</Bloque>}
            {c.proximo_control && <Bloque titulo="Próximo control">{fecha(c.proximo_control)}</Bloque>}
          </>
        ) : (
          <>
            {c.motivo && <Bloque titulo="Motivo de consulta">{c.motivo}</Bloque>}
            {c.enfermedad_actual && <Bloque titulo="Enfermedad actual">{c.enfermedad_actual}</Bloque>}
            <section className="mb-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-600">Examen oftalmológico</h3>
              <ExamenTabla c={c} />
            </section>
            {c.diagnostico && <Bloque titulo="Diagnóstico">{c.diagnostico}</Bloque>}
            {c.plan && <Bloque titulo="Plan / conducta">{c.plan}</Bloque>}
            {c.indicaciones && <Bloque titulo="Indicaciones">{c.indicaciones}</Bloque>}
            {c.proximo_control && <Bloque titulo="Próximo control">{fecha(c.proximo_control)}</Bloque>}
          </>
        )}

        <Firma />
        <PieHoja />
      </article>
    </>
  );
}
