"use server";

import { prisma } from "@/lib/prisma";

export async function obtenerNoticiaPorId(id: string) {
  return prisma.noticia.findUnique({
    where: { id },
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
