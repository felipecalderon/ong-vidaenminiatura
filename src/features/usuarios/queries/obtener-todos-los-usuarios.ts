import "server-only";

import { cache } from "react";
import { listarUsuarios } from "../repositories/listar-usuarios";

export const obtenerTodosLosUsuarios = cache(async () => {
  return listarUsuarios();
});
