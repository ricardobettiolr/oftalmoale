import Link from "next/link";
import { Area, Campo, Card, Seleccion, btn, btnSec } from "@/sistema/components/ui";
import type { Row } from "@/sistema/lib/format";
import { guardarPaciente } from "./actions";

const SEXOS = [
  { v: "F", l: "Femenino" },
  { v: "M", l: "Masculino" },
  { v: "otro", l: "Otro" },
];

export default function PacienteForm({ initial, citaId, cancelar }: { initial?: Row; citaId?: string; cancelar: string }) {
  const p = initial ?? {};
  return (
    <form action={guardarPaciente} className="space-y-5">
      {p.id && <input type="hidden" name="id" value={p.id} />}
      {citaId && <input type="hidden" name="cita_id" value={citaId} />}

      <Card title="Datos personales">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Nombres" name="nombres" defaultValue={p.nombres} required />
          <Campo label="Apellidos" name="apellidos" defaultValue={p.apellidos} required />
          <Campo label="Cédula" name="cedula" defaultValue={p.cedula} placeholder="V-12345678" />
          <Campo label="Fecha de nacimiento" name="fecha_nacimiento" type="date" defaultValue={p.fecha_nacimiento} />
          <Seleccion label="Sexo" name="sexo" opciones={SEXOS} defaultValue={p.sexo} vacio="—" />
          <Campo label="Ocupación" name="ocupacion" defaultValue={p.ocupacion} />
          <Campo label="Teléfono" name="telefono" defaultValue={p.telefono} />
          <Campo label="Correo" name="email" type="email" defaultValue={p.email} />
          <Campo label="Dirección" name="direccion" defaultValue={p.direccion} className="sm:col-span-2" />
        </div>
      </Card>

      <Card title="Antecedentes">
        <div className="grid gap-4 sm:grid-cols-2">
          <Area label="Antecedentes oculares" name="antecedentes_oculares" defaultValue={p.antecedentes_oculares} placeholder="Cirugías previas, glaucoma, uso de lentes…" />
          <Area label="Antecedentes sistémicos" name="antecedentes_sistemicos" defaultValue={p.antecedentes_sistemicos} placeholder="Diabetes, HTA…" />
          <Area label="Antecedentes familiares" name="antecedentes_familiares" defaultValue={p.antecedentes_familiares} />
          <Area label="Alergias" name="alergias" defaultValue={p.alergias} />
          <Area label="Medicamentos actuales" name="medicamentos" defaultValue={p.medicamentos} />
          <Area label="Notas" name="notas" defaultValue={p.notas} />
        </div>
      </Card>

      <div className="flex gap-2">
        <button className={btn}>Guardar paciente</button>
        <Link href={cancelar} className={btnSec}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
