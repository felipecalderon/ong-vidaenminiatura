import "server-only";
import { prisma } from "@/lib/prisma";

export async function obtenerRecursoEducativoPorId(id: string) {
  return prisma.recursoEducativo.findUnique({
    where: { id },
    include: {
      categoria: {
        select: {
          id: true,
          nombre: true,
          slug: true,
          color: true,
        },
      },
      autor: {
        select: {
          id: true,
          nombre: true,
          picture: true,
        },
      },
    },
  });
}
