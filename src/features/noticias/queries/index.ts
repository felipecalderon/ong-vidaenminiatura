import "server-only";

import { cache } from "react";
import {
  listarNoticiasPublicadas,
  obtenerNoticiaPorSlug,
} from "../repositories";

export const obtenerNoticiaDetallePorSlug = cache(async (slug: string) => {
  return obtenerNoticiaPorSlug(slug);
});

export const obtenerListaNoticiasPublicadas = cache(async () => {
  return listarNoticiasPublicadas();
});
