"use server";

import { prisma } from "@/lib/prisma";

export async function listarTodasLasPeticiones() {
  return prisma.peticion.findMany({
    orderBy: {
      fecha_creacion: "desc",
    },
    include: {
      categoria: true,
      usuario: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
  });
}
