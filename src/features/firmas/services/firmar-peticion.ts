import "server-only";
import { incrementarContadorFirmas } from "@/features/peticiones/repositories/incrementar-contador-firmas";
import { obtenerPeticionPorId } from "@/features/peticiones/repositories/obtener-peticion-por-id";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { registrarFirma } from "../repositories/registrar-firma";
import { usuarioYaFirmopeticion } from "../repositories/usuario-ya-firmo-peticion";

export async function firmarPeticion(usuarioId: string, peticionId: string) {
  const yaFirmo = await usuarioYaFirmopeticion(usuarioId, peticionId);
  if (yaFirmo) {
    throw new Error("Ya has firmado esta petición anteriormente.");
  }

  const peticion = await obtenerPeticionPorId(peticionId);
  if (!peticion) {
    throw new Error("La petición no existe.");
  }

  if (peticion.estado !== EstadoPeticion.PUBLICADA) {
    throw new Error("Solo se pueden firmar peticiones publicadas.");
  }

  return prisma.$transaction(async (tx) => {
    const firma = await registrarFirma(usuarioId, peticionId, tx);
    await incrementarContadorFirmas(peticionId, tx);
    return firma;
  });
}
