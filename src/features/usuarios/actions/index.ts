"use server";

import { revalidatePath } from "next/cache";
import type { EstadoUsuario, Rol } from "@/generated/prisma/enums";
import { auth0 } from "@/lib/auth0";
import { obtenerUsuarioAutenticado } from "../queries";
import {
  asegurarUsuarioDesdeAuth0,
  cambiarEstadoUsuario,
  cambiarRolUsuario,
} from "../services";
import type { Usuario } from "../types";

export async function sincronizarUsuarioAutenticado(): Promise<Usuario | null> {
  const session = await auth0.getSession();

  if (!session?.user) {
    return null;
  }

  return asegurarUsuarioDesdeAuth0(session.user);
}

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
