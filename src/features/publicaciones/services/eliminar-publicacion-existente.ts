import { eliminarPublicacion } from "../repositories/eliminar-publicacion";
import { obtenerPublicacionPorId } from "../repositories/obtener-publicacion-por-id";

export async function eliminarPublicacionExistente(
  id: string,
  _usuarioId: string,
  rolUsuario: string,
) {
  const publicacion = await obtenerPublicacionPorId(id);

  if (!publicacion) {
    throw new Error("La publicación no existe.");
  }

  const esAdmin = rolUsuario === "ADMINISTRADOR";

  if (!esAdmin) {
    throw new Error("No tienes permisos para eliminar esta publicación.");
  }

  return eliminarPublicacion(id);
}
