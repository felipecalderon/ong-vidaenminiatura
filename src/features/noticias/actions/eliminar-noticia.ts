"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { eliminarNoticiaExistente } from "../services/eliminar-noticia-existente";

export async function eliminarNoticiaAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    await eliminarNoticiaExistente(id, usuario.id, usuario.rol);

    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath("/noticias/mis-noticias");
    revalidatePath("/administracion");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al eliminar.";
    return { success: false, error: errorMsg };
  }
}
