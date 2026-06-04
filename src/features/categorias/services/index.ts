import "server-only";

import { obtenerUsuarioPorId } from "@/features/usuarios/repositories";
import { EstadoUsuario, Rol } from "@/generated/prisma/enums";
import {
  actualizarCategoriaDb,
  crearCategoriaDb,
  obtenerCategoriaPorId,
  obtenerCategoriaPorSlug,
} from "../repositories";
import type { Categoria } from "../types";

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

async function verificarAdmin(operadorId: string) {
  const operador = await obtenerUsuarioPorId(operadorId);
  if (
    !operador ||
    operador.rol !== Rol.ADMINISTRADOR ||
    operador.estado !== EstadoUsuario.ACTIVO
  ) {
    throw new Error("No autorizado");
  }
}

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
  await verificarAdmin(operadorId);

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
