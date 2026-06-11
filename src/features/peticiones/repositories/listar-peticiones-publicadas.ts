import "server-only";

import { EstadoPeticion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function listarPeticionesPublicadas() {
  return prisma.peticion.findMany({
    where: {
      estado: EstadoPeticion.PUBLICADA,
    },
    orderBy: {
      fecha_publicacion: "desc",
    },
    include: {
      categoria: true,
    },
  });
}
