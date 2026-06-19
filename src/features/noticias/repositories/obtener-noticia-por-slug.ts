import "server-only";
import { prisma } from "@/lib/prisma";

export async function obtenerNoticiaPorSlug(slug: string) {
  return prisma.noticia.findUnique({
    where: { slug },
    include: {
      categoria: true,
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
