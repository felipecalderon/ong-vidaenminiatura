import "server-only";

import { prisma } from "@/lib/prisma";
import {
  actualizarNoticia,
  crearNoticia,
  obtenerNoticiaPorId,
} from "../repositories";
import type { CrearNoticiaInput } from "../schemas/crear-noticia.schema";
import type { EditarNoticiaInput } from "../schemas/editar-noticia.schema";

export function slugifyNoticia(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function generarSlugNoticiaUnico(titulo: string): Promise<string> {
  const slugOriginal = slugifyNoticia(titulo);
  let slug = slugOriginal;
  let iterador = 1;

  while (true) {
    const existe = await prisma.noticia.findUnique({ where: { slug } });
    if (!existe) {
      return slug;
    }
    slug = `${slugOriginal}-${iterador}`;
    iterador++;
  }
}

export async function crearNuevaNoticia(
  autorId: string,
  input: CrearNoticiaInput,
) {
  const slug = await generarSlugNoticiaUnico(input.titulo);
  return crearNoticia(autorId, slug, input);
}

export async function editarNoticiaExistente(
  usuarioId: string,
  rolUsuario: string,
  input: EditarNoticiaInput,
) {
  const noticia = await obtenerNoticiaPorId(input.id);

  if (!noticia) {
    throw new Error("La noticia no existe.");
  }

  const esPropietario = noticia.autor_id === usuarioId;
  const esAdmin = rolUsuario === "ADMINISTRADOR";

  if (!esPropietario && !esAdmin) {
    throw new Error("No tienes permisos para editar esta noticia.");
  }

  let slug = noticia.slug;
  if (noticia.titulo !== input.titulo) {
    slug = await generarSlugNoticiaUnico(input.titulo);
  }

  return actualizarNoticia(input.id, slug, input);
}
