import "server-only";
import { EstadoUsuario, Rol } from "@/generated/prisma/enums";
import { actualizarEstadoUsuario } from "../repositories/actualizar-estado-usuario";
import { obtenerUsuarioPorId } from "../repositories/obtener-usuario-por-id";
import type { Usuario } from "../types";

export async function cambiarEstadoUsuario(
  operadorId: string,
  usuarioId: string,
  nuevoEstado: EstadoUsuario,
): Promise<Usuario> {
  const operador = await obtenerUsuarioPorId(operadorId);
  if (
    !operador ||
    operador.rol !== Rol.ADMINISTRADOR ||
    operador.estado !== EstadoUsuario.ACTIVO
  ) {
    throw new Error("No autorizado");
  }

  if (operadorId === usuarioId) {
    throw new Error("No puedes cambiar tu propio estado");
  }

  const usuario = await obtenerUsuarioPorId(usuarioId);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  return actualizarEstadoUsuario(usuarioId, nuevoEstado);
}
