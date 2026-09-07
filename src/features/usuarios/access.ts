import { EstadoUsuario, Rol } from "@/generated/prisma/enums";
import type { AccesoUsuario, Usuario } from "./types";

export function resolverAccesoUsuario(
  usuario: Pick<Usuario, "rol" | "estado">,
): AccesoUsuario {
  const esSuspendido = usuario.estado === EstadoUsuario.SUSPENDIDO;
  const esAdministrador = usuario.rol === Rol.ADMINISTRADOR;
  const esAutor = usuario.rol === Rol.AUTOR || esAdministrador;

  // Solo AUTOR y ADMINISTRADOR omiten la cola de moderación
  const omitirRevision = esAutor;

  return {
    autenticado: true,
    puedeAcceder: !esSuspendido,
    puedeCrearContenido: !esSuspendido && esAutor,
    puedeCrearPeticiones: !esSuspendido,
    puedeGestionarContenidoPropio: !esSuspendido,
    puedeGestionarBackoffice: !esSuspendido && esAdministrador,
    esAutor,
    esAdministrador,
    esSuspendido,
    omitirRevision,
  };
}
