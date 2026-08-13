"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { eliminarCategoriaSchema } from "../schemas";
import { eliminarCategoriaService } from "../services/eliminar-categoria-service";

export async function eliminarCategoriaAction(
  categoriaId: string,
  data: { categoriaReemplazoId?: string } = {},
): Promise<{ success: boolean; error?: string }> {
  const operador = await obtenerUsuarioAutenticado();

  if (!operador || !operador.acceso.puedeGestionarBackoffice) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const parseado = eliminarCategoriaSchema.parse({
      categoriaId,
      ...data,
    });

    await eliminarCategoriaService(
      operador.id,
      parseado.categoriaId,
      parseado.categoriaReemplazoId,
    );

    revalidatePath("/administracion");
    revalidatePath("/", "layout");
    revalidatePath("/peticiones");
    revalidatePath("/noticias");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Error al eliminar la categoría.";
    return { success: false, error: errorMsg };
  }
}
