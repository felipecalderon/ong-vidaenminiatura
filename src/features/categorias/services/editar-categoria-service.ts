import { asegurarEsAdministradorActivo } from "@/lib/asegurar-es-administrador-activo";
import { slugify } from "@/lib/slugify";
import { actualizarCategoriaDb } from "../repositories/actualizar-categoria-db";
import { obtenerCategoriaPorId } from "../repositories/obtener-categoria-por-id";
import { obtenerCategoriaPorSlug } from "../repositories/obtener-categoria-por-slug";
import type { Categoria } from "../types";

export async function editarCategoriaService(
  operadorId: string,
  categoriaId: string,
  data: {
    nombre: string;
    descripcion?: string | null;
    color?: string | null;
    activo?: boolean;
  },
): Promise<Categoria> {
  await asegurarEsAdministradorActivo(operadorId);

  const categoria = await obtenerCategoriaPorId(categoriaId);
  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }

  const slug = slugify(data.nombre);
  const existente = await obtenerCategoriaPorSlug(slug);
  if (existente && existente.id !== categoriaId) {
    throw new Error("Ya existe otra categoría con un nombre o slug similar");
  }

  return actualizarCategoriaDb(categoriaId, {
    nombre: data.nombre,
    slug,
    descripcion: data.descripcion,
    color: data.color,
    activo: data.activo ?? categoria.activo,
  });
}
