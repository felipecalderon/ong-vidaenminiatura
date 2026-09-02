import "server-only";
import { prisma } from "@/lib/prisma";

export async function buscarVoluntarioPorCorreo(correo: string) {
  return prisma.voluntario.findFirst({
    where: {
      correo: {
        equals: correo.trim(),
        mode: "insensitive",
      },
    },
    orderBy: {
      fecha_creacion: "desc",
    },
  });
}
