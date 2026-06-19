import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

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
