import "server-only";
import type { EstadoUsuario } from "@/generated/prisma/enums";
import { asegurarEsAdministradorActivo } from "@/lib/asegurar-es-administrador-activo";
import { actualizarEstadoUsuario } from "../repositories/actualizar-estado-usuario";
import { obtenerUsuarioPorId } from "../repositories/obtener-usuario-por-id";
import type { Usuario } from "../types";

export async function cambiarEstadoUsuario(
  operadorId: string,
  usuarioId: string,
  nuevoEstado: EstadoUsuario,
): Promise<Usuario> {
  await asegurarEsAdministradorActivo(operadorId);

  if (operadorId === usuarioId) {
    throw new Error("No puedes cambiar tu propio estado");
  }

  const usuario = await obtenerUsuarioPorId(usuarioId);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  return actualizarEstadoUsuario(usuarioId, nuevoEstado);
}
