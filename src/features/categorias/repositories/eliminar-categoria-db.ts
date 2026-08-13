import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function eliminarCategoriaDb(
  id: string,
  tx?: Prisma.TransactionClient,
) {
  const client = tx || prisma;
  return client.categoria.delete({
    where: { id },
  });
}
