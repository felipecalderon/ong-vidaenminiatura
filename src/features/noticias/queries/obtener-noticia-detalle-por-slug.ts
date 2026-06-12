"use server";

import { cache } from "react";
import { obtenerNoticiaPorSlug } from "../repositories/obtener-noticia-por-slug";

export const obtenerNoticiaDetallePorSlug = cache(async (slug: string) => {
  return obtenerNoticiaPorSlug(slug);
});
