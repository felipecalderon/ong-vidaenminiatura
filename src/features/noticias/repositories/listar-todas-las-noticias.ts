import "server-only";
import { prisma } from "@/lib/prisma";

export async function listarTodasLasNoticias() {
  return prisma.noticia.findMany({
    orderBy: {
      fecha_creacion: "desc",
    },
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
