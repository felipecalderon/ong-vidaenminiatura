import { eliminarPeticion } from "../repositories/eliminar-peticion";
import { obtenerPeticionPorId } from "../repositories/obtener-peticion-por-id";

export async function eliminarPeticionExistente(
  id: string,
  usuarioId: string,
  rolUsuario: string,
) {
  const peticion = await obtenerPeticionPorId(id);

  if (!peticion) {
    throw new Error("La petición no existe.");
  }

  const esPropietario = peticion.usuario_id === usuarioId;
  const esAdmin = rolUsuario === "ADMINISTRADOR";

  if (!esPropietario && !esAdmin) {
    throw new Error("No tienes permisos para eliminar esta petición.");
  }

  return eliminarPeticion(id);
}
