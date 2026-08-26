import "server-only";
import { prisma } from "@/lib/prisma";

export async function listarRecursosEducativosPorUsuario(usuarioId: string) {
  return prisma.recursoEducativo.findMany({
    where: {
      autor_id: usuarioId,
    },
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
