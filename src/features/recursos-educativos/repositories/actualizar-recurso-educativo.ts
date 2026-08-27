import "server-only";
import type { EstadoRecursoEducativo } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { EditarRecursoEducativoInput } from "../schemas/editar-recurso-educativo.schema";

export async function actualizarRecursoEducativo(
  id: string,
  slug: string,
  input: Omit<EditarRecursoEducativoInput, "id">,
  estado?: EstadoRecursoEducativo,
) {
  return prisma.recursoEducativo.update({
    where: { id },
    data: {
      titulo: input.titulo,
      slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen: input.imagen ?? null,
      video_youtube: input.videoYoutube ?? null,
      tipo: input.tipo,
      categoria_id: input.categoriaId,
      estado,
    },
  });
}
