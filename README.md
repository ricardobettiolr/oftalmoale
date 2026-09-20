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

Sin `RESEND_API_KEY`, el formulario de citas funciona en modo mock (registra la solicitud en la consola del servidor).

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `APPOINTMENT_TO_EMAIL` | Recomendada | Destino de las citas. Por defecto: `oftalmoale@gmail.com` |
| `RESEND_API_KEY` | Para producción | API key de [Resend](https://resend.com) |
| `APPOINTMENT_FROM_EMAIL` | Opcional | Remitente verificado en Resend (ej. `Oftalmoale <citas@su-dominio.com>`) |

Ejemplo `.env.local`:

```env
APPOINTMENT_TO_EMAIL=oftalmoale@gmail.com
RESEND_API_KEY=
APPOINTMENT_FROM_EMAIL=
```

## Desplegar en Vercel

1. En [vercel.com/new](https://vercel.com/new), **Import** el repositorio `ricardobettiolr/oftalmoale`.
2. Framework preset: **Next.js** (autodetectado). Root Directory: `.` (raíz del repo).
3. En **Environment Variables**, agregue:
   - `APPOINTMENT_TO_EMAIL` = `oftalmoale@gmail.com`
   - `RESEND_API_KEY` = su clave de Resend
   - `APPOINTMENT_FROM_EMAIL` = (opcional) remitente verificado
4. Deploy. Cada push a `main` vuelve a desplegar.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — servir build
- `npm run lint` — ESLint

## Contenido

Fotos del consultorio en `public/assets/clinic/`. Logo oficial en `public/assets/oftalmoale-logo.png`.
