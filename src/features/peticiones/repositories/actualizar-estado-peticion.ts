"use server";

import type { EstadoPeticion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function actualizarEstadoPeticion(
  id: string,
  estado: EstadoPeticion,
  fechaPublicacion?: Date | null,
) {
  return prisma.peticion.update({
    where: { id },
    data: {
      estado,
      fecha_publicacion: fechaPublicacion,
    },
  });
}
