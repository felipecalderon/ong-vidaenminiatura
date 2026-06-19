import "server-only";
import { prisma } from "@/lib/prisma";
import type { Categoria } from "../types";

export async function obtenerCategoriaPorId(
  id: string,
): Promise<Categoria | null> {
  return prisma.categoria.findUnique({
    where: { id },
  });
}
