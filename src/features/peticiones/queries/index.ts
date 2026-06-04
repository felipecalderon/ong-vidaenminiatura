import "server-only";

import { cache } from "react";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries";
import {
  listarPeticionesPorUsuario,
  listarPeticionesPublicadas,
  listarTodasLasPeticiones,
  obtenerPeticionPorSlug,
} from "../repositories";

export const obtenerPeticionDetallePorSlug = cache(async (slug: string) => {
  return obtenerPeticionPorSlug(slug);
});

export const obtenerListaPeticionesActivas = cache(async () => {
  return listarPeticionesPublicadas();
});

export const obtenerPeticionesParaGestion = cache(async () => {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    return null;
  }

  if (usuario.rol === "ADMINISTRADOR") {
    return listarTodasLasPeticiones();
  }

  return listarPeticionesPorUsuario(usuario.id);
});
