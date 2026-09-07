import "server-only";
import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";
import { EstadoRecursoEducativo, Rol } from "@/generated/prisma/enums";
import { actualizarEstadoRecursoEducativo } from "../repositories/actualizar-estado-recurso-educativo";
import { obtenerRecursoEducativoPorId } from "../repositories/obtener-recurso-educativo-por-id";

export async function cambiarEstadoRecursoEducativo(
  recursoId: string,
  nuevoEstado: EstadoRecursoEducativo,
  usuario: UsuarioAutenticadoResumen,
) {
  if (!usuario.acceso.puedeCrearContenido) {
    throw new Error("No tienes permisos para gestionar recursos educativos.");
  }

  const recurso = await obtenerRecursoEducativoPorId(recursoId);
  if (!recurso) {
    throw new Error("El recurso educativo no existe.");
  }

  const esAdmin = usuario.rol === Rol.ADMINISTRADOR;
  const esPropia = recurso.autor_id === usuario.id;

  if (!esPropia && !esAdmin) {
    throw new Error(
      "No tienes permisos para modificar este recurso educativo.",
    );
  }

  // Solo el ADMINISTRADOR puede aprobar contenido en cola de revisión
  if (recurso.estado === EstadoRecursoEducativo.REVISION && !esAdmin) {
    throw new Error(
      "Solo un administrador puede aprobar o rechazar contenido en revisión.",
    );
  }

  const fechaPublicacion =
    nuevoEstado === EstadoRecursoEducativo.PUBLICADA ? new Date() : null;

  return actualizarEstadoRecursoEducativo(
    recursoId,
    nuevoEstado,
    fechaPublicacion,
  );
}
