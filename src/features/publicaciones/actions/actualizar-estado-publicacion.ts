"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoPublicacion } from "@/generated/prisma/enums";
import { actualizarEstadoPublicacion } from "../repositories/actualizar-estado-publicacion";
import { obtenerPublicacionPorId } from "../repositories/obtener-publicacion-por-id";

export async function actualizarEstadoPublicacionAction(
  id: string,
  estado: EstadoPublicacion,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const publicacion = await obtenerPublicacionPorId(id);

    if (!publicacion) {
      return { success: false, error: "La publicación no existe." };
    }

    if (
      publicacion.autor_id !== usuario.id &&
      usuario.rol !== "ADMINISTRADOR"
    ) {
      return {
        success: false,
        error: "No tienes permisos para modificar esta publicación.",
      };
    }

    // Solo el ADMINISTRADOR puede aprobar contenido en cola de revisión
    if (
      publicacion.estado === EstadoPublicacion.REVISION &&
      usuario.rol !== "ADMINISTRADOR"
    ) {
      return {
        success: false,
        error:
          "Solo un administrador puede aprobar o rechazar contenido en revisión.",
      };
    }

    const fechaPublicacion =
      estado === EstadoPublicacion.PUBLICADA ? new Date() : null;

    await actualizarEstadoPublicacion(id, estado, fechaPublicacion);

    revalidatePath("/");
    revalidatePath("/investigacion");
    revalidatePath("/investigacion/mis-publicaciones");
    revalidatePath(`/investigacion/${publicacion.slug}`);
    revalidatePath("/administracion");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al actualizar estado.";
    return { success: false, error: errorMsg };
  }
}
