import { eliminarRecursoEducativo } from "../repositories/eliminar-recurso-educativo";
import { obtenerRecursoEducativoPorId } from "../repositories/obtener-recurso-educativo-por-id";

export async function eliminarRecursoEducativoExistente(
  id: string,
  _usuarioId: string,
  rolUsuario: string,
) {
  const recurso = await obtenerRecursoEducativoPorId(id);

  if (!recurso) {
    throw new Error("El recurso educativo no existe.");
  }

  const esAdmin = rolUsuario === "ADMINISTRADOR";

  if (!esAdmin) {
    throw new Error("No tienes permisos para eliminar este recurso educativo.");
  }

  return eliminarRecursoEducativo(id);
}
