import "server-only";

import { cache } from "react";
import { obtenerPeticionPorSlug } from "../repositories/obtener-peticion-por-slug";

export const obtenerPeticionDetallePorSlug = cache(async (slug: string) => {
  return obtenerPeticionPorSlug(slug);
});
