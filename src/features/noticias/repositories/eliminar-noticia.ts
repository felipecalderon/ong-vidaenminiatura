"use server";

import { prisma } from "@/lib/prisma";

export async function eliminarNoticia(id: string) {
  return prisma.noticia.delete({
    where: { id },
  });
}
