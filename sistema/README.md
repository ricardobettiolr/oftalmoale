# Oftalmoale · Sistema de gestión del consultorio

App web **independiente** del sitio público, dentro de este mismo repositorio (carpeta `sistema/`).
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

## Por qué es una app aparte

El sitio público y el sistema se despliegan por separado: el sitio ya usa las rutas `/` y `/cirugias`, y así un error en el sistema nunca puede tumbar la página que ven los pacientes. Comparten repositorio, no despliegue.

## Puesta en marcha

### 1. Base de datos (Supabase)
1. Crea un proyecto en [supabase.com](https://supabase.com).
2. **SQL Editor** → pega y ejecuta `supabase/migrations/0001_init.sql`.
3. **Authentication → Users → Add user**: crea **primero la cuenta de la doctora**. El primer usuario creado queda como `doctora` y activo. Los siguientes quedan como `secretaria` *pendiente*; la doctora los activa en **Equipo**.
4. **Authentication → Sign In / Providers → Email**: desactiva *Allow new users to sign up*.

### 2. Ejecutar en local
```bash
cd sistema
cp .env.example .env.local      # URL y clave de Supabase
npm install
npm run dev                     # http://localhost:3000
```

### 3. Publicar (Vercel)
Crea **un segundo proyecto** en Vercel con este mismo repositorio y **Root Directory = `sistema`**. Variables: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Dominio sugerido: `sistema.oftalmoale.com`.

### 4. Personalizar el membrete
Edita `src/lib/clinic.ts`: **completa los números de registro profesional (MPPS / CMM u otros)** y revisa dirección y teléfono.

## Cómo llegan las solicitudes de cita de la web

El sitio público (`../src/app/api/appointments/route.ts`) valida el formulario, **guarda la solicitud en la tabla `citas`** de este mismo Supabase y además envía el correo de siempre. Si una de las dos vías falla, la otra sigue funcionando.

En el **proyecto Vercel del sitio** (no el del sistema) agrega:
- `SUPABASE_URL` — la misma URL del proyecto
- `SUPABASE_ANON_KEY` — la clave anon/publishable

Sin esas variables el sitio funciona como antes (solo correo). La clave anon solo puede **crear** solicitudes: lo impone la política `citas_solicitud_publica` del SQL.

## Seguridad y datos de pacientes

Son datos de salud: trátalos con cuidado.

- Las tablas tienen **Row Level Security**: sin sesión activa nadie lee nada. El único acceso anónimo es *crear* una solicitud de cita.
- La secretaria no puede leer consultas ni cirugías (lo impone la base de datos, no solo la interfaz).
- Nunca pongas la clave `service_role` en el código ni en variables `NEXT_PUBLIC_*`.
- Contraseñas fuertes y únicas; activa respaldos periódicos y confirma qué incluye tu plan de Supabase.
- La creación de solicitudes no tiene límite de frecuencia. Si llega spam, agrega un límite (Vercel Firewall o Cloudflare Turnstile) en el formulario del sitio.
- Antes de usarlo con pacientes reales, haz una prueba completa con datos ficticios.

## Estructura

```
supabase/migrations/0001_init.sql   esquema, roles y políticas de seguridad
src/proxy.ts                        protege todas las rutas salvo /login
src/lib/                            clínica, formatos es-VE, catálogos, clientes Supabase
src/app/(app)/                      pantallas con login: inicio, agenda, pacientes, consultas, cirugías, equipo
src/app/(print)/imprimir/           informe, récipe y nota operatoria para imprimir
```

## Siguientes pasos posibles

1. Estudios e imágenes por paciente (Supabase Storage; visor DICOM más adelante).
2. Exportar informes a Word (.docx).
3. Funcionamiento sin conexión (PWA) si el internet del consultorio es inestable.
4. Recordatorios de cita por WhatsApp.
5. Plantillas de informe por patología (catarata, queratocono, pterigión…).
