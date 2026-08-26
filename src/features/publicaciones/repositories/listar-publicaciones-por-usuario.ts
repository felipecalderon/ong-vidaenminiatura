import "server-only";
import { prisma } from "@/lib/prisma";

export async function listarPublicacionesPorUsuario(usuarioId: string) {
  return prisma.publicacion.findMany({
    where: {
      autor_id: usuarioId,
    },
    orderBy: {
      fecha_creacion: "desc",
    },
    include: {
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
