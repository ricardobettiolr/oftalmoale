-- Oftalmoale · esquema inicial
-- Ejecutar en Supabase → SQL Editor (o con `supabase db push`).

-- ───────────────────────── Perfiles y roles ─────────────────────────
-- El primer usuario que se crea queda como 'doctora' y activo.
-- Cualquier otro usuario queda como 'secretaria' INACTIVA hasta que la
-- doctora lo active desde la pantalla "Equipo".

create type rol_usuario as enum ('doctora', 'secretaria');

create table perfiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  nombre     text not null,
  rol        rol_usuario not null default 'secretaria',
  activo     boolean not null default false,
  created_at timestamptz not null default now()
);

create function es_activo() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from perfiles where id = auth.uid() and activo)
$$;

create function es_doctora() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from perfiles where id = auth.uid() and activo and rol = 'doctora')
$$;

create function crear_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
declare primero boolean;
begin
  select not exists (select 1 from perfiles) into primero;
  insert into perfiles (id, nombre, rol, activo)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nombre', split_part(new.email, '@', 1)),
    case when primero then 'doctora'::rol_usuario else 'secretaria'::rol_usuario end,
    primero
  );
  return new;
end $$;

create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function crear_perfil();

-- ───────────────────────── Pacientes ─────────────────────────
create table pacientes (
  id                     uuid primary key default gen_random_uuid(),
  cedula                 text unique,
  nombres                text not null,
  apellidos              text not null,
  fecha_nacimiento       date,
  sexo                   text check (sexo in ('F', 'M', 'otro')),
  telefono               text,
  email                  text,
  direccion              text,
  ocupacion              text,
  antecedentes_oculares  text,
  antecedentes_sistemicos text,
  antecedentes_familiares text,
  alergias               text,
  medicamentos           text,
  notas                  text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  created_by             uuid default auth.uid()
);
create index pacientes_apellidos_idx on pacientes (apellidos, nombres);

create function tocar_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger pacientes_updated before update on pacientes
  for each row execute function tocar_updated_at();

-- ───────────────────────── Citas ─────────────────────────
-- Una solicitud de la web entra como estado 'solicitada', sin paciente ni hora.
create table citas (
  id                  uuid primary key default gen_random_uuid(),
  paciente_id         uuid references pacientes (id) on delete set null,
  solicitante_nombre  text,
  solicitante_telefono text,
  solicitante_email   text,
  fecha_preferida     date,
  fecha_hora          timestamptz,
  motivo              text,
  estado              text not null default 'solicitada'
                      check (estado in ('solicitada', 'confirmada', 'atendida', 'cancelada', 'no_asistio')),
  origen              text not null default 'presencial'
                      check (origen in ('web', 'telefono', 'email', 'presencial')),
  notas               text,
  created_at          timestamptz not null default now()
);
create index citas_fecha_idx on citas (fecha_hora);
create index citas_estado_idx on citas (estado);

-- ───────────────────────── Consultas ─────────────────────────
create table consultas (
  id                  uuid primary key default gen_random_uuid(),
  paciente_id         uuid not null references pacientes (id) on delete cascade,
  cita_id             uuid references citas (id) on delete set null,
  fecha               date not null default current_date,
  tipo                text not null default 'general'
                      check (tipo in ('general', 'segmento_anterior', 'cornea', 'preoperatoria', 'postoperatoria', 'control')),
  motivo              text,
  enfermedad_actual   text,
  av_sc_od            text,  -- agudeza visual sin corrección
  av_sc_oi            text,
  av_cc_od            text,  -- agudeza visual con corrección
  av_cc_oi            text,
  refraccion_od       text,
  refraccion_oi       text,
  pio_od              numeric(4, 1),
  pio_oi              numeric(4, 1),
  pio_metodo          text,
  biomicroscopia_od   jsonb not null default '{}'::jsonb,
  biomicroscopia_oi   jsonb not null default '{}'::jsonb,
  fondo_od            jsonb not null default '{}'::jsonb,
  fondo_oi            jsonb not null default '{}'::jsonb,
  diagnostico         text,
  plan                text,
  indicaciones        text,
  recipe              text,
  proximo_control     date,
  created_at          timestamptz not null default now(),
  created_by          uuid default auth.uid()
);
create index consultas_paciente_idx on consultas (paciente_id, fecha desc);

-- ───────────────────────── Cirugías ─────────────────────────
create table cirugias (
  id                   uuid primary key default gen_random_uuid(),
  paciente_id          uuid not null references pacientes (id) on delete cascade,
  consulta_id          uuid references consultas (id) on delete set null,
  ojo                  text not null check (ojo in ('OD', 'OI')),
  procedimiento        text not null,
  estado               text not null default 'indicada'
                       check (estado in ('indicada', 'preoperatorio', 'programada', 'operada', 'postoperatorio', 'cerrada', 'cancelada')),
  indicacion           text,
  -- preoperatorio
  biometria            jsonb not null default '{}'::jsonb,  -- longitud_axial, k1, k2, cac, equipo
  lio_modelo           text,
  lio_poder            numeric(4, 1),
  lio_constante        text,
  lio_formula          text,
  lio_refraccion_objetivo numeric(4, 2),
  consentimiento_firmado boolean not null default false,
  -- programación y acto quirúrgico
  fecha_cirugia        date,
  lugar                text,
  anestesia            text,
  nota_operatoria      text,
  complicaciones       text,
  observaciones        text,
  created_at           timestamptz not null default now(),
  created_by           uuid default auth.uid()
);
create index cirugias_estado_idx on cirugias (estado, fecha_cirugia);
create index cirugias_paciente_idx on cirugias (paciente_id);

create table controles_postop (
  id            uuid primary key default gen_random_uuid(),
  cirugia_id    uuid not null references cirugias (id) on delete cascade,
  fecha         date not null default current_date,
  av            text,
  pio           numeric(4, 1),
  hallazgos     text,
  indicaciones  text,
  proximo_control date,
  created_at    timestamptz not null default now()
);
create index controles_cirugia_idx on controles_postop (cirugia_id, fecha);

-- ───────────────────────── Seguridad (RLS) ─────────────────────────
alter table perfiles        enable row level security;
alter table pacientes       enable row level security;
alter table citas           enable row level security;
alter table consultas       enable row level security;
alter table cirugias        enable row level security;
alter table controles_postop enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant select, insert, update, delete on pacientes, citas, consultas, cirugias, controles_postop to authenticated;
grant select, update on perfiles to authenticated;
grant insert on citas to anon;  -- solicitudes desde el formulario público

-- Perfiles: cada quien ve el suyo; la doctora ve y gestiona todos.
create policy perfiles_ver on perfiles for select to authenticated
  using (id = auth.uid() or es_doctora());
create policy perfiles_editar on perfiles for update to authenticated
  using (es_doctora()) with check (es_doctora());

-- Pacientes y citas: doctora y secretaria activas.
create policy pacientes_todo on pacientes for all to authenticated
  using (es_activo()) with check (es_activo());
create policy citas_todo on citas for all to authenticated
  using (es_activo()) with check (es_activo());

-- Formulario público: solo puede CREAR solicitudes web, nada más.
create policy citas_solicitud_publica on citas for insert to anon
  with check (
    estado = 'solicitada' and origen = 'web'
    and paciente_id is null and fecha_hora is null
    and char_length(coalesce(solicitante_nombre, '')) between 2 and 120
    and char_length(coalesce(solicitante_telefono, '')) <= 40
    and char_length(coalesce(solicitante_email, '')) <= 120
    and char_length(coalesce(motivo, '')) <= 1000
    and notas is null
  );

-- Datos clínicos: solo la doctora.
create policy consultas_doctora on consultas for all to authenticated
  using (es_doctora()) with check (es_doctora());
create policy cirugias_doctora on cirugias for all to authenticated
  using (es_doctora()) with check (es_doctora());
create policy controles_doctora on controles_postop for all to authenticated
  using (es_doctora()) with check (es_doctora());
