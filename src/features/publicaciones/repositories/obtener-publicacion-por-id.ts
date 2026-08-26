import "server-only";
import { prisma } from "@/lib/prisma";

export async function obtenerPublicacionPorId(id: string) {
  return prisma.publicacion.findUnique({
    where: { id },
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
