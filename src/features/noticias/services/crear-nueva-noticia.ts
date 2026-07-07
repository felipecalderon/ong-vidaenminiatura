import { Prisma } from "@/generated/prisma/client";
import { generarSlugUnico } from "@/lib/generar-slug-unico";
import { crearNoticia } from "../repositories/crear-noticia";
import type { CrearNoticiaInput } from "../schemas/crear-noticia.schema";

export async function crearNuevaNoticia(
  autorId: string,
  input: CrearNoticiaInput,
  omitirRevision: boolean,
) {
  const slug = await generarSlugUnico(input.titulo, "noticia");
  try {
    return await crearNoticia(autorId, slug, input, omitirRevision);
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
