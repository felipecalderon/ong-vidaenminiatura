import "server-only";
import type { Rol } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export async function actualizarRolUsuario(
  id: string,
  rol: Rol,
): Promise<Usuario> {
  return prisma.usuario.update({
    where: { id },
    data: { rol },
  });
}
