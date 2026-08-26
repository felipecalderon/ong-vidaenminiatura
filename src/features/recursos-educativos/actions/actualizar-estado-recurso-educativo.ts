"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoRecursoEducativo } from "@/generated/prisma/enums";
import { actualizarEstadoRecursoEducativo } from "../repositories/actualizar-estado-recurso-educativo";
import { obtenerRecursoEducativoPorId } from "../repositories/obtener-recurso-educativo-por-id";

export async function actualizarEstadoRecursoEducativoAction(
  id: string,
  estado: EstadoRecursoEducativo,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const recurso = await obtenerRecursoEducativoPorId(id);

    if (!recurso) {
      return { success: false, error: "El recurso educativo no existe." };
    }

    if (recurso.autor_id !== usuario.id && usuario.rol !== "ADMINISTRADOR") {
      return {
        success: false,
        error: "No tienes permisos para modificar este recurso educativo.",
      };
    }

    // Solo el ADMINISTRADOR puede aprobar contenido en cola de revisión
    if (
      recurso.estado === EstadoRecursoEducativo.REVISION &&
      usuario.rol !== "ADMINISTRADOR"
    ) {
      return {
        success: false,
        error:
          "Solo un administrador puede aprobar o rechazar contenido en revisión.",
      };
    }

    const fechaPublicacion =
      estado === EstadoRecursoEducativo.PUBLICADA ? new Date() : null;

    await actualizarEstadoRecursoEducativo(id, estado, fechaPublicacion);

    revalidatePath("/");
    revalidatePath("/aprende");
    revalidatePath("/aprende/mis-recursos");
    revalidatePath(`/aprende/${recurso.slug}`);
    revalidatePath("/administracion");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al actualizar estado.";
    return { success: false, error: errorMsg };
  }
}
