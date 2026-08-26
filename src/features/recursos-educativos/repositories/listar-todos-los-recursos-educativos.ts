import "server-only";
import { prisma } from "@/lib/prisma";

export async function listarTodosLosRecursosEducativos() {
  return prisma.recursoEducativo.findMany({
    orderBy: {
      fecha_creacion: "desc",
    },
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
