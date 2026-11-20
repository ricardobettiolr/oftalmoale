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
| `SUPABASE_URL` | Opcional | URL del proyecto Supabase del sistema. Si falta, el formulario solo envía el correo |
| `SUPABASE_ANON_KEY` | Opcional | Clave anon/publishable; solo puede crear solicitudes en la agenda |

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

La carpeta [`sistema/`](sistema/README.md) contiene una app aparte (pacientes, consultas, cirugías, agenda, informes) con su propio despliegue en Vercel (Root Directory = `sistema`). Cuando `SUPABASE_URL` y `SUPABASE_ANON_KEY` están definidas, cada solicitud del formulario de citas también queda registrada en la agenda del sistema. El build de este sitio no depende de esa carpeta.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — servir build
- `npm run lint` — ESLint

## Contenido

Fotos del consultorio en `public/assets/clinic/`. Logo en `public/assets/logo-v4.png` / `logo-on-dark.png`.
