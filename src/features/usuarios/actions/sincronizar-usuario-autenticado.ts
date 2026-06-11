"use server";

import { auth0 } from "@/lib/auth0";
import { asegurarUsuarioDesdeAuth0 } from "../services/asegurar-usuario-desde-auth0";
import type { Usuario } from "../types";

export async function sincronizarUsuarioAutenticado(): Promise<Usuario | null> {
  const session = await auth0.getSession();

  if (!session?.user) {
    return null;
  }

  return asegurarUsuarioDesdeAuth0(session.user);
}
