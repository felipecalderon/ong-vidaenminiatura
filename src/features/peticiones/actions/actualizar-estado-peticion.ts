"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { actualizarEstadoPeticion } from "../repositories/actualizar-estado-peticion";
import { obtenerPeticionPorId } from "../repositories/obtener-peticion-por-id";

export async function actualizarEstadoPeticionAction(
  id: string,
  estado: EstadoPeticion,
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
        error: "No tienes permisos para modificar esta petición.",
      };
    }

    const fechaPublicacion =
      estado === EstadoPeticion.PUBLICADA ? new Date() : null;

    await actualizarEstadoPeticion(id, estado, fechaPublicacion);

    revalidatePath("/");
    revalidatePath("/peticiones");
    revalidatePath(`/peticiones/${peticion.slug}`);
    revalidatePath("/administracion");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al actualizar estado.";
    return { success: false, error: errorMsg };
  }
}
