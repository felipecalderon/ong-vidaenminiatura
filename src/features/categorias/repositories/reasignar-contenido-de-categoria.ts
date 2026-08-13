import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function reasignarContenidoDeCategoria(
  categoriaId: string,
  categoriaReemplazoId: string,
  tx?: Prisma.TransactionClient,
) {
  const client = tx || prisma;

  await client.peticion.updateMany({
    where: { categoria_id: categoriaId },
    data: { categoria_id: categoriaReemplazoId },
  });

  await client.noticia.updateMany({
    where: { categoria_id: categoriaId },
    data: { categoria_id: categoriaReemplazoId },
  });
}
