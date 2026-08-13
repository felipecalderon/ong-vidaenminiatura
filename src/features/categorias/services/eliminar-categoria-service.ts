import { asegurarEsAdministradorActivo } from "@/lib/asegurar-es-administrador-activo";
import { prisma } from "@/lib/prisma";
import { contarContenidoPorCategoria } from "../repositories/contar-contenido-por-categoria";
import { eliminarCategoriaDb } from "../repositories/eliminar-categoria-db";
import { listarTodasLasCategorias } from "../repositories/listar-todas-las-categorias";
import { obtenerCategoriaPorId } from "../repositories/obtener-categoria-por-id";
import { reasignarContenidoDeCategoria } from "../repositories/reasignar-contenido-de-categoria";

export async function eliminarCategoriaService(
  operadorId: string,
  categoriaId: string,
  categoriaReemplazoId?: string,
) {
  await asegurarEsAdministradorActivo(operadorId);

  const categoria = await obtenerCategoriaPorId(categoriaId);
  if (!categoria) {
    throw new Error("La categoría no existe.");
  }

  const totalCategorias = (await listarTodasLasCategorias()).length;
  if (totalCategorias <= 1) {
    throw new Error("No se puede eliminar la última categoría.");
  }

  const conteo = await contarContenidoPorCategoria(categoriaId);
  const tieneContenido = conteo.peticiones > 0 || conteo.noticias > 0;

  if (tieneContenido) {
    if (!categoriaReemplazoId) {
      throw new Error("Debes seleccionar una categoría de reemplazo.");
    }

    if (categoriaReemplazoId === categoriaId) {
      throw new Error(
        "La categoría de reemplazo debe ser distinta a la categoría que se elimina.",
      );
    }

    const reemplazo = await obtenerCategoriaPorId(categoriaReemplazoId);
    if (!reemplazo) {
      throw new Error("La categoría de reemplazo no existe.");
    }

    const reemplazoId = categoriaReemplazoId;
    return prisma.$transaction(async (tx) => {
      await reasignarContenidoDeCategoria(categoriaId, reemplazoId, tx);
      return eliminarCategoriaDb(categoriaId, tx);
    });
  }

  return eliminarCategoriaDb(categoriaId);
}
