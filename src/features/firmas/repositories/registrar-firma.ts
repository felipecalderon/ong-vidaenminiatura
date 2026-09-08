import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export interface RegistrarFirmaDatos {
  peticionId: string;
  nombre: string;
  correo: string;
  usuarioId?: string | null;
}

export async function registrarFirma(
  datos: RegistrarFirmaDatos,
  tx?: Prisma.TransactionClient,
) {
  const client = tx || prisma;
  return client.firma.create({
    data: {
      peticion_id: datos.peticionId,
      nombre: datos.nombre,
      correo: datos.correo,
      usuario_id: datos.usuarioId ?? null,
    },
  });
}
