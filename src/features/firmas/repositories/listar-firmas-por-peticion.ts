"use server";

import { prisma } from "@/lib/prisma";

export async function listarFirmasPorPeticion(peticionId: string) {
  return prisma.firma.findMany({
    where: {
      peticion_id: peticionId,
    },
    orderBy: {
      fecha_creacion: "asc",
    },
    include: {
      usuario: {
        select: {
          nombre: true,
          correo: true,
        },
      },
    },
  });
}
