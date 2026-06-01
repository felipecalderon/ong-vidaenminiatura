import "server-only";

import { cache } from "react";
import { auth0 } from "@/lib/auth0";
import { obtenerUsuarioPorAuth0Id } from "../repositories";
import type { Usuario } from "../types";

export const obtenerUsuarioAutenticado = cache(
  async (): Promise<Usuario | null> => {
    const session = await auth0.getSession();

    if (!session?.user?.sub) {
      return null;
    }

    return obtenerUsuarioPorAuth0Id(session.user.sub);
  },
);
