import "server-only";

import { prisma } from "@/lib/prisma";
import {
  actualizarPeticion,
  crearPeticion,
  obtenerPeticionPorId,
} from "../repositories";
import type { CrearPeticionInput } from "../schemas/crear-peticion.schema";
import type { EditarPeticionInput } from "../schemas/editar-peticion.schema";

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-") // Collapse dashes
    .trim();
}

export async function generarSlugUnico(
  titulo: string,
  modelName: "peticion" | "noticia" = "peticion",
): Promise<string> {
  const slugOriginal = slugify(titulo);
  let slug = slugOriginal;
  let iterador = 1;

  while (true) {
    let existe = false;
    if (modelName === "peticion") {
      const p = await prisma.peticion.findUnique({ where: { slug } });
      existe = !!p;
    } else {
      const n = await prisma.noticia.findUnique({ where: { slug } });
      existe = !!n;
    }

    if (!existe) {
      return slug;
    }

    slug = `${slugOriginal}-${iterador}`;
    iterador++;
  }
}

export async function crearNuevaPeticion(
  usuarioId: string,
  input: CrearPeticionInput,
) {
  const slug = await generarSlugUnico(input.titulo);
  return crearPeticion(usuarioId, slug, input);
}

export async function editarPeticionExistente(
  usuarioId: string,
  rolUsuario: string,
  input: EditarPeticionInput,
) {
  const peticion = await obtenerPeticionPorId(input.id);

  if (!peticion) {
    throw new Error("La petición no existe.");
  }

  // Verificar propiedad o privilegios de administrador
  const esPropietario = peticion.usuario_id === usuarioId;
  const esAdmin = rolUsuario === "ADMINISTRADOR";

  if (!esPropietario && !esAdmin) {
    throw new Error("No tienes permisos para editar esta petición.");
  }

  let slug = peticion.slug;
  if (peticion.titulo !== input.titulo) {
    slug = await generarSlugUnico(input.titulo);
  }

  return actualizarPeticion(input.id, slug, input);
}
