"use server";

import { prisma } from "@/lib/prisma";

export async function listarNoticiasPorUsuario(usuarioId: string) {
  return prisma.noticia.findMany({
    where: {
      autor_id: usuarioId,
    },
    orderBy: {
      fecha_creacion: "desc",
    },
    include: {
      categoria: true,
    },
  });
}
