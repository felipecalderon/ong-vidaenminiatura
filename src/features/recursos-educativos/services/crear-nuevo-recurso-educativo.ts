import { Prisma } from "@/generated/prisma/client";
import { generarSlugUnico } from "@/lib/generar-slug-unico";
import { crearRecursoEducativo } from "../repositories/crear-recurso-educativo";
import type { CrearRecursoEducativoInput } from "../schemas/crear-recurso-educativo.schema";

export async function crearNuevoRecursoEducativo(
  autorId: string,
  input: CrearRecursoEducativoInput,
  omitirRevision: boolean,
) {
  const slug = await generarSlugUnico(input.titulo, "recursoEducativo");
  try {
    return await crearRecursoEducativo(autorId, slug, input, omitirRevision);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error(
        "Ya existe un recurso educativo con un título o slug similar. Por favor, intenta con otro título.",
      );
    }
    throw error;
  }
}
