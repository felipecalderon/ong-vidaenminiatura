"use server";

import { revalidatePath } from "next/cache";
import type { EstadoUsuario } from "@/generated/prisma/enums";
import { obtenerUsuarioAutenticado } from "../queries/obtener-usuario-autenticado";
import { cambiarEstadoUsuario } from "../services/cambiar-estado-usuario";
import type { Usuario } from "../types";

export async function cambiarEstadoUsuarioAction(
  usuarioId: string,
  nuevoEstado: EstadoUsuario,
): Promise<Usuario> {
  const operador = await obtenerUsuarioAutenticado();
  if (!operador) {
    throw new Error("No autenticado");
  }

  const result = await cambiarEstadoUsuario(
    operador.id,
    usuarioId,
    nuevoEstado,
  );
  revalidatePath("/administracion");
  return result;
}
