import "server-only";
import { cache } from "react";
import { auth0 } from "@/lib/auth0";
import { resolverAccesoUsuario } from "../access";
import { obtenerUsuarioPorAuth0Id } from "../repositories/obtener-usuario-por-auth0-id";
import { asegurarUsuarioDesdeAuth0 } from "../services/asegurar-usuario-desde-auth0";
import type { UsuarioAutenticadoResumen } from "../types";

export const obtenerUsuarioAutenticado = cache(
  async (): Promise<UsuarioAutenticadoResumen | null> => {
    const session = await auth0.getSession();

    if (!session?.user?.sub) {
      return null;
    }

    let usuario = await obtenerUsuarioPorAuth0Id(session.user.sub);

    if (!usuario) {
      try {
        usuario = await asegurarUsuarioDesdeAuth0(session.user);
      } catch (error) {
        console.error(
          "Error al asegurar usuario desde Auth0 en consulta:",
          error,
        );
        return null;
      }
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
