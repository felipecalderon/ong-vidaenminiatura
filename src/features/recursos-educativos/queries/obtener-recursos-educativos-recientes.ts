import "server-only";
import { cache } from "react";
import { listarRecursosEducativosPublicados } from "../repositories/listar-recursos-educativos-publicados";

export const obtenerRecursosEducativosRecientes = cache(async (limit = "3") => {
  const { data } = await listarRecursosEducativosPublicados({ limit });
  return data;
});
