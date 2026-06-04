import "server-only";

import { cache } from "react";
import {
  listarPeticionesPublicadas,
  obtenerPeticionPorSlug,
} from "../repositories";

export const obtenerPeticionDetallePorSlug = cache(async (slug: string) => {
  return obtenerPeticionPorSlug(slug);
});

export const obtenerListaPeticionesActivas = cache(async () => {
  return listarPeticionesPublicadas();
});
