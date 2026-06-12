"use server";

import type { EstadoUsuario } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export async function actualizarEstadoUsuario(
  id: string,
  estado: EstadoUsuario,
): Promise<Usuario> {
  return prisma.usuario.update({
    where: { id },
    data: { estado },
  });
}
