import "server-only";
import { prisma } from "@/lib/prisma";
import type { EditarPeticionInput } from "../schemas/editar-peticion.schema";

export async function actualizarPeticion(
  id: string,
  slug: string,
  input: Omit<EditarPeticionInput, "id">,
) {
  return prisma.peticion.update({
    where: { id },
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      meta_firmas: input.meta_firmas,
      categoria_id: input.categoriaId,
      destacado: input.destacado ?? false,
    },
  });
}
