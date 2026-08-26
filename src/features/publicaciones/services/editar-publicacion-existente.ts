import { Prisma } from "@/generated/prisma/client";
import { EstadoPublicacion, Rol } from "@/generated/prisma/enums";
import { generarSlugUnico } from "@/lib/generar-slug-unico";
import { actualizarPublicacion } from "../repositories/actualizar-publicacion";
import { obtenerPublicacionPorId } from "../repositories/obtener-publicacion-por-id";
import type { EditarPublicacionInput } from "../schemas/editar-publicacion.schema";

export async function editarPublicacionExistente(
  usuarioId: string,
  rolUsuario: string,
  input: EditarPublicacionInput,
) {
  const publicacion = await obtenerPublicacionPorId(input.id);

  if (!publicacion) {
    throw new Error("La publicación no existe.");
  }

  const esPropietario = publicacion.autor_id === usuarioId;
  const esAdmin = rolUsuario === "ADMINISTRADOR";

  if (!esPropietario && !esAdmin) {
    throw new Error("No tienes permisos para editar esta publicación.");
  }

  let slug = publicacion.slug;
  if (publicacion.titulo !== input.titulo) {
    slug = await generarSlugUnico(input.titulo, "publicacion");
  }

  // Si el rol es USUARIO, requiere volver a REVISION tras ser editada
  const nuevoEstado =
    rolUsuario === Rol.USUARIO ? EstadoPublicacion.REVISION : undefined;

  try {
    return await actualizarPublicacion(input.id, slug, input, nuevoEstado);
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
