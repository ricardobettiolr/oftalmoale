import Link from "next/link";
import { Area, Campo, CabeceraOjos, Card, FilaOjos, Seleccion, btn, btnSec } from "@/sistema/components/ui";
import { BIO_CAMPOS, FONDO_CAMPOS, TIPOS_CONSULTA } from "@/sistema/lib/catalogos";
import { hoyISO, type Row } from "@/sistema/lib/format";
import { guardarConsulta } from "./actions";

export default function ConsultaForm({
  pacienteId,
  citaId,
  initial,
  cancelar,
}: {
  pacienteId?: string;
  citaId?: string;
  initial?: Row;
  cancelar: string;
}) {
  const c = initial ?? {};
  return (
    <form action={guardarConsulta} className="space-y-5">
      {c.id && <input type="hidden" name="id" value={c.id} />}
      {pacienteId && <input type="hidden" name="paciente_id" value={pacienteId} />}
      {citaId && <input type="hidden" name="cita_id" value={citaId} />}

      <Card title="Motivo">
        <div className="grid gap-4 sm:grid-cols-3">
          <Seleccion label="Tipo de consulta" name="tipo" opciones={TIPOS_CONSULTA} defaultValue={c.tipo ?? "general"} />
          <Campo label="Fecha" name="fecha" type="date" defaultValue={c.fecha ?? hoyISO()} />
          <Campo label="Motivo de consulta" name="motivo" defaultValue={c.motivo} />
          <Area label="Enfermedad actual" name="enfermedad_actual" defaultValue={c.enfermedad_actual} rows={3} className="sm:col-span-3" />
        </div>
      </Card>

      <Card title="Examen oftalmológico">
        <div className="space-y-2">
          <CabeceraOjos />
          <FilaOjos label="AV sin corrección" nameOd="av_sc_od" nameOi="av_sc_oi" od={c.av_sc_od} oi={c.av_sc_oi} placeholder="20/40" />
          <FilaOjos label="AV con corrección" nameOd="av_cc_od" nameOi="av_cc_oi" od={c.av_cc_od} oi={c.av_cc_oi} placeholder="20/20" />
          <FilaOjos label="Refracción" nameOd="refraccion_od" nameOi="refraccion_oi" od={c.refraccion_od} oi={c.refraccion_oi} placeholder="+1.00 -0.50 x 90" />
          <FilaOjos label="PIO (mmHg)" nameOd="pio_od" nameOi="pio_oi" od={c.pio_od} oi={c.pio_oi} type="number" step="0.5" />
          <div className="grid grid-cols-[8.5rem_1fr] items-center gap-2">
            <span className="text-xs font-medium text-slate-700">Método de PIO</span>
            <input name="pio_metodo" defaultValue={c.pio_metodo ?? ""} placeholder="Goldmann, neumotonómetro…" className="w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-sm focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600" />
          </div>
        </div>
      </Card>

      <Card title="Biomicroscopía (lámpara de hendidura)">
        <div className="space-y-2">
          <CabeceraOjos />
          {BIO_CAMPOS.map((x) => (
            <FilaOjos
              key={x.key}
              label={x.label}
              nameOd={`bio_${x.key}_od`}
              nameOi={`bio_${x.key}_oi`}
              od={c.biomicroscopia_od?.[x.key]}
              oi={c.biomicroscopia_oi?.[x.key]}
            />
          ))}
        </div>
      </Card>

      <Card title="Fondo de ojo">
        <div className="space-y-2">
          <CabeceraOjos />
          {FONDO_CAMPOS.map((x) => (
            <FilaOjos
              key={x.key}
              label={x.label}
              nameOd={`fon_${x.key}_od`}
              nameOi={`fon_${x.key}_oi`}
              od={c.fondo_od?.[x.key]}
              oi={c.fondo_oi?.[x.key]}
            />
          ))}
        </div>
      </Card>

      <Card title="Diagnóstico y plan">
        <div className="grid gap-4 sm:grid-cols-2">
          <Area label="Diagnóstico" name="diagnostico" defaultValue={c.diagnostico} className="sm:col-span-2" />
          <Area label="Plan / conducta" name="plan" defaultValue={c.plan} />
          <Area label="Indicaciones al paciente" name="indicaciones" defaultValue={c.indicaciones} />
          <Area label="Récipe (medicamentos)" name="recipe" defaultValue={c.recipe} rows={4} placeholder={"Un medicamento por línea\nEj.: Moxifloxacina 0.5% gotas — 1 gota cada 6 h por 7 días"} className="sm:col-span-2" />
          <Campo label="Próximo control" name="proximo_control" type="date" defaultValue={c.proximo_control} />
        </div>
      </Card>

      <div className="flex gap-2">
        <button className={btn}>Guardar consulta</button>
        <Link href={cancelar} className={btnSec}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
