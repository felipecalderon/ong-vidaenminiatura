import type { EstadoUsuario, Rol } from "@/generated/prisma/enums";
import type { usuarioModel } from "@/generated/prisma/models/usuario";

export type Usuario = usuarioModel;
export type { EstadoUsuario, Rol };

export interface AccesoUsuario {
  autenticado: true;
  puedeAcceder: boolean;
  puedeCrearContenido: boolean;
  puedeGestionarContenidoPropio: boolean;
  puedeGestionarBackoffice: boolean;
  esAutor: boolean;
  esAdministrador: boolean;
  esSuspendido: boolean;
}

export interface UsuarioAutenticadoResumen {
  id: string;
  auth0Id: string;
  correo: string;
  nombre: string;
  picture: string | null;
  rol: Rol;
  estado: EstadoUsuario;
  acceso: AccesoUsuario;
}

export interface PerfilAuth0Usuario {
  sub: string;
  email?: string | null;
  name?: string | null;
  nickname?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  picture?: string | null;
  email_verified?: boolean | null;
}
