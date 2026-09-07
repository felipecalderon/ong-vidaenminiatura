"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import type { EstadoRecursoEducativo } from "@/generated/prisma/enums";
import { cambiarEstadoRecursoEducativo } from "../services/cambiar-estado-recurso-educativo";

export async function actualizarEstadoRecursoEducativoAction(
  id: string,
  estado: EstadoRecursoEducativo,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const recurso = await cambiarEstadoRecursoEducativo(id, estado, usuario);

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
