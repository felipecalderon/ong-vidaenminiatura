import { Prisma } from "@/generated/prisma/client";
import { generarSlugUnico } from "@/lib/generar-slug-unico";
import { crearPublicacion } from "../repositories/crear-publicacion";
import type { CrearPublicacionInput } from "../schemas/crear-publicacion.schema";

export async function crearNuevaPublicacion(
  autorId: string,
  input: CrearPublicacionInput,
  omitirRevision: boolean,
) {
  const slug = await generarSlugUnico(input.titulo, "publicacion");
  try {
    return await crearPublicacion(autorId, slug, input, omitirRevision);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error(
        "Ya existe una publicación con un título o slug similar. Por favor, intenta con otro título.",
      );
    }
    throw error;
  }
}
