import "server-only";
import { prisma } from "@/lib/prisma";

export async function usuarioYaFirmopeticion(
  usuarioId: string,
  peticionId: string,
): Promise<boolean> {
  const conteo = await prisma.firma.count({
    where: {
      usuario_id: usuarioId,
      peticion_id: peticionId,
    },
  });
  return conteo > 0;
}
