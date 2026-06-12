"use server";

import { prisma } from "@/lib/prisma";
import type { Categoria } from "../types";

export async function actualizarCategoriaDb(
  id: string,
  data: {
    nombre: string;
    slug: string;
    descripcion?: string | null;
    color?: string | null;
    activo?: boolean;
  },
): Promise<Categoria> {
  return prisma.categoria.update({
    where: { id },
    data: {
      nombre: data.nombre,
      slug: data.slug,
      descripcion: data.descripcion ?? null,
      color: data.color ?? null,
      activo: data.activo,
    },
  });
}
