import "server-only";
import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";
import { EstadoPeticion, Rol } from "@/generated/prisma/enums";
import { actualizarEstadoPeticion } from "../repositories/actualizar-estado-peticion";
import { obtenerPeticionPorId } from "../repositories/obtener-peticion-por-id";

export async function publicarPeticion(
  peticionId: string,
  usuario: UsuarioAutenticadoResumen,
) {
  if (!usuario.acceso.puedeAcceder) {
    throw new Error("No autorizado.");
  }

  const peticion = await obtenerPeticionPorId(peticionId);
  if (!peticion) {
    throw new Error("La petición no existe.");
  }

  // Solo un ADMINISTRADOR puede publicar una petición en la plataforma
  if (usuario.rol !== Rol.ADMINISTRADOR) {
    throw new Error(
      "Solo un administrador puede publicar peticiones en la plataforma.",
    );
  }

  await actualizarEstadoPeticion(
    peticionId,
    EstadoPeticion.PUBLICADA,
    new Date(),
  );
  return peticion;
}
