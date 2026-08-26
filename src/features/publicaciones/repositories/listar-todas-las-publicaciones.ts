import "server-only";
import { prisma } from "@/lib/prisma";

export async function listarTodasLasPublicaciones() {
  return prisma.publicacion.findMany({
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
