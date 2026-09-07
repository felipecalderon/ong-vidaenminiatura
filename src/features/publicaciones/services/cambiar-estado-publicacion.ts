import "server-only";
import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";
import { EstadoPublicacion, Rol } from "@/generated/prisma/enums";
import { actualizarEstadoPublicacion } from "../repositories/actualizar-estado-publicacion";
import { obtenerPublicacionPorId } from "../repositories/obtener-publicacion-por-id";

export async function cambiarEstadoPublicacion(
  publicacionId: string,
  nuevoEstado: EstadoPublicacion,
  usuario: UsuarioAutenticadoResumen,
) {
  if (!usuario.acceso.puedeCrearContenido) {
    throw new Error("No tienes permisos para gestionar publicaciones.");
  }

  const publicacion = await obtenerPublicacionPorId(publicacionId);
  if (!publicacion) {
    throw new Error("La publicación no existe.");
  }

  const esAdmin = usuario.rol === Rol.ADMINISTRADOR;
  const esPropia = publicacion.autor_id === usuario.id;

  if (!esPropia && !esAdmin) {
    throw new Error("No tienes permisos para modificar esta publicación.");
  }

  // Solo el ADMINISTRADOR puede aprobar contenido en cola de revisión
  if (publicacion.estado === EstadoPublicacion.REVISION && !esAdmin) {
    throw new Error(
      "Solo un administrador puede aprobar o rechazar contenido en revisión.",
    );
  }

  const fechaPublicacion =
    nuevoEstado === EstadoPublicacion.PUBLICADA ? new Date() : null;

  return actualizarEstadoPublicacion(
    publicacionId,
    nuevoEstado,
    fechaPublicacion,
  );
}
