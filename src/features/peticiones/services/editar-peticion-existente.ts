import { Prisma } from "@/generated/prisma/client";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { generarSlugUnico } from "@/lib/generar-slug-unico";
import { actualizarPeticion } from "../repositories/actualizar-peticion";
import { obtenerPeticionPorId } from "../repositories/obtener-peticion-por-id";
import type { EditarPeticionInput } from "../schemas/editar-peticion.schema";

export async function editarPeticionExistente(
  usuarioId: string,
  rolUsuario: string,
  input: EditarPeticionInput,
) {
  const peticion = await obtenerPeticionPorId(input.id);

  if (!peticion) {
    throw new Error("La petición no existe.");
  }

  const esPropietario = peticion.usuario_id === usuarioId;
  const esAdmin = rolUsuario === "ADMINISTRADOR";

  if (!esPropietario && !esAdmin) {
    throw new Error("No tienes permisos para editar esta petición.");
  }

  let slug = peticion.slug;
  if (peticion.titulo !== input.titulo) {
    slug = await generarSlugUnico(input.titulo);
  }

  // Si el rol es USUARIO, requiere volver a REVISION tras ser editada
  const nuevoEstado =
    rolUsuario === "USUARIO" ? EstadoPeticion.REVISION : undefined;

  try {
    return await actualizarPeticion(input.id, slug, input, nuevoEstado);
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
