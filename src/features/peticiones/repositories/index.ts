import "server-only";

import type { Prisma } from "@/generated/prisma/client";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { CrearPeticionInput } from "../schemas/crear-peticion.schema";
import type { EditarPeticionInput } from "../schemas/editar-peticion.schema";

export async function obtenerPeticionPorSlug(slug: string) {
  return prisma.peticion.findUnique({
    where: { slug },
    include: {
      categoria: true,
      usuario: {
        select: {
          id: true,
          nombre: true,
          picture: true,
        },
      },
    },
  });
}

export async function obtenerPeticionPorId(id: string) {
  return prisma.peticion.findUnique({
    where: { id },
    include: {
      categoria: true,
      usuario: {
        select: {
          id: true,
          nombre: true,
          picture: true,
        },
      },
    },
  });
}

export async function listarPeticionesPublicadas() {
  return prisma.peticion.findMany({
    where: {
      estado: EstadoPeticion.PUBLICADA,
    },
    orderBy: {
      fecha_publicacion: "desc",
    },
    include: {
      categoria: true,
    },
  });
}

export async function listarTodasLasPeticiones() {
  return prisma.peticion.findMany({
    orderBy: {
      fecha_creacion: "desc",
    },
    include: {
      categoria: true,
      usuario: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
  });
}

export async function listarPeticionesPorUsuario(usuarioId: string) {
  return prisma.peticion.findMany({
    where: {
      usuario_id: usuarioId,
    },
    orderBy: {
      fecha_creacion: "desc",
    },
    include: {
      categoria: true,
    },
  });
}

export async function crearPeticion(
  usuarioId: string,
  slug: string,
  input: CrearPeticionInput,
) {
  return prisma.peticion.create({
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      meta_firmas: input.meta_firmas,
      categoria_id: input.categoriaId,
      usuario_id: usuarioId,
      estado: EstadoPeticion.BORRADOR,
    },
  });
}

export async function actualizarPeticion(
  id: string,
  slug: string,
  input: Omit<EditarPeticionInput, "id">,
) {
  return prisma.peticion.update({
    where: { id },
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      meta_firmas: input.meta_firmas,
      categoria_id: input.categoriaId,
    },
  });
}

export async function actualizarEstadoPeticion(
  id: string,
  estado: EstadoPeticion,
  fechaPublicacion?: Date | null,
) {
  return prisma.peticion.update({
    where: { id },
    data: {
      estado,
      fecha_publicacion: fechaPublicacion,
    },
  });
}

export async function incrementarContadorFirmas(
  peticionId: string,
  tx?: Prisma.TransactionClient,
) {
  const client = tx || prisma;
  return client.peticion.update({
    where: { id: peticionId },
    data: {
      cantidad_firmas: {
        increment: 1,
      },
    },
  });
}

export async function eliminarPeticion(id: string) {
  return prisma.peticion.delete({
    where: { id },
  });
}
