import { crearNoticia } from "../repositories/crear-noticia";
import type { CrearNoticiaInput } from "../schemas/crear-noticia.schema";
import { generarSlugNoticiaUnico } from "./generar-slug-noticia-unico";

export async function crearNuevaNoticia(
  autorId: string,
  input: CrearNoticiaInput,
) {
  const slug = await generarSlugNoticiaUnico(input.titulo);
  return crearNoticia(autorId, slug, input);
}
