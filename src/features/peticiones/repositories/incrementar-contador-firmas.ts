import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function incrementarContadorFirmas(
  peticionId: string,
  tx?: Prisma.TransactionClient,
) {
  const client = tx || prisma;
  return client.peticion.update({
    where: { id: peticionId },
    data: {
      cantidad_firmas: {
        increment: 1,
      },
    },
  });
}
