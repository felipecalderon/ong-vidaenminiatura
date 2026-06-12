"use server";

import { cache } from "react";
import type { QueryParams } from "@/types/paginacion";
import { listarPeticionesPublicadas } from "../repositories/listar-peticiones-publicadas";

export const obtenerListaPeticionesActivas = cache(
  async (params: QueryParams = {}) => {
    return listarPeticionesPublicadas(params);
  },
);
