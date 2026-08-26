import "server-only";
import { prisma } from "@/lib/prisma";

export async function obtenerPublicacionPorSlug(slug: string) {
  return prisma.publicacion.findUnique({
    where: { slug },
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
