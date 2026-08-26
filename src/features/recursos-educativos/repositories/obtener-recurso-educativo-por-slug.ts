import "server-only";
import { prisma } from "@/lib/prisma";

export async function obtenerRecursoEducativoPorSlug(slug: string) {
  return prisma.recursoEducativo.findUnique({
    where: { slug },
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
