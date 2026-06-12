"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export type ActualizarUsuarioAuth0Input = Partial<
  Omit<import("./crear-usuario-auth0").CrearUsuarioAuth0Input, "auth0_id">
>;

export async function actualizarUsuarioPorAuth0Id(
  auth0Id: string,
  input: ActualizarUsuarioAuth0Input,
): Promise<Usuario> {
  return prisma.usuario.update({
    where: { auth0_id: auth0Id },
    data: input as Prisma.usuarioUpdateInput,
  });
}
