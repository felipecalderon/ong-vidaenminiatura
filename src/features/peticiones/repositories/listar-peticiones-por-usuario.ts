"use server";

import { prisma } from "@/lib/prisma";

export async function listarPeticionesPorUsuario(usuarioId: string) {
  return prisma.peticion.findMany({
    where: {
      usuario_id: usuarioId,
    },
    orderBy: {
      fecha_creacion: "desc",
    },
    include: {
      categoria: true,
    },
  });
}
