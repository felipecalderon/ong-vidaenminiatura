import "server-only";

import { EstadoNoticia } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { CrearNoticiaInput } from "../schemas/crear-noticia.schema";
import type { EditarNoticiaInput } from "../schemas/editar-noticia.schema";

export async function obtenerNoticiaPorSlug(slug: string) {
  return prisma.noticia.findUnique({
    where: { slug },
    include: {
      categoria: true,
      autor: {
        select: {
          id: true,
          nombre: true,
          picture: true,
        },
      },
    },
  });
}

export async function obtenerNoticiaPorId(id: string) {
  return prisma.noticia.findUnique({
    where: { id },
    include: {
      categoria: true,
      autor: {
        select: {
          id: true,
          nombre: true,
          picture: true,
        },
      },
    },
  });
}

export async function listarNoticiasPublicadas() {
  return prisma.noticia.findMany({
    where: {
      estado: EstadoNoticia.PUBLICADA,
    },
    orderBy: {
      fecha_publicacion: "desc",
    },
    include: {
      categoria: true,
      autor: {
        select: {
          id: true,
          nombre: true,
          picture: true,
        },
      },
    },
  });
}

export async function listarTodasLasNoticias() {
  return prisma.noticia.findMany({
    orderBy: {
      fecha_creacion: "desc",
    },
    include: {
      categoria: true,
      autor: {
        select: {
          id: true,
          nombre: true,
          picture: true,
        },
      },
    },
  });
}

export async function listarNoticiasPorUsuario(usuarioId: string) {
  return prisma.noticia.findMany({
    where: {
      autor_id: usuarioId,
    },
    orderBy: {
      fecha_creacion: "desc",
    },
    include: {
      categoria: true,
    },
  });
}

export async function crearNoticia(
  autorId: string,
  slug: string,
  input: CrearNoticiaInput,
) {
  return prisma.noticia.create({
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      categoria_id: input.categoriaId,
      autor_id: autorId,
      estado: EstadoNoticia.BORRADOR,
    },
  });
}

export async function actualizarNoticia(
  id: string,
  slug: string,
  input: Omit<EditarNoticiaInput, "id">,
) {
  return prisma.noticia.update({
    where: { id },
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      categoria_id: input.categoriaId,
    },
  });
}

export async function actualizarEstadoNoticia(
  id: string,
  estado: EstadoNoticia,
  fechaPublicacion?: Date | null,
) {
  return prisma.noticia.update({
    where: { id },
    data: {
      estado,
      fecha_publicacion: fechaPublicacion,
    },
  });
}
