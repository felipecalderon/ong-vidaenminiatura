import "server-only";

import { EstadoNoticia } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function listarNoticiasPublicadas() {
  return prisma.noticia.findMany({
    where: {
      estado: EstadoNoticia.PUBLICADA,
    },
    orderBy: {
      fecha_publicacion: "desc",
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
