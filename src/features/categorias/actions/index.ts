"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries";
import { crearCategoriaSchema, editarCategoriaSchema } from "../schemas";
import { crearCategoriaService, editarCategoriaService } from "../services";
import type { Categoria } from "../types";

export async function crearCategoriaAction(data: {
  nombre: string;
  descripcion?: string;
  color?: string;
}): Promise<Categoria> {
  const operador = await obtenerUsuarioAutenticado();
  if (!operador) {
    throw new Error("No autenticado");
  }

  const parseado = crearCategoriaSchema.parse(data);

  const result = await crearCategoriaService(operador.id, parseado);
  revalidatePath("/administracion");
  return result;
}

export async function editarCategoriaAction(
  categoriaId: string,
  data: {
    nombre: string;
    descripcion?: string;
    color?: string;
    activo?: boolean;
  },
): Promise<Categoria> {
  const operador = await obtenerUsuarioAutenticado();
  if (!operador) {
    throw new Error("No autenticado");
  }

  const parseado = editarCategoriaSchema.parse({
    categoriaId,
    nombre: data.nombre,
    descripcion: data.descripcion,
    color: data.color,
  });

  const result = await editarCategoriaService(operador.id, categoriaId, {
    nombre: parseado.nombre,
    descripcion: parseado.descripcion,
    color: parseado.color,
    activo: data.activo,
  });

  revalidatePath("/administracion");
  return result;
}
