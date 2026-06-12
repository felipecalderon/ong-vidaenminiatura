"use server";

import { prisma } from "@/lib/prisma";
import type { Categoria } from "../types";

export async function listarTodasLasCategorias(): Promise<Categoria[]> {
  return prisma.categoria.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
}
