import "server-only";
import { prisma } from "@/lib/prisma";

export async function eliminarRecursoEducativo(id: string) {
  return prisma.recursoEducativo.delete({
    where: { id },
  });
}
