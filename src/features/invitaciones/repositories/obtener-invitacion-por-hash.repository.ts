import "server-only";
import { prisma } from "@/lib/prisma";
import type { InvitacionConDetalle } from "../types";

export async function obtenerInvitacionPorHash(
  tokenHash: string,
): Promise<InvitacionConDetalle | null> {
  return prisma.invitacion.findUnique({
    where: {
      token_hash: tokenHash,
    },
    include: {
      creada_por: {
        select: {
          id: true,
          nombre: true,
          correo: true,
          picture: true,
        },
      },
      usuario_aceptado: {
        select: {
          id: true,
          nombre: true,
          correo: true,
          picture: true,
        },
      },
    },
  });
}
