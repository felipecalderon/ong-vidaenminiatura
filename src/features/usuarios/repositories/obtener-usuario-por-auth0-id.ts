import "server-only";

import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export async function obtenerUsuarioPorAuth0Id(
  auth0Id: string,
): Promise<Usuario | null> {
  return prisma.usuario.findUnique({
    where: { auth0_id: auth0Id },
  });
}
