import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/session";

// Next 16: "proxy" reemplaza a "middleware". Protege todas las rutas salvo /login.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
