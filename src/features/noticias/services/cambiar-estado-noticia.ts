import "server-only";
import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";
import { EstadoNoticia, Rol } from "@/generated/prisma/enums";
import { actualizarEstadoNoticia } from "../repositories/actualizar-estado-noticia";
import { obtenerNoticiaPorId } from "../repositories/obtener-noticia-por-id";

export async function cambiarEstadoNoticia(
  noticiaId: string,
  nuevoEstado: EstadoNoticia,
  usuario: UsuarioAutenticadoResumen,
) {
  if (!usuario.acceso.puedeCrearContenido) {
    throw new Error("No tienes permisos para gestionar noticias.");
  }

  const noticia = await obtenerNoticiaPorId(noticiaId);
  if (!noticia) {
    throw new Error("La noticia no existe.");
  }

  const esAdmin = usuario.rol === Rol.ADMINISTRADOR;
  const esPropia = noticia.autor_id === usuario.id;

  if (!esPropia && !esAdmin) {
    throw new Error("No tienes permisos para modificar esta noticia.");
  }

  // Solo el ADMINISTRADOR puede aprobar contenido en cola de revisión
  if (noticia.estado === EstadoNoticia.REVISION && !esAdmin) {
    throw new Error(
      "Solo un administrador puede aprobar o rechazar contenido en revisión.",
    );
  }

  const fechaPublicacion =
    nuevoEstado === EstadoNoticia.PUBLICADA ? new Date() : null;

  return actualizarEstadoNoticia(noticiaId, nuevoEstado, fechaPublicacion);
}
