"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { publicarPeticion } from "../services/publicar-peticion";

export async function publicarPeticionAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario) {
    return { success: false, error: "No autenticado." };
  }

  try {
    const peticion = await publicarPeticion(id, usuario);

    revalidatePath("/");
    revalidatePath("/peticiones");
    revalidatePath("/peticiones/mis-peticiones");
    revalidatePath(`/peticiones/${peticion.slug}`);
    revalidatePath("/administracion");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al publicar.";
    return { success: false, error: errorMsg };
  }
}
