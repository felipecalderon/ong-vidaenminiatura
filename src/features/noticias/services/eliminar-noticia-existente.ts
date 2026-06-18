import { eliminarNoticia } from "../repositories/eliminar-noticia";
import { obtenerNoticiaPorId } from "../repositories/obtener-noticia-por-id";

export async function eliminarNoticiaExistente(
  id: string,
  usuarioId: string,
  rolUsuario: string,
) {
  const noticia = await obtenerNoticiaPorId(id);

  if (!noticia) {
    throw new Error("La noticia no existe.");
  }

  const esAutor = noticia.autor_id === usuarioId;
  const esAdmin = rolUsuario === "ADMINISTRADOR";

  if (!esAutor && !esAdmin) {
    throw new Error("No tienes permisos para eliminar esta noticia.");
  }

  return eliminarNoticia(id);
}
