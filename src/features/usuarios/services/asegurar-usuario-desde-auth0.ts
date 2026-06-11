import "server-only";

import { actualizarUsuarioPorAuth0Id } from "../repositories/actualizar-usuario-por-auth0-id";
import { crearUsuarioAuth0 } from "../repositories/crear-usuario-auth0";
import { obtenerUsuarioPorAuth0Id } from "../repositories/obtener-usuario-por-auth0-id";
import type { PerfilAuth0Usuario, Usuario } from "../types";

function limpiarTexto(valor: string | null | undefined): string | null {
  if (typeof valor !== "string") {
    return null;
  }

  const normalizado = valor.trim();

  return normalizado.length > 0 ? normalizado : null;
}

function resolverNombreBase(perfil: PerfilAuth0Usuario): string | null {
  const nombreDirecto = limpiarTexto(perfil.name);
  if (nombreDirecto) {
    return nombreDirecto;
  }

  const apodo = limpiarTexto(perfil.nickname);
  if (apodo) {
    return apodo;
  }

  const partesNombre = [
    limpiarTexto(perfil.given_name),
    limpiarTexto(perfil.family_name),
  ].filter((parte): parte is string => Boolean(parte));

  if (partesNombre.length > 0) {
    return partesNombre.join("");
  }

  return null;
}

function resolverNombreParaCreacion(perfil: PerfilAuth0Usuario): string {
  return resolverNombreBase(perfil) ?? limpiarTexto(perfil.email) ?? perfil.sub;
}

function normalizarPerfil(perfil: PerfilAuth0Usuario) {
  const correo = limpiarTexto(perfil.email)?.toLowerCase();

  return {
    auth0_id: perfil.sub,
    correo,
    nombre: resolverNombreBase(perfil),
    nickname: limpiarTexto(perfil.nickname),
    given_name: limpiarTexto(perfil.given_name),
    family_name: limpiarTexto(perfil.family_name),
    picture: limpiarTexto(perfil.picture),
    email_verified:
      typeof perfil.email_verified === "boolean"
        ? perfil.email_verified
        : undefined,
  };
}

function construirActualizacion(
  usuario: Usuario,
  perfil: ReturnType<typeof normalizarPerfil>,
): Record<string, string | boolean | null> {
  const actualizacion: Record<string, string | boolean | null> = {};

  if (perfil.correo && usuario.correo !== perfil.correo) {
    actualizacion.correo = perfil.correo;
  }

  if (perfil.nombre && usuario.nombre !== perfil.nombre) {
    actualizacion.nombre = perfil.nombre;
  }

  if (perfil.nickname !== null && usuario.nickname !== perfil.nickname) {
    actualizacion.nickname = perfil.nickname;
  }

  if (perfil.given_name !== null && usuario.given_name !== perfil.given_name) {
    actualizacion.given_name = perfil.given_name;
  }

  if (
    perfil.family_name !== null &&
    usuario.family_name !== perfil.family_name
  ) {
    actualizacion.family_name = perfil.family_name;
  }

  if (perfil.picture !== null && usuario.picture !== perfil.picture) {
    actualizacion.picture = perfil.picture;
  }

  if (
    typeof perfil.email_verified === "boolean" &&
    usuario.email_verified !== perfil.email_verified
  ) {
    actualizacion.email_verified = perfil.email_verified;
  }

  return actualizacion;
}

export async function asegurarUsuarioDesdeAuth0(
  perfil: PerfilAuth0Usuario,
): Promise<Usuario> {
  const perfilNormalizado = normalizarPerfil(perfil);
  const usuarioExistente = await obtenerUsuarioPorAuth0Id(
    perfilNormalizado.auth0_id,
  );

  if (!usuarioExistente) {
    const correoParaCrear = perfilNormalizado.correo;

    if (!correoParaCrear) {
      throw new Error(
        "Auth0 no entrego un correo valido para crear el usuario autenticado.",
      );
    }

    return crearUsuarioAuth0({
      auth0_id: perfilNormalizado.auth0_id,
      correo: correoParaCrear,
      nombre: resolverNombreParaCreacion(perfil),
      nickname: perfilNormalizado.nickname,
      given_name: perfilNormalizado.given_name,
      family_name: perfilNormalizado.family_name,
      picture: perfilNormalizado.picture,
      email_verified: perfilNormalizado.email_verified,
    });
  }

  const actualizacion = construirActualizacion(
    usuarioExistente,
    perfilNormalizado,
  );

  if (Object.keys(actualizacion).length === 0) {
    return usuarioExistente;
  }

  return actualizarUsuarioPorAuth0Id(perfilNormalizado.auth0_id, actualizacion);
}
