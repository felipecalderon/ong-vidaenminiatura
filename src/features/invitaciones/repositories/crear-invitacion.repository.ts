import "server-only";
import type { Rol } from "@/generated/prisma/enums";
import { EstadoInvitacion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { Invitacion } from "../types";

export interface CrearInvitacionRepoInput {
  correo: string;
  rol: Rol;
  tokenHash: string;
  expiraAt: Date;
  creadaPorId: string;
}

export async function crearInvitacion(
  input: CrearInvitacionRepoInput,
): Promise<Invitacion> {
  return prisma.invitacion.create({
    data: {
      correo: input.correo.toLowerCase().trim(),
      rol: input.rol,
      token_hash: input.tokenHash,
      expira_at: input.expiraAt,
      creada_por_id: input.creadaPorId,
      estado: EstadoInvitacion.PENDIENTE,
    },
  });
}
