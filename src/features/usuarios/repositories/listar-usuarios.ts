"use server";

import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export async function listarUsuarios(): Promise<Usuario[]> {
  return prisma.usuario.findMany({
    orderBy: {
      fecha_creacion: "desc",
    },
  });
}
