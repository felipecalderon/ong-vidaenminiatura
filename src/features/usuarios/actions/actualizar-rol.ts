"use server";

import { revalidatePath } from "next/cache";
import type { Rol } from "@/generated/prisma/enums";
import { obtenerUsuarioAutenticado } from "../queries/obtener-usuario-autenticado";
import { cambiarRolUsuario } from "../services/cambiar-rol-usuario";
import type { Usuario } from "../types";

export async function actualizarRolAction(
  usuarioId: string,
  nuevoRol: Rol,
): Promise<Usuario> {
  const operador = await obtenerUsuarioAutenticado();
  if (!operador) {
    throw new Error("No autenticado");
  }

  const result = await cambiarRolUsuario(operador.id, usuarioId, nuevoRol);
  revalidatePath("/administracion");
  return result;
}
