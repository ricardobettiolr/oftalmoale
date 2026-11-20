import { BrandLogo } from "@/components/brand-logo";
import { CLINICA } from "@/sistema/lib/clinic";
import { btn, input } from "@/sistema/components/ui";
import { iniciarSesion } from "@/sistema/lib/sesion";

const MENSAJES: Record<string, string> = {
  credenciales: "Correo o contraseña incorrectos.",
  sin_confirmar: "Esta cuenta aún no está confirmada. Confirma el correo en Supabase (Authentication → Users).",
  servicio: "No se pudo iniciar sesión por un problema de conexión o configuración. Intenta de nuevo y, si sigue, revisa las variables de Supabase.",
};

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form action={iniciarSesion} className="w-full max-w-sm space-y-4 rounded-lg border-t-4 border-sky-700 bg-white p-6 shadow-lg ring-1 ring-slate-300">
        <div className="flex flex-col items-center gap-3 pb-2">
          <BrandLogo priority className="h-12 max-w-full" />
          <h1 className="sr-only">{CLINICA.nombre} · Gestión del consultorio</h1>
          <p className="text-sm font-medium text-slate-700">Gestión del consultorio</p>
        </div>
        {error && (
          <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{MENSAJES[error] ?? MENSAJES.credenciales}</p>
        )}
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-700">Correo</span>
          <input className={input} name="email" type="email" autoComplete="username" required />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-700">Contraseña</span>
          <input className={input} name="password" type="password" autoComplete="current-password" required />
        </label>
        <button className={`${btn} w-full`}>Entrar</button>
      </form>
    </main>
  );
}
