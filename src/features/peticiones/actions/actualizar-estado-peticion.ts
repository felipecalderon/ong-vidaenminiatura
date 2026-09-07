"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import type { EstadoPeticion } from "@/generated/prisma/enums";
import { cambiarEstadoPeticion } from "../services/cambiar-estado-peticion";

export async function actualizarEstadoPeticionAction(
  id: string,
  estado: EstadoPeticion,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario) {
    return { success: false, error: "No autenticado." };
  }

  try {
    await cambiarEstadoPeticion(id, estado, usuario);

    revalidatePath("/");
    revalidatePath("/peticiones");
    revalidatePath("/peticiones/mis-peticiones");
    revalidatePath("/administracion");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al actualizar estado.";
    return { success: false, error: errorMsg };
  }
}
