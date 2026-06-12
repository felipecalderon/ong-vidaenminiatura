"use server";

import { actualizarUsuarioPorAuth0Id } from "../repositories/actualizar-usuario-por-auth0-id";
import { obtenerUsuarioPorAuth0Id } from "../repositories/obtener-usuario-por-auth0-id";
import type { Usuario } from "../types";

export interface ActualizarPerfilInput {
  nombre: string;
  picture?: string;
}

export async function actualizarPerfil(
  auth0Id: string,
  input: ActualizarPerfilInput,
): Promise<Usuario> {
  const usuario = await obtenerUsuarioPorAuth0Id(auth0Id);
  if (!usuario) {
    throw new Error("Usuario no encontrado.");
  }

  if (usuario.estado === "SUSPENDIDO") {
    throw new Error(
      "No se puede actualizar el perfil de un usuario suspendido.",
    );
  }

  return actualizarUsuarioPorAuth0Id(auth0Id, {
    nombre: input.nombre,
    picture: input.picture !== undefined ? input.picture : usuario.picture,
  });
}
