import "server-only";
import { prisma } from "@/lib/prisma";

export async function eliminarPeticion(id: string) {
  return prisma.peticion.delete({
    where: { id },
  });
}
