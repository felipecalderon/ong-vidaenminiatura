"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoRecursoEducativo } from "@/generated/prisma/enums";
import { actualizarEstadoRecursoEducativo } from "../repositories/actualizar-estado-recurso-educativo";
import { obtenerRecursoEducativoPorId } from "../repositories/obtener-recurso-educativo-por-id";

export async function publicarRecursoEducativoAction(
  id: string,
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
        error: "No tienes permisos para publicar este recurso educativo.",
      };
    }

    // Solo el ADMINISTRADOR puede publicar contenido en cola de revisión
    if (
      recurso.estado === EstadoRecursoEducativo.REVISION &&
      usuario.rol !== "ADMINISTRADOR"
    ) {
      return {
        success: false,
        error: "Solo un administrador puede publicar contenido en revisión.",
      };
    }

    await actualizarEstadoRecursoEducativo(
      id,
      EstadoRecursoEducativo.PUBLICADA,
      new Date(),
    );
    revalidatePath("/");
    revalidatePath("/aprende");
    revalidatePath("/aprende/mis-recursos");
    revalidatePath(`/aprende/${recurso.slug}`);

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al publicar.";
    return { success: false, error: errorMsg };
  }
}
