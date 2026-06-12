"use server";

import { cache } from "react";
import { listarTodasLasCategorias } from "../repositories/listar-todas-las-categorias";

export const obtenerTodasLasCategorias = cache(async () => {
  return listarTodasLasCategorias();
});
