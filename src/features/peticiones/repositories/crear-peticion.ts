import "server-only";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { CrearPeticionInput } from "../schemas/crear-peticion.schema";

export async function crearPeticion(
  usuarioId: string,
  slug: string,
  input: CrearPeticionInput,
  omitirRevision: boolean,
) {
  const estado = omitirRevision
    ? EstadoPeticion.BORRADOR
    : EstadoPeticion.REVISION;
  return prisma.peticion.create({
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      meta_firmas: input.meta_firmas,
      categoria_id: input.categoriaId,
      usuario_id: usuarioId,
      estado,
      destacado: input.destacado ?? false,
    },
  });
}
