import { Prisma } from "@/generated/prisma/client";
import { EstadoNoticia, Rol } from "@/generated/prisma/enums";
import { generarSlugUnico } from "@/lib/generar-slug-unico";
import { actualizarNoticia } from "../repositories/actualizar-noticia";
import { obtenerNoticiaPorId } from "../repositories/obtener-noticia-por-id";
import type { EditarNoticiaInput } from "../schemas/editar-noticia.schema";

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
    slug = await generarSlugUnico(input.titulo, "noticia");
  }

  // Si el rol es USUARIO, requiere volver a REVISION tras ser editada
  const nuevoEstado =
    rolUsuario === Rol.USUARIO ? EstadoNoticia.REVISION : undefined;

  try {
    return await actualizarNoticia(input.id, slug, input, nuevoEstado);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error(
        "Ya existe una noticia con un título o slug similar. Por favor, intenta con otro título.",
      );
    }
    throw error;
  }
}
