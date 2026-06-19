import "server-only";
import { prisma } from "@/lib/prisma";
import type { Categoria } from "../types";

export async function crearCategoriaDb(data: {
  nombre: string;
  slug: string;
  descripcion?: string | null;
  color?: string | null;
}): Promise<Categoria> {
  return prisma.categoria.create({
    data: {
      nombre: data.nombre,
      slug: data.slug,
      descripcion: data.descripcion ?? null,
      color: data.color ?? null,
      activo: true,
    },
  });
}
