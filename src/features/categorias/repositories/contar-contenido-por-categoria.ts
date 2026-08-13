import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function contarContenidoPorCategoria(
  id: string,
  tx?: Prisma.TransactionClient,
): Promise<{ peticiones: number; noticias: number }> {
  const client = tx || prisma;
  const resultado = await client.categoria.findUnique({
    where: { id },
    select: {
      _count: {
        select: {
          peticiones: true,
          noticias: true,
        },
      },
    },
  });

  return {
    peticiones: resultado?._count.peticiones ?? 0,
    noticias: resultado?._count.noticias ?? 0,
  };
}
