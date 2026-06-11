import "server-only";

import { cache } from "react";
import { listarPeticionesPublicadas } from "../repositories/listar-peticiones-publicadas";

export const obtenerListaPeticionesActivas = cache(async () => {
  return listarPeticionesPublicadas();
});
