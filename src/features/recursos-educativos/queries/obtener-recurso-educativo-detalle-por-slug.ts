import "server-only";
import { cache } from "react";
import { obtenerRecursoEducativoPorSlug } from "../repositories/obtener-recurso-educativo-por-slug";

export const obtenerRecursoEducativoDetallePorSlug = cache(
  async (slug: string) => {
    return obtenerRecursoEducativoPorSlug(slug);
  },
);
