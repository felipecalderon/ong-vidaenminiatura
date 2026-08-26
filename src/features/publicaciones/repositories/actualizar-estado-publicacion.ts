import "server-only";
import type { EstadoPublicacion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function actualizarEstadoPublicacion(
  id: string,
  estado: EstadoPublicacion,
  fechaPublicacion?: Date | null,
) {
  return prisma.publicacion.update({
    where: { id },
    data: {
      estado,
      fecha_publicacion: fechaPublicacion,
    },
  });
}
