"use server";

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
