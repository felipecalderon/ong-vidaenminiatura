import "server-only";

import { prisma } from "@/lib/prisma";
import type { Categoria } from "../types";

export async function obtenerCategoriaPorSlug(
  slug: string,
): Promise<Categoria | null> {
  return prisma.categoria.findUnique({
    where: { slug },
  });
}
