import "server-only";
import type { PerfilAuth0Usuario, Usuario } from "@/features/usuarios/types";
import { EstadoInvitacion, EstadoUsuario } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { Invitacion } from "../types";
import { validarInvitacionService } from "./validar-invitacion.service";

export interface ProcesarAceptacionResultado {
  usuario: Usuario;
  invitacion: Invitacion;
}

function resolverNombre(perfil: PerfilAuth0Usuario, fallback: string): string {
  const nombre = perfil.name?.trim();
  if (nombre && nombre.length > 0) return nombre;

  const nickname = perfil.nickname?.trim();
  if (nickname && nickname.length > 0) return nickname;

  const given = perfil.given_name?.trim();
  const family = perfil.family_name?.trim();
  if (given || family) {
    return [given, family].filter(Boolean).join(" ");
  }

  return fallback;
}

export async function procesarAceptacionInvitacionService(
  token: string,
  perfil: PerfilAuth0Usuario,
): Promise<ProcesarAceptacionResultado> {
  const validacion = await validarInvitacionService(token);

  if (!validacion.esValida || !validacion.invitacion) {
    switch (validacion.motivo) {
      case "YA_UTILIZADA":
        throw new Error("Esta invitación ya ha sido aceptada previamente.");
      case "EXPIRADA":
        throw new Error(
          "Esta invitación ha expirado. Solicita una nueva a un administrador.",
        );
      case "CANCELADA":
        throw new Error(
          "Esta invitación ha sido revocada por un administrador.",
        );
      default:
        throw new Error("El enlace de invitación no es válido o ha caducado.");
    }
  }

  const invitacion = validacion.invitacion;
  const correoPerfil = perfil.email?.trim().toLowerCase();

  if (!correoPerfil) {
    throw new Error(
      "Auth0 no proporcionó un correo electrónico válido para tu sesión.",
    );
  }

  if (correoPerfil !== invitacion.correo.toLowerCase()) {
    throw new Error(
      `El correo con el que iniciaste sesión (${correoPerfil}) no coincide con el correo de la invitación (${invitacion.correo}).`,
    );
  }

  // Transacción atómica: asegurar usuario con el nuevo rol y marcar invitación como ACEPTADA
  return prisma.$transaction(async (tx) => {
    // Buscar si ya existe por auth0_id o por correo
    let usuario = await tx.usuario.findFirst({
      where: {
        OR: [{ auth0_id: perfil.sub }, { correo: correoPerfil }],
      },
    });

    if (usuario) {
      usuario = await tx.usuario.update({
        where: { id: usuario.id },
        data: {
          auth0_id: perfil.sub,
          correo: correoPerfil,
          rol: invitacion.rol,
          estado: EstadoUsuario.ACTIVO,
          nombre: usuario.nombre || resolverNombre(perfil, correoPerfil),
          picture: perfil.picture ?? usuario.picture,
          nickname: perfil.nickname ?? usuario.nickname,
          given_name: perfil.given_name ?? usuario.given_name,
          family_name: perfil.family_name ?? usuario.family_name,
          email_verified:
            typeof perfil.email_verified === "boolean"
              ? perfil.email_verified
              : usuario.email_verified,
        },
      });
    } else {
      usuario = await tx.usuario.create({
        data: {
          auth0_id: perfil.sub,
          correo: correoPerfil,
          nombre: resolverNombre(perfil, correoPerfil),
          rol: invitacion.rol,
          estado: EstadoUsuario.ACTIVO,
          picture: perfil.picture ?? null,
          nickname: perfil.nickname ?? null,
          given_name: perfil.given_name ?? null,
          family_name: perfil.family_name ?? null,
          email_verified:
            typeof perfil.email_verified === "boolean"
              ? perfil.email_verified
              : null,
        },
      });
    }

    const invitacionActualizada = await tx.invitacion.update({
      where: { id: invitacion.id },
      data: {
        estado: EstadoInvitacion.ACEPTADA,
        aceptada_at: new Date(),
        usuario_id: usuario.id,
      },
    });

    return {
      usuario,
      invitacion: invitacionActualizada,
    };
  });
}
