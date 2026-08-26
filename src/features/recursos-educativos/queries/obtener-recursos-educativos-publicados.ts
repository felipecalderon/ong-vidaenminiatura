import "server-only";
import { cache } from "react";
import type { QueryParams } from "@/types/paginacion";
import { listarRecursosEducativosPublicados } from "../repositories/listar-recursos-educativos-publicados";

export const obtenerRecursosEducativosPublicados = cache(
  async (params: QueryParams = {}) => {
    return listarRecursosEducativosPublicados(params);
  },
);
