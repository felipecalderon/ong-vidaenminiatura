"use server";

import { revalidatePath } from "next/cache";
import { obtenerPeticionPorId } from "@/features/peticiones/repositories/obtener-peticion-por-id";
import { firmarPeticionSchema } from "@/features/peticiones/schemas/firmar-peticion.schema";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { firmarPeticion } from "../services/firmar-peticion";

export async function firmarPeticionAction(
  peticionId: string,
): Promise<{ success: boolean; error?: string }> {
  const validation = firmarPeticionSchema.safeParse({ peticionId });
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.message || "ID de petición inválido",
    };
  }

  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    return {
      success: false,
      error: "No autorizado. Inicia sesión para firmar.",
    };
  }

  try {
    const peticion = await obtenerPeticionPorId(peticionId);
    if (!peticion) {
      return { success: false, error: "La petición no existe." };
    }

    await firmarPeticion(usuario.id, peticionId);

    revalidatePath("/");
    revalidatePath("/peticiones");
    revalidatePath(`/peticiones/${peticion.slug}`);

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al registrar la firma.";
    return {
      success: false,
      error: errorMsg,
    };
  }
}
