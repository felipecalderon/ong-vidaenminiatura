"use server";

import { cache } from "react";
import type { QueryParams } from "@/types/paginacion";
import { listarNoticiasPublicadas } from "../repositories/listar-noticias-publicadas";

export const obtenerListaNoticiasPublicadas = cache(
  async (params: QueryParams = {}) => {
    return listarNoticiasPublicadas(params);
  },
);
