import "server-only";
import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export async function obtenerUsuarioPorId(id: string): Promise<Usuario | null> {
  return prisma.usuario.findUnique({
    where: { id },
  });
}
