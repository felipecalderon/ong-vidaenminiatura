import "server-only";
import { EstadoNoticia } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { CrearNoticiaInput } from "../schemas/crear-noticia.schema";

export async function crearNoticia(
  autorId: string,
  slug: string,
  input: CrearNoticiaInput,
  omitirRevision: boolean,
) {
  const estado = omitirRevision
    ? EstadoNoticia.BORRADOR
    : EstadoNoticia.REVISION;
  return prisma.noticia.create({
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      categoria_id: input.categoriaId,
      autor_id: autorId,
      estado,
    },
  });
}
