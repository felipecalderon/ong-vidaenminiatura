import "server-only";
import { cache } from "react";
import { obtenerPublicacionPorSlug } from "../repositories/obtener-publicacion-por-slug";

export const obtenerPublicacionDetallePorSlug = cache(async (slug: string) => {
  return obtenerPublicacionPorSlug(slug);
});
