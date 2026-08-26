"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { eliminarPublicacionExistente } from "../services/eliminar-publicacion-existente";

export async function eliminarPublicacionAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    await eliminarPublicacionExistente(id, usuario.id, usuario.rol);

    revalidatePath("/");
    revalidatePath("/investigacion");
    revalidatePath("/investigacion/mis-publicaciones");
    revalidatePath("/administracion");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al eliminar.";
    return { success: false, error: errorMsg };
  }
}
