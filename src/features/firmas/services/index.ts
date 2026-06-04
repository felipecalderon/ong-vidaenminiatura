import "server-only";

import {
  incrementarContadorFirmas,
  obtenerPeticionPorId,
} from "@/features/peticiones/repositories";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { registrarFirma, usuarioYaFirmopeticion } from "../repositories";

export async function firmarPeticion(usuarioId: string, peticionId: string) {
  // 1. Validar si ya firmó
  const yaFirmo = await usuarioYaFirmopeticion(usuarioId, peticionId);
  if (yaFirmo) {
    throw new Error("Ya has firmado esta petición anteriormente.");
  }

  // 2. Obtener petición y validar estado
  const peticion = await obtenerPeticionPorId(peticionId);
  if (!peticion) {
    throw new Error("La petición no existe.");
  }

  if (peticion.estado !== EstadoPeticion.PUBLICADA) {
    throw new Error("Solo se pueden firmar peticiones publicadas.");
  }

  // 3. Ejecutar transacción
  return prisma.$transaction(async (tx) => {
    // Registrar firma
    const firma = await registrarFirma(usuarioId, peticionId, tx);
    // Incrementar cantidad_firmas
    await incrementarContadorFirmas(peticionId, tx);
    return firma;
  });
}
