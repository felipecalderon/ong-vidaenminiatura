import "server-only";
import type { EstadoRecursoEducativo } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function actualizarEstadoRecursoEducativo(
  id: string,
  estado: EstadoRecursoEducativo,
  fechaPublicacion?: Date | null,
) {
  return prisma.recursoEducativo.update({
    where: { id },
    data: {
      estado,
      fecha_publicacion: fechaPublicacion,
    },
  });
}
