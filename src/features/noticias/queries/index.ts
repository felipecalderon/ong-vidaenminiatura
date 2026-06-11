import "server-only";

import { cache } from "react";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries";
import {
  listarNoticiasPorUsuario,
  listarNoticiasPublicadas,
  listarTodasLasNoticias,
  obtenerNoticiaPorSlug,
} from "../repositories";

export const obtenerNoticiaDetallePorSlug = cache(async (slug: string) => {
  return obtenerNoticiaPorSlug(slug);
});

export const obtenerListaNoticiasPublicadas = cache(async () => {
  return listarNoticiasPublicadas();
});

export const obtenerNoticiasParaGestion = cache(async () => {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    return null;
  }

  if (usuario.rol === "ADMINISTRADOR") {
    return listarTodasLasNoticias();
  }

  return listarNoticiasPorUsuario(usuario.id);
});
