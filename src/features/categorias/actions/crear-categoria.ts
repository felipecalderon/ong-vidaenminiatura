"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { crearCategoriaSchema } from "../schemas";
import { crearCategoriaService } from "../services/crear-categoria-service";
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
