"use server";

import { cache } from "react";
import { auth0 } from "@/lib/auth0";
import { resolverAccesoUsuario } from "../access";
import { obtenerUsuarioPorAuth0Id } from "../repositories/obtener-usuario-por-auth0-id";
import type { UsuarioAutenticadoResumen } from "../types";

export const obtenerUsuarioAutenticado = cache(
  async (): Promise<UsuarioAutenticadoResumen | null> => {
    const session = await auth0.getSession();

    if (!session?.user?.sub) {
      return null;
    }

    const usuario = await obtenerUsuarioPorAuth0Id(session.user.sub);

    if (!usuario) {
      return null;
    }

    return {
      id: usuario.id,
      auth0Id: usuario.auth0_id,
      correo: usuario.correo,
      nombre: usuario.nombre,
      picture: usuario.picture,
      rol: usuario.rol,
      estado: usuario.estado,
      acceso: resolverAccesoUsuario(usuario),
    };
  },
);
