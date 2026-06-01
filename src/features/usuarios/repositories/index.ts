import "server-only";

import type { Prisma } from "@/generated/prisma/client";
import { Rol } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export type CrearUsuarioAuth0Input = {
  auth0_id: string;
  correo: string;
  nombre: string;
  nickname?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  picture?: string | null;
  email_verified?: boolean | null;
};

export type ActualizarUsuarioAuth0Input = Partial<
  Omit<CrearUsuarioAuth0Input, "auth0_id">
>;

export async function obtenerUsuarioPorAuth0Id(
  auth0Id: string,
): Promise<Usuario | null> {
  return prisma.usuario.findUnique({
    where: { auth0_id: auth0Id },
  });
}

export async function crearUsuarioAuth0(
  input: CrearUsuarioAuth0Input,
): Promise<Usuario> {
  return prisma.usuario.create({
    data: {
      auth0_id: input.auth0_id,
      correo: input.correo,
      nombre: input.nombre,
      rol: Rol.USUARIO,
      nickname: input.nickname ?? null,
      given_name: input.given_name ?? null,
      family_name: input.family_name ?? null,
      picture: input.picture ?? null,
      email_verified: input.email_verified ?? null,
    },
  });
}

export async function actualizarUsuarioPorAuth0Id(
  auth0Id: string,
  input: ActualizarUsuarioAuth0Input,
): Promise<Usuario> {
  return prisma.usuario.update({
    where: { auth0_id: auth0Id },
    data: input as Prisma.usuarioUpdateInput,
  });
}
