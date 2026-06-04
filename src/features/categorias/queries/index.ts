import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { listarTodasLasCategorias } from "../repositories";

export const obtenerCategoriasActivas = cache(async () => {
  return prisma.categoria.findMany({
    where: {
      activo: true,
    },
    orderBy: {
      nombre: "asc",
    },
  });
});

export const obtenerTodasLasCategorias = cache(async () => {
  return listarTodasLasCategorias();
});
