"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { cancelarInvitacionService } from "../services/cancelar-invitacion.service";

export interface ActionResult {
  success: boolean;
  message: string;
}

export async function cancelarInvitacionAction(
  invitacionId: string,
): Promise<ActionResult> {
  const operador = await obtenerUsuarioAutenticado();

  if (!operador || !operador.acceso.esAdministrador) {
    return {
      success: false,
      message: "No tienes permisos de administrador para realizar esta acción.",
    };
  }

  try {
    const resultado = await cancelarInvitacionService(invitacionId);

    if (resultado.exito) {
      revalidatePath("/administracion");
    }

    return {
      success: resultado.exito,
      message: resultado.mensaje,
    };
  } catch (error) {
    console.error("[Action cancelarInvitacionAction] Error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado al cancelar la invitación.",
    };
  }
}
