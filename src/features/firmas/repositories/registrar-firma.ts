"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function registrarFirma(
  usuarioId: string,
  peticionId: string,
  tx?: Prisma.TransactionClient,
) {
  const client = tx || prisma;
  return client.firma.create({
    data: {
      usuario_id: usuarioId,
      peticion_id: peticionId,
    },
  });
}
