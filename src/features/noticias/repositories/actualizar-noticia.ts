import "server-only";

import { prisma } from "@/lib/prisma";
import type { EditarNoticiaInput } from "../schemas/editar-noticia.schema";

export async function actualizarNoticia(
  id: string,
  slug: string,
  input: Omit<EditarNoticiaInput, "id">,
) {
  return prisma.noticia.update({
    where: { id },
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      categoria_id: input.categoriaId,
    },
  });
}
