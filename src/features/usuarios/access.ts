import { EstadoUsuario, Rol } from "@/generated/prisma/enums";
import type { AccesoUsuario, Usuario } from "./types";

export function resolverAccesoUsuario(
  usuario: Pick<Usuario, "rol" | "estado">,
): AccesoUsuario {
  const esSuspendido = usuario.estado === EstadoUsuario.SUSPENDIDO;
  const esAdministrador = usuario.rol === Rol.ADMINISTRADOR;
  const esAutor =
    usuario.rol === Rol.AUTOR || usuario.rol === Rol.USUARIO || esAdministrador;

  // Solo AUTOR y ADMINISTRADOR omiten la cola de moderación
  const omitirRevision = usuario.rol === Rol.AUTOR || esAdministrador;

  return {
    autenticado: true,
    puedeAcceder: !esSuspendido,
    puedeCrearContenido: !esSuspendido && esAutor,
    puedeGestionarContenidoPropio: !esSuspendido && esAutor,
    puedeGestionarBackoffice: !esSuspendido && esAdministrador,
    esAutor,
    esAdministrador,
    esSuspendido,
    omitirRevision,
  };
}

export function puedeAccederUsuario(usuario: Pick<Usuario, "estado">): boolean {
  return usuario.estado !== EstadoUsuario.SUSPENDIDO;
}
