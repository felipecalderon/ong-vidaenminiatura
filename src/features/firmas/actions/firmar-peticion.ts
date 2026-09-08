"use server";

import { revalidatePath } from "next/cache";
import { obtenerPeticionPorId } from "@/features/peticiones/repositories/obtener-peticion-por-id";
import {
  type FirmarPeticionInput,
  firmarPeticionSchema,
} from "@/features/peticiones/schemas/firmar-peticion.schema";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { firmarPeticion } from "../services/firmar-peticion";

export async function firmarPeticionAction(
  input: FirmarPeticionInput,
): Promise<{ success: boolean; error?: string }> {
  const validation = firmarPeticionSchema.safeParse(input);
  if (!validation.success) {
    const errorMsg =
      validation.error.issues[0]?.message || "Datos de firma inválidos.";
    return {
      success: false,
      error: errorMsg,
    };
  }

  const { peticionId, nombre, correo } = validation.data;
  const usuario = await obtenerUsuarioAutenticado();

  // Si hay usuario logueado pero está suspendido o bloqueado
  if (usuario && !usuario.acceso.puedeAcceder) {
    return {
      success: false,
      error: "Tu cuenta de usuario no tiene permisos para realizar acciones.",
    };
  }

  const usuarioId = usuario?.id ?? null;
  // Si está autenticado, se utiliza el correo de su cuenta
  const correoFinal = usuario ? usuario.correo.toLowerCase().trim() : correo;

  try {
    const peticion = await obtenerPeticionPorId(peticionId);
    if (!peticion) {
      return { success: false, error: "La petición no existe." };
    }

    await firmarPeticion({
      peticionId,
      nombre,
      correo: correoFinal,
      usuarioId,
    });

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
