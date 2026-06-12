"use server";

import { prisma } from "@/lib/prisma";

export async function obtenerPeticionPorId(id: string) {
  return prisma.peticion.findUnique({
    where: { id },
    include: {
      categoria: true,
      usuario: {
        select: {
          id: true,
          nombre: true,
          picture: true,
        },
      },
    },
  });
}
