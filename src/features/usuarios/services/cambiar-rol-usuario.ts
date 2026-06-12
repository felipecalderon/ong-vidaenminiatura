"use server";

import { EstadoUsuario, Rol } from "@/generated/prisma/enums";
import { actualizarRolUsuario } from "../repositories/actualizar-rol-usuario";
import { obtenerUsuarioPorId } from "../repositories/obtener-usuario-por-id";
import type { Usuario } from "../types";

export async function cambiarRolUsuario(
  operadorId: string,
  usuarioId: string,
  nuevoRol: Rol,
): Promise<Usuario> {
  const operador = await obtenerUsuarioPorId(operadorId);
  if (
    !operador ||
    operador.rol !== Rol.ADMINISTRADOR ||
    operador.estado !== EstadoUsuario.ACTIVO
  ) {
    throw new Error("No autorizado");
  }

  const usuario = await obtenerUsuarioPorId(usuarioId);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  return actualizarRolUsuario(usuarioId, nuevoRol);
}
