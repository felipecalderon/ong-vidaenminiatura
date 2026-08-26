import "server-only";
import { cache } from "react";
import type { QueryParams } from "@/types/paginacion";
import { listarPublicacionesPublicadas } from "../repositories/listar-publicaciones-publicadas";

export const obtenerPublicacionesPublicadas = cache(
  async (params: QueryParams = {}) => {
    return listarPublicacionesPublicadas(params);
  },
);
