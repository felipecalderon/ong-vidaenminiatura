"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoPublicacion } from "@/generated/prisma/enums";
import { actualizarEstadoPublicacion } from "../repositories/actualizar-estado-publicacion";
import { obtenerPublicacionPorId } from "../repositories/obtener-publicacion-por-id";

export async function publicarPublicacionAction(
  id: string,
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
        error: "No tienes permisos para publicar esta publicación.",
      };
    }

    // Solo el ADMINISTRADOR puede publicar contenido en cola de revisión
    if (
      publicacion.estado === EstadoPublicacion.REVISION &&
      usuario.rol !== "ADMINISTRADOR"
    ) {
      return {
        success: false,
        error: "Solo un administrador puede publicar contenido en revisión.",
      };
    }

    await actualizarEstadoPublicacion(
      id,
      EstadoPublicacion.PUBLICADA,
      new Date(),
    );
    revalidatePath("/");
    revalidatePath("/investigacion");
    revalidatePath("/investigacion/mis-publicaciones");
    revalidatePath(`/investigacion/${publicacion.slug}`);

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al publicar.";
    return { success: false, error: errorMsg };
  }
}
