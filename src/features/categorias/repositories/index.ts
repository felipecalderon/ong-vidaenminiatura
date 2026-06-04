import "server-only";

import { prisma } from "@/lib/prisma";
import type { Categoria } from "../types";

export async function listarTodasLasCategorias(): Promise<Categoria[]> {
  return prisma.categoria.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
}

export async function obtenerCategoriaPorId(
  id: string,
): Promise<Categoria | null> {
  return prisma.categoria.findUnique({
    where: { id },
  });
}

export async function obtenerCategoriaPorSlug(
  slug: string,
): Promise<Categoria | null> {
  return prisma.categoria.findUnique({
    where: { slug },
  });
}

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
