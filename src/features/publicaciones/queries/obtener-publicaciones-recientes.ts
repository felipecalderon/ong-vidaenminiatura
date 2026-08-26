import "server-only";
import { cache } from "react";
import { listarPublicacionesPublicadas } from "../repositories/listar-publicaciones-publicadas";

export const obtenerPublicacionesRecientes = cache(async (limit = "3") => {
  const { data } = await listarPublicacionesPublicadas({ limit });
  return data;
});
