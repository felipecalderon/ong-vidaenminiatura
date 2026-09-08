import "server-only";
import { EstadoInvitacion } from "@/generated/prisma/enums";
import { actualizarInvitacion } from "../repositories/actualizar-invitacion.repository";
import { obtenerInvitacionPorId } from "../repositories/obtener-invitacion-por-id.repository";
import type { Invitacion } from "../types";
import { enviarEmailInvitacionService } from "./enviar-email-invitacion.service";
import { generarTokenInvitacion } from "./tokens";

export interface ReenviarInvitacionParams {
  invitacionId: string;
  adminNombre: string;
}

export interface ReenviarInvitacionResultado {
  exito: boolean;
  mensaje: string;
  invitacion?: Invitacion;
}

export async function reenviarInvitacionService(
  params: ReenviarInvitacionParams,
): Promise<ReenviarInvitacionResultado> {
  const invitacion = await obtenerInvitacionPorId(params.invitacionId);

  if (!invitacion) {
    return { exito: false, mensaje: "La invitación no fue encontrada." };
  }

  if (invitacion.estado === EstadoInvitacion.ACEPTADA) {
    return {
      exito: false,
      mensaje: "No se puede reenviar una invitación que ya ha sido aceptada.",
    };
  }

  // Generar nuevo token y renovar fecha de expiración
  const { token, tokenHash } = generarTokenInvitacion();
  const nuevaExpiracion = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const actualizada = await actualizarInvitacion(params.invitacionId, {
    token_hash: tokenHash,
    estado: EstadoInvitacion.PENDIENTE,
    expira_at: nuevaExpiracion,
    cancelada_at: null,
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_URL ||
    "http://localhost:3000";
  const urlInvitacion = `${baseUrl.replace(/\/$/, "")}/invitacion/${token}`;

  await enviarEmailInvitacionService({
    correo: invitacion.correo,
    rol: invitacion.rol,
    urlInvitacion,
    invitadoPorNombre: params.adminNombre,
  });

  return {
    exito: true,
    mensaje: "Invitación reenviada exitosamente con un nuevo enlace de acceso.",
    invitacion: actualizada,
  };
}
