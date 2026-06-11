"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { eliminarPeticionExistente } from "../services/eliminar-peticion-existente";

export async function eliminarPeticionAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    await eliminarPeticionExistente(id, usuario.id, usuario.rol);

    revalidatePath("/");
    revalidatePath("/peticiones");
    revalidatePath("/peticiones/mis-peticiones");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al eliminar.";
    return { success: false, error: errorMsg };
  }
}
