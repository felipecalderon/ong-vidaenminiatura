import { Prisma } from "@/generated/prisma/client";
import { EstadoRecursoEducativo, Rol } from "@/generated/prisma/enums";
import { generarSlugUnico } from "@/lib/generar-slug-unico";
import { actualizarRecursoEducativo } from "../repositories/actualizar-recurso-educativo";
import { obtenerRecursoEducativoPorId } from "../repositories/obtener-recurso-educativo-por-id";
import type { EditarRecursoEducativoInput } from "../schemas/editar-recurso-educativo.schema";

export async function editarRecursoEducativoExistente(
  usuarioId: string,
  rolUsuario: string,
  input: EditarRecursoEducativoInput,
) {
  const recurso = await obtenerRecursoEducativoPorId(input.id);

  if (!recurso) {
    throw new Error("El recurso educativo no existe.");
  }

  const esPropietario = recurso.autor_id === usuarioId;
  const esAdmin = rolUsuario === "ADMINISTRADOR";

  if (!esPropietario && !esAdmin) {
    throw new Error("No tienes permisos para editar este recurso educativo.");
  }

  let slug = recurso.slug;
  if (recurso.titulo !== input.titulo) {
    slug = await generarSlugUnico(input.titulo, "recursoEducativo");
  }

  // Si el rol es USUARIO, requiere volver a REVISION tras ser editado
  const nuevoEstado =
    rolUsuario === Rol.USUARIO ? EstadoRecursoEducativo.REVISION : undefined;

  try {
    return await actualizarRecursoEducativo(input.id, slug, input, nuevoEstado);
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
