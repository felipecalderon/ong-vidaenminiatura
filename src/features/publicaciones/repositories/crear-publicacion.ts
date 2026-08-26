import "server-only";
import { EstadoPublicacion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { CrearPublicacionInput } from "../schemas/crear-publicacion.schema";

export async function crearPublicacion(
  autorId: string,
  slug: string,
  input: CrearPublicacionInput,
  omitirRevision: boolean,
) {
  const estado = omitirRevision
    ? EstadoPublicacion.BORRADOR
    : EstadoPublicacion.REVISION;

  return prisma.publicacion.create({
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      tipo: input.tipo,
      autores: input.autores,
      anio: input.anio,
      enlace: input.enlace,
      lugar: input.lugar,
      fecha_evento: input.fechaEvento,
      autor_id: autorId,
      estado,
    },
  });
}
