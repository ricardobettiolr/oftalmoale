# Oftalmoale

Sitio web de la clínica oftalmológica **Oftalmoale** — Dra. María Alejandra Rojas.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui primitives.

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev -- --hostname 127.0.0.1 --port 43127
```

Abra [http://127.0.0.1:43127](http://127.0.0.1:43127).

Sin credenciales SMTP, el formulario de citas funciona en modo mock (registra la solicitud en la consola del servidor).

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `SMTP_HOST` | Producción | Servidor SMTP (Namecheap: `mail.privateemail.com`) |
| `SMTP_PORT` | Producción | `465` (SSL) o `587` (STARTTLS) |
| `EMAIL_USER` | Producción | Remitente / usuario SMTP (`agenda@oftalmoale.com`) |
| `EMAIL_PASS` | Producción | Contraseña del buzón |
| `APPOINTMENT_TO_EMAIL` | Recomendada | Destino de las citas. Por defecto: `agenda@oftalmoale.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Opcional | URL del proyecto Supabase. Si falta, el formulario solo envía el correo y `/sistema` queda desactivado |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Opcional | Clave anon/publishable (pública por diseño; los datos los protege el RLS de Supabase) |

> Migración: las variables antiguas `GMAIL_USER` / `GMAIL_APP_PASSWORD` ya no se usan. Configure SMTP de Namecheap Private Email en Vercel.

Ejemplo `.env.local` / Vercel:

```env
SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
EMAIL_USER=agenda@oftalmoale.com
EMAIL_PASS=
APPOINTMENT_TO_EMAIL=agenda@oftalmoale.com
```

## Desplegar en Vercel

1. Import el repositorio `ricardobettiolr/oftalmoale`.
2. Framework: **Next.js**. Root Directory: `.`
3. Environment Variables: las cinco primeras de la tabla arriba (y, si usa el sistema, las dos de Supabase).
4. Redeploy after saving env vars.

## Sistema del consultorio

En `/sistema` (con login) vive el sistema de gestión: pacientes, consultas, cirugías, agenda e informes. Es parte de esta misma app y del mismo despliegue en Vercel; el sitio público no cambia. Cuando las dos variables de Supabase están definidas, cada solicitud del formulario de citas también queda registrada en la agenda del sistema. Guía de puesta en marcha: [`docs/sistema.md`](docs/sistema.md).

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — servir build
- `npm run lint` — ESLint

## Contenido

Fotos del consultorio en `public/assets/clinic/`. Logo en `public/assets/logo-v4.png` / `logo-on-dark.png`.
