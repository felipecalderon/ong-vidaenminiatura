"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import type { EstadoNoticia } from "@/generated/prisma/enums";
import { cambiarEstadoNoticia } from "../services/cambiar-estado-noticia";

export async function actualizarEstadoNoticiaAction(
  id: string,
  estado: EstadoNoticia,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const noticia = await cambiarEstadoNoticia(id, estado, usuario);

    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath("/noticias/mis-noticias");
    revalidatePath(`/noticias/${noticia.slug}`);
    revalidatePath("/administracion");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al actualizar estado.";
    return { success: false, error: errorMsg };
  }
}
