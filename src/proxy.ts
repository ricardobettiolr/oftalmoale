import type { NextRequest } from "next/server";
import { updateSession } from "@/sistema/lib/supabase/session";

// Solo protege el sistema del consultorio. El sitio público no pasa por aquí.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/sistema/:path*"],
};
