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

Sin `GMAIL_USER` / `GMAIL_APP_PASSWORD`, el formulario de citas funciona en modo mock (registra la solicitud en la consola del servidor).

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `APPOINTMENT_TO_EMAIL` | Recomendada | Destino de las citas. Por defecto: `oftalmoale@gmail.com` |
| `GMAIL_USER` | Producción | Cuenta Gmail que envía (p. ej. `oftalmoale@gmail.com`) |
| `GMAIL_APP_PASSWORD` | Producción | Contraseña de aplicación de Google (no la contraseña normal) |

Ejemplo `.env.local`:

```env
APPOINTMENT_TO_EMAIL=oftalmoale@gmail.com
GMAIL_USER=oftalmoale@gmail.com
GMAIL_APP_PASSWORD=
```

### Configurar Gmail (español)

1. En la [cuenta de Google](https://myaccount.google.com/) → **Seguridad** → active **Verificación en 2 pasos**.
2. En **Contraseñas de aplicaciones** → cree una para **Correo** / “Mail”.
3. En Vercel, configure `GMAIL_USER`, `GMAIL_APP_PASSWORD` y `APPOINTMENT_TO_EMAIL`.
4. Vuelva a desplegar el proyecto.

## Desplegar en Vercel

1. En [vercel.com/new](https://vercel.com/new), **Import** el repositorio `ricardobettiolr/oftalmoale`.
2. Framework preset: **Next.js** (autodetectado). Root Directory: `.` (raíz del repo).
3. En **Environment Variables**, agregue:
   - `APPOINTMENT_TO_EMAIL` = `oftalmoale@gmail.com`
   - `GMAIL_USER` = `oftalmoale@gmail.com`
   - `GMAIL_APP_PASSWORD` = la contraseña de aplicación de Google
4. Deploy. Cada push a `main` vuelve a desplegar.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — servir build
- `npm run lint` — ESLint

## Contenido

Fotos del consultorio en `public/assets/clinic/`. Logo oficial en `public/assets/oftalmoale-logo.png`.
