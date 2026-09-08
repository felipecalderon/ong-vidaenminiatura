import "server-only";
import { EstadoInvitacion } from "@/generated/prisma/enums";
import { actualizarInvitacion } from "../repositories/actualizar-invitacion.repository";
import { obtenerInvitacionPorId } from "../repositories/obtener-invitacion-por-id.repository";
import type { Invitacion } from "../types";

export interface CancelarInvitacionResultado {
  exito: boolean;
  mensaje: string;
  invitacion?: Invitacion;
}

export async function cancelarInvitacionService(
  invitacionId: string,
): Promise<CancelarInvitacionResultado> {
  const invitacion = await obtenerInvitacionPorId(invitacionId);

  if (!invitacion) {
    return { exito: false, mensaje: "La invitación no fue encontrada." };
  }

  if (invitacion.estado === EstadoInvitacion.ACEPTADA) {
    return {
      exito: false,
      mensaje: "No se puede cancelar una invitación que ya ha sido aceptada.",
    };
  }

  if (invitacion.estado === EstadoInvitacion.CANCELADA) {
    return {
      exito: false,
      mensaje: "La invitación ya se encuentra cancelada.",
    };
  }

  const actualizada = await actualizarInvitacion(invitacionId, {
    estado: EstadoInvitacion.CANCELADA,
    cancelada_at: new Date(),
  });

  return {
    exito: true,
    mensaje: "Invitación revocada exitosamente.",
    invitacion: actualizada,
  };
}
