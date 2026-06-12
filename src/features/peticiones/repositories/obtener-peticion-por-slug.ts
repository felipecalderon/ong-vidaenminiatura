"use server";

import { prisma } from "@/lib/prisma";

export async function obtenerPeticionPorSlug(slug: string) {
  return prisma.peticion.findUnique({
    where: { slug },
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
