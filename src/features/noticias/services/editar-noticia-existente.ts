import { actualizarNoticia } from "../repositories/actualizar-noticia";
import { obtenerNoticiaPorId } from "../repositories/obtener-noticia-por-id";
import type { EditarNoticiaInput } from "../schemas/editar-noticia.schema";
import { generarSlugNoticiaUnico } from "./generar-slug-noticia-unico";

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
