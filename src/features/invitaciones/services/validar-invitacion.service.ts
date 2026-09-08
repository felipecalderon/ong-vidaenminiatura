import "server-only";
import { EstadoInvitacion } from "@/generated/prisma/enums";
import { actualizarInvitacion } from "../repositories/actualizar-invitacion.repository";
import { obtenerInvitacionPorHash } from "../repositories/obtener-invitacion-por-hash.repository";
import type { ValidacionInvitacionResultado } from "../types";
import { hashearToken } from "./tokens";

export async function validarInvitacionService(
  token: string,
): Promise<ValidacionInvitacionResultado> {
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return { esValida: false, motivo: "NO_ENCONTRADA" };
  }

  const tokenHash = hashearToken(token);
  const invitacion = await obtenerInvitacionPorHash(tokenHash);

  if (!invitacion) {
    return { esValida: false, motivo: "NO_ENCONTRADA" };
  }

  if (invitacion.estado === EstadoInvitacion.ACEPTADA) {
    return { esValida: false, motivo: "YA_UTILIZADA", invitacion };
  }

  if (invitacion.estado === EstadoInvitacion.CANCELADA) {
    return { esValida: false, motivo: "CANCELADA", invitacion };
  }

  const ahora = new Date();
  if (invitacion.expira_at < ahora) {
    if (invitacion.estado !== EstadoInvitacion.EXPIRADA) {
      await actualizarInvitacion(invitacion.id, {
        estado: EstadoInvitacion.EXPIRADA,
      });
    }
    return { esValida: false, motivo: "EXPIRADA", invitacion };
  }

  return {
    esValida: true,
    invitacion,
  };
}
