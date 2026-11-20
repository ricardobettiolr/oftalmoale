import { redirect } from "next/navigation";
import Nav from "@/sistema/components/Nav";
import { getPerfil } from "@/sistema/lib/auth";
import { cerrarSesion } from "@/sistema/lib/sesion";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const perfil = await getPerfil();
  if (!perfil) redirect("/sistema/login");

  if (!perfil.activo) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="max-w-sm space-y-4 rounded-lg border border-slate-300 bg-white p-6 text-center shadow-sm">
          <h1 className="text-lg font-semibold">Cuenta pendiente de activación</h1>
          <p className="text-sm text-slate-700">La doctora debe activar tu usuario desde la sección “Equipo”.</p>
          <form action={cerrarSesion}>
            <button className="rounded-md border border-slate-400 px-4 py-2 text-sm">Salir</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <>
      <Nav perfil={perfil} />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </>
  );
}
