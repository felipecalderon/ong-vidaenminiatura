"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import type { EstadoPublicacion } from "@/generated/prisma/enums";
import { cambiarEstadoPublicacion } from "../services/cambiar-estado-publicacion";

export async function actualizarEstadoPublicacionAction(
  id: string,
  estado: EstadoPublicacion,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const publicacion = await cambiarEstadoPublicacion(id, estado, usuario);

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
