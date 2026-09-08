import "server-only";
import { EstadoInvitacion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { Invitacion } from "../types";

export async function obtenerInvitacionPendientePorCorreo(
  correo: string,
): Promise<Invitacion | null> {
  return prisma.invitacion.findFirst({
    where: {
      correo: correo.toLowerCase().trim(),
      estado: EstadoInvitacion.PENDIENTE,
    },
    orderBy: {
      fecha_creacion: "desc",
    },
  });
}
