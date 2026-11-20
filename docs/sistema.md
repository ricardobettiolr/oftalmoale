# Oftalmoale · Sistema de gestión del consultorio

Parte privada de la **misma app Next.js** del sitio público: vive en `oftalmoale.com/sistema`, con login.
Next.js 16 + Supabase (Postgres, Auth, RLS). Todo en español.

## Qué incluye (v1)

| Módulo | Qué hace |
|---|---|
| **Pacientes** | Ficha con datos, antecedentes oculares/sistémicos, alergias; búsqueda por nombre, cédula o teléfono |
| **Consultas** | Formulario con columnas OD / OI: AV, refracción, PIO, biomicroscopía, fondo de ojo, diagnóstico, plan |
| **Informes** | Informe médico y récipe/indicaciones con membrete, listos para imprimir o guardar como PDF |
| **Agenda** | Cola de solicitudes (web, teléfono, correo), confirmación con fecha y hora, estados |
| **Cirugías** | Indicada → preoperatorio → programada → operada → postoperatorio; biometría, LIO, nota operatoria, controles post-op, informe quirúrgico imprimible |
| **Equipo** | Roles `doctora` y `secretaria`. La secretaria solo ve pacientes y agenda, no datos clínicos |

Las solicitudes del formulario de la web llegan solas a la **Agenda** (ver más abajo).
Fuera de esta versión: imágenes y estudios (OCT, topografía), pagos, modo sin conexión.

## Un solo proyecto, dos zonas

El sitio y el sistema son **un solo proyecto Next.js, un solo despliegue en Vercel y un solo dominio**:

- `/` y `/cirugias` siguen siendo el sitio público, sin cambios.
- `/sistema/*` es el sistema. Todo lo que cuelga de `/sistema` (salvo `/sistema/login`) exige sesión; lo impone `src/proxy.ts` y, además, cada consulta pasa por las políticas de Supabase.
- Cada zona es un *route group* con su propio layout raíz y su propio CSS (`(site)` y `(sistema)`), así los estilos y las fuentes del sitio no se mezclan con los del sistema.
- Sin las variables de Supabase el sitio funciona igual y `/sistema` responde «no configurado».

Compromiso a tener en cuenta: un error de compilación en el sistema también bloquearía un despliegue del sitio. Vercel mantiene en línea la última versión que compiló bien, así que el sitio no se cae; simplemente el cambio no sale hasta corregirlo.

## Puesta en marcha

### 1. Base de datos (Supabase)
1. Crea un proyecto en [supabase.com](https://supabase.com).
2. **SQL Editor** → pega y ejecuta `supabase/migrations/0001_init.sql`.
3. **Authentication → Users → Add user**: crea **primero la cuenta de la doctora**. El primer usuario creado queda como `doctora` y activo. Los siguientes quedan como `secretaria` *pendiente*; la doctora los activa en **Equipo**.
4. **Authentication → Sign In / Providers → Email**: desactiva *Allow new users to sign up*.

### 2. Ejecutar en local
```bash
cp .env.example .env.local      # completa las dos variables de Supabase
npm install
npm run dev                     # http://localhost:3000  ·  sistema: http://localhost:3000/sistema
```

### 3. Publicar (Vercel)
Es el mismo proyecto de Vercel del sitio (Root Directory = `.`). Solo agrega dos variables de entorno y vuelve a desplegar:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase → Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — la clave anon / publishable

El sistema queda en `https://www.oftalmoale.com/sistema`.

### 4. Personalizar el membrete
Edita `src/sistema/lib/clinic.ts`: **completa los números de registro profesional (MPPS / CMM u otros)** y revisa dirección y teléfono.

## Cómo llegan las solicitudes de cita de la web

El formulario del sitio (`src/app/api/appointments/route.ts`) valida los datos, **guarda la solicitud en la tabla `citas`** de este mismo Supabase y además envía el correo de siempre. Si una de las dos vías falla, la otra sigue funcionando. Usa las mismas dos variables `NEXT_PUBLIC_SUPABASE_*`; sin ellas solo envía el correo.

La clave anon solo puede **crear** solicitudes: lo impone la política `citas_solicitud_publica` del SQL.

## Seguridad y datos de pacientes

Son datos de salud: trátalos con cuidado.

- Las tablas tienen **Row Level Security**: sin sesión activa nadie lee nada. El único acceso anónimo es *crear* una solicitud de cita.
- La secretaria no puede leer consultas ni cirugías (lo impone la base de datos, no solo la interfaz).
- Nunca pongas la clave `service_role` en el código ni en variables `NEXT_PUBLIC_*`.
- Contraseñas fuertes y únicas. Haz respaldos periódicos de la base de datos.
- La creación de solicitudes no tiene límite de frecuencia. Si llega spam, agrega un límite (Vercel Firewall o Cloudflare Turnstile) en el formulario del sitio.
- Antes de usarlo con pacientes reales, haz una prueba completa con datos ficticios.

## Estructura

```
supabase/migrations/0001_init.sql        esquema, roles y políticas de seguridad
src/proxy.ts                             exige sesión en /sistema/* (excepto /sistema/login)
src/app/(site)/                          sitio público (layout y CSS propios)
src/app/(sistema)/                       layout y CSS propios del sistema
src/app/(sistema)/sistema/(panel)/       pantallas con login: inicio, agenda, pacientes, consultas, cirugías, equipo
src/app/(sistema)/sistema/(imprimir)/    informe, récipe y nota operatoria para imprimir
src/app/(sistema)/sistema/login/         inicio de sesión
src/app/api/appointments/                formulario de citas del sitio (correo + agenda)
src/sistema/                             lógica y componentes del sistema (lib/, components/)
```

## Siguientes pasos posibles

1. Estudios e imágenes por paciente (Supabase Storage; visor DICOM más adelante).
2. Exportar informes a Word (.docx).
3. Funcionamiento sin conexión (PWA) si el internet del consultorio es inestable.
4. Recordatorios de cita por WhatsApp.
5. Plantillas de informe por patología (catarata, queratocono, pterigión…).
