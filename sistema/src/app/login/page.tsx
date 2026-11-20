import { CLINICA } from "@/lib/clinic";
import { btn, input } from "@/components/ui";
import { iniciarSesion } from "./actions";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form action={iniciarSesion} className="w-full max-w-sm space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-sky-800">{CLINICA.nombre}</h1>
          <p className="text-sm text-slate-500">{CLINICA.doctora}</p>
        </div>
        {error && (
          <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">Correo o contraseña incorrectos.</p>
        )}
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600">Correo</span>
          <input className={input} name="email" type="email" autoComplete="username" required />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600">Contraseña</span>
          <input className={input} name="password" type="password" autoComplete="current-password" required />
        </label>
        <button className={`${btn} w-full`}>Entrar</button>
      </form>
    </main>
  );
}
