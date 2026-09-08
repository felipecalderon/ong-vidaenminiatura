import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { Invitacion } from "../types";

export async function actualizarInvitacion(
  id: string,
  data: Prisma.invitacionUpdateInput,
): Promise<Invitacion> {
  return prisma.invitacion.update({
    where: { id },
    data,
  });
}
