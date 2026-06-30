"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { actualizarEstadoPeticion } from "../repositories/actualizar-estado-peticion";
import { obtenerPeticionPorId } from "../repositories/obtener-peticion-por-id";

export async function publicarPeticionAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const peticion = await obtenerPeticionPorId(id);

    if (!peticion) {
      return { success: false, error: "La petición no existe." };
    }

    if (peticion.usuario_id !== usuario.id && usuario.rol !== "ADMINISTRADOR") {
      return {
        success: false,
        error: "No tienes permisos para publicar esta petición.",
      };
    }

    // Solo el ADMINISTRADOR puede publicar contenido en cola de revisión
    if (
      peticion.estado === EstadoPeticion.REVISION &&
      usuario.rol !== "ADMINISTRADOR"
    ) {
      return {
        success: false,
        error: "Solo un administrador puede publicar contenido en revisión.",
      };
    }

    await actualizarEstadoPeticion(id, EstadoPeticion.PUBLICADA, new Date());
    revalidatePath("/");
    revalidatePath("/peticiones");
    revalidatePath(`/peticiones/${peticion.slug}`);

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al publicar.";
    return { success: false, error: errorMsg };
  }
}
