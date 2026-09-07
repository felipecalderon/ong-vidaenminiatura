import "server-only";
import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";
import { EstadoPeticion, Rol } from "@/generated/prisma/enums";
import { actualizarEstadoPeticion } from "../repositories/actualizar-estado-peticion";
import { obtenerPeticionPorId } from "../repositories/obtener-peticion-por-id";

export async function cambiarEstadoPeticion(
  peticionId: string,
  nuevoEstado: EstadoPeticion,
  usuario: UsuarioAutenticadoResumen,
) {
  if (!usuario.acceso.puedeGestionarContenidoPropio) {
    throw new Error("No tienes permisos para modificar peticiones.");
  }

  const peticion = await obtenerPeticionPorId(peticionId);
  if (!peticion) {
    throw new Error("La petición no existe.");
  }

  const esAdmin = usuario.rol === Rol.ADMINISTRADOR;
  const esPropia = peticion.usuario_id === usuario.id;

  if (!esPropia && !esAdmin) {
    throw new Error("No tienes permisos para modificar esta petición.");
  }

  // Si no es admin, solo se permite pasar de BORRADOR a REVISION (solicitar moderación)
  if (!esAdmin) {
    if (
      peticion.estado === EstadoPeticion.BORRADOR &&
      nuevoEstado === EstadoPeticion.REVISION
    ) {
      // Permitido: solicitar revisión
    } else {
      throw new Error(
        "Solo un administrador puede cambiar la petición a este estado.",
      );
    }
  }

  const fechaPublicacion =
    nuevoEstado === EstadoPeticion.PUBLICADA ? new Date() : null;

  return actualizarEstadoPeticion(peticionId, nuevoEstado, fechaPublicacion);
}
