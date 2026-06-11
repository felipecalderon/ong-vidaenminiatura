"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoNoticia } from "@/generated/prisma/enums";
import { actualizarEstadoNoticia } from "../repositories/actualizar-estado-noticia";
import { obtenerNoticiaPorId } from "../repositories/obtener-noticia-por-id";

export async function publicarNoticiaAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const noticia = await obtenerNoticiaPorId(id);

    if (!noticia) {
      return { success: false, error: "La noticia no existe." };
    }

    if (noticia.autor_id !== usuario.id && usuario.rol !== "ADMINISTRADOR") {
      return {
        success: false,
        error: "No tienes permisos para publicar esta noticia.",
      };
    }

    await actualizarEstadoNoticia(id, EstadoNoticia.PUBLICADA, new Date());
    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath("/noticias/mis-noticias");
    revalidatePath(`/noticias/${noticia.slug}`);

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al publicar.";
    return { success: false, error: errorMsg };
  }
}
