import "server-only";
import type { Rol } from "@/generated/prisma/enums";
import { asegurarEsAdministradorActivo } from "@/lib/asegurar-es-administrador-activo";
import { actualizarRolUsuario } from "../repositories/actualizar-rol-usuario";
import { obtenerUsuarioPorId } from "../repositories/obtener-usuario-por-id";
import type { Usuario } from "../types";

export async function cambiarRolUsuario(
  operadorId: string,
  usuarioId: string,
  nuevoRol: Rol,
): Promise<Usuario> {
  await asegurarEsAdministradorActivo(operadorId);

  const usuario = await obtenerUsuarioPorId(usuarioId);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  return actualizarRolUsuario(usuarioId, nuevoRol);
}
