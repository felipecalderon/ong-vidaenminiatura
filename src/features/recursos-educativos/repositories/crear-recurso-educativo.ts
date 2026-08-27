import "server-only";
import { EstadoRecursoEducativo } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { CrearRecursoEducativoInput } from "../schemas/crear-recurso-educativo.schema";

export async function crearRecursoEducativo(
  autorId: string,
  slug: string,
  input: CrearRecursoEducativoInput,
  omitirRevision: boolean,
) {
  const estado = omitirRevision
    ? EstadoRecursoEducativo.BORRADOR
    : EstadoRecursoEducativo.REVISION;

  return prisma.recursoEducativo.create({
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      video_youtube: input.videoYoutube ?? null,
      tipo: input.tipo,
      categoria_id: input.categoriaId,
      autor_id: autorId,
      estado,
    },
  });
}
