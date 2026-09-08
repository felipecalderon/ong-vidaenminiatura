import "server-only";
import { incrementarContadorFirmas } from "@/features/peticiones/repositories/incrementar-contador-firmas";
import { obtenerPeticionPorId } from "@/features/peticiones/repositories/obtener-peticion-por-id";
import { Prisma } from "@/generated/prisma/client";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { registrarFirma } from "../repositories/registrar-firma";
import { correoYaFirmoPeticion } from "../repositories/usuario-ya-firmo-peticion";

export interface FirmarPeticionParams {
  peticionId: string;
  nombre: string;
  correo: string;
  usuarioId?: string | null;
}

export async function firmarPeticion({
  peticionId,
  nombre,
  correo,
  usuarioId,
}: FirmarPeticionParams) {
  const correoNormalizado = correo.trim().toLowerCase();
  const nombreLimpio = nombre.trim();

  const yaFirmo = await correoYaFirmoPeticion(correoNormalizado, peticionId);
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

  try {
    return await prisma.$transaction(async (tx) => {
      const firma = await registrarFirma(
        {
          peticionId,
          nombre: nombreLimpio,
          correo: correoNormalizado,
          usuarioId: usuarioId ?? null,
        },
        tx,
      );
      await incrementarContadorFirmas(peticionId, tx);
      return firma;
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Ya has firmado esta petición anteriormente.");
    }
    throw error;
  }
}
