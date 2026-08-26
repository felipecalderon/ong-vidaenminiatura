import "server-only";
import { prisma } from "@/lib/prisma";

export async function eliminarPublicacion(id: string) {
  return prisma.publicacion.delete({
    where: { id },
  });
}
