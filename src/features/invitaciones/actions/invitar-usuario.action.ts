"use server";

import { revalidatePath } from "next/cache";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import {
  type CrearInvitacionSchemaInput,
  crearInvitacionSchema,
} from "../schemas/invitacion.schema";
import { crearInvitacionService } from "../services/crear-invitacion.service";

export interface ActionResult {
  success: boolean;
  message: string;
}

export async function invitarUsuarioAction(
  data: CrearInvitacionSchemaInput,
): Promise<ActionResult> {
  const operador = await obtenerUsuarioAutenticado();

  if (!operador || !operador.acceso.esAdministrador) {
    return {
      success: false,
      message: "No tienes permisos de administrador para enviar invitaciones.",
    };
  }

  const validacion = crearInvitacionSchema.safeParse(data);
  if (!validacion.success) {
    const errorMsg = validacion.error.message || "Datos inválidos";
    return { success: false, message: errorMsg };
  }

  try {
    const resultado = await crearInvitacionService({
      correo: validacion.data.correo,
      rol: validacion.data.rol,
      adminId: operador.id,
      adminNombre: operador.nombre,
    });

    if (resultado.exito) {
      revalidatePath("/administracion");
    }

    return {
      success: resultado.exito,
      message: resultado.mensaje,
    };
  } catch (error) {
    console.error("[Action invitarUsuarioAction] Error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado al enviar la invitación.",
    };
  }
}
