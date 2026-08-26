"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { eliminarRecursoEducativoExistente } from "../services/eliminar-recurso-educativo-existente";

export async function eliminarRecursoEducativoAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    await eliminarRecursoEducativoExistente(id, usuario.id, usuario.rol);

    revalidatePath("/");
    revalidatePath("/aprende");
    revalidatePath("/aprende/mis-recursos");
    revalidatePath("/administracion");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al eliminar.";
    return { success: false, error: errorMsg };
  }
}
