"use server";

import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { contarContenidoPorCategoria } from "../repositories/contar-contenido-por-categoria";
import { obtenerCategoriaPorId } from "../repositories/obtener-categoria-por-id";
import { obtenerConteosCategoriaSchema } from "../schemas";

export async function obtenerConteosCategoriaAction(
  categoriaId: string,
): Promise<{ peticiones: number; noticias: number }> {
  const operador = await obtenerUsuarioAutenticado();

  if (!operador || !operador.acceso.puedeGestionarBackoffice) {
    throw new Error("No autorizado.");
  }

  const parseado = obtenerConteosCategoriaSchema.parse({ categoriaId });

  const categoria = await obtenerCategoriaPorId(parseado.categoriaId);
  if (!categoria) {
    throw new Error("La categoría no existe.");
  }

  return contarContenidoPorCategoria(parseado.categoriaId);
}
