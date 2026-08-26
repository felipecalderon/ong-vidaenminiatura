import "server-only";
import type { EstadoPublicacion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { EditarPublicacionInput } from "../schemas/editar-publicacion.schema";

export async function actualizarPublicacion(
  id: string,
  slug: string,
  input: Omit<EditarPublicacionInput, "id">,
  estado?: EstadoPublicacion,
) {
  return prisma.publicacion.update({
    where: { id },
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
      estado,
    },
  });
}
