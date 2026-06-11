import { crearCategoriaDb } from "../repositories/crear-categoria-db";
import { obtenerCategoriaPorSlug } from "../repositories/obtener-categoria-por-slug";
import type { Categoria } from "../types";
import { slugify } from "./slugify";
import { verificarAdmin } from "./verificar-admin";

export async function crearCategoriaService(
  operadorId: string,
  data: {
    nombre: string;
    descripcion?: string | null;
    color?: string | null;
  },
): Promise<Categoria> {
  await verificarAdmin(operadorId);

  const slug = slugify(data.nombre);
  const existente = await obtenerCategoriaPorSlug(slug);
  if (existente) {
    throw new Error("Ya existe una categoría con un nombre o slug similar");
  }

  return crearCategoriaDb({
    nombre: data.nombre,
    slug,
    descripcion: data.descripcion,
    color: data.color,
  });
}
