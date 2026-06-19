import "server-only";
import type { EstadoNoticia } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function actualizarEstadoNoticia(
  id: string,
  estado: EstadoNoticia,
  fechaPublicacion?: Date | null,
) {
  return prisma.noticia.update({
    where: { id },
    data: {
      estado,
      fecha_publicacion: fechaPublicacion,
    },
  });
}
