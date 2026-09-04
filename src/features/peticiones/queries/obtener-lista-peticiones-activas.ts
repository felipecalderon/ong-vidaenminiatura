import "server-only";
import { cache } from "react";
import {
  type ListarPeticionesParams,
  listarPeticionesPublicadas,
} from "../repositories/listar-peticiones-publicadas";

export const obtenerListaPeticionesActivas = cache(
  async (params: ListarPeticionesParams = {}) => {
    return listarPeticionesPublicadas(params);
  },
);
