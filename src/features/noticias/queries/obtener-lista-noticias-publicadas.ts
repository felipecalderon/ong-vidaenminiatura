import "server-only";

import { cache } from "react";
import { listarNoticiasPublicadas } from "../repositories/listar-noticias-publicadas";

export const obtenerListaNoticiasPublicadas = cache(async () => {
  return listarNoticiasPublicadas();
});
