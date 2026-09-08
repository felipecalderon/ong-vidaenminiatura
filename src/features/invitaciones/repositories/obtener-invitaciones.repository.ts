import "server-only";
import { prisma } from "@/lib/prisma";
import type { InvitacionConDetalle } from "../types";

export async function obtenerTodasLasInvitaciones(): Promise<
  InvitacionConDetalle[]
> {
  return prisma.invitacion.findMany({
    orderBy: {
      fecha_creacion: "desc",
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
