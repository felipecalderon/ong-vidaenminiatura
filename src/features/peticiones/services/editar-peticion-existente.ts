import { actualizarPeticion } from "../repositories/actualizar-peticion";
import { obtenerPeticionPorId } from "../repositories/obtener-peticion-por-id";
import type { EditarPeticionInput } from "../schemas/editar-peticion.schema";
import { generarSlugUnico } from "./generar-slug-unico";

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

  return actualizarPeticion(input.id, slug, input);
}
