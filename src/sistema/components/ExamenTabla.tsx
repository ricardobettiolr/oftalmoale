import { BIO_CAMPOS, FONDO_CAMPOS } from "@/sistema/lib/catalogos";
import type { Row } from "@/sistema/lib/format";

type Fila = [string, unknown, unknown, boolean?];

const lleno = (v: unknown) => v !== null && v !== undefined && String(v).trim() !== "";
const mostrar = (v: unknown) => (lleno(v) ? String(v) : "—");

/** Tabla OD / OI del examen oftalmológico; solo muestra las filas con datos. */
export default function ExamenTabla({ c }: { c: Row }) {
  const filas: Fila[] = [
    ["Agudeza visual sin corrección", c.av_sc_od, c.av_sc_oi],
    ["Agudeza visual con corrección", c.av_cc_od, c.av_cc_oi],
    ["Refracción", c.refraccion_od, c.refraccion_oi],
    [`Presión intraocular (mmHg)${c.pio_metodo ? ` · ${c.pio_metodo}` : ""}`, c.pio_od, c.pio_oi],
    ...BIO_CAMPOS.map((x): Fila => [x.label, c.biomicroscopia_od?.[x.key], c.biomicroscopia_oi?.[x.key], true]),
    ...FONDO_CAMPOS.map((x): Fila => [x.label, c.fondo_od?.[x.key], c.fondo_oi?.[x.key], true]),
  ];
  const visibles = filas.filter(([, a, b]) => lleno(a) || lleno(b));
  if (visibles.length === 0) return <p className="text-sm text-slate-400">Sin hallazgos registrados.</p>;

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-slate-100 text-left text-xs text-slate-600 print:bg-slate-100">
          <th className="w-1/3 border border-slate-300 px-2 py-1 font-semibold">Examen</th>
          <th className="border border-slate-300 px-2 py-1 font-semibold">OD</th>
          <th className="border border-slate-300 px-2 py-1 font-semibold">OI</th>
        </tr>
      </thead>
      <tbody>
        {visibles.map(([label, od, oi]) => (
          <tr key={label} className="align-top">
            <td className="border border-slate-300 px-2 py-1 font-medium text-slate-700">{label}</td>
            <td className="border border-slate-300 px-2 py-1 whitespace-pre-wrap">{mostrar(od)}</td>
            <td className="border border-slate-300 px-2 py-1 whitespace-pre-wrap">{mostrar(oi)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
