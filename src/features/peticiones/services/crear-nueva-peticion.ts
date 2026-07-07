import { Prisma } from "@/generated/prisma/client";
import { generarSlugUnico } from "@/lib/generar-slug-unico";
import { crearPeticion } from "../repositories/crear-peticion";
import type { CrearPeticionInput } from "../schemas/crear-peticion.schema";

export async function crearNuevaPeticion(
  usuarioId: string,
  input: CrearPeticionInput,
  omitirRevision: boolean,
) {
  const slug = await generarSlugUnico(input.titulo);
  try {
    return await crearPeticion(usuarioId, slug, input, omitirRevision);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error(
        "Ya existe una petición con un título o slug similar. Por favor, intenta con otro título.",
      );
    }
    throw error;
  }
}
