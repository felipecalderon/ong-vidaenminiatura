import "server-only";
import { cache } from "react";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { listarPublicacionesPorUsuario } from "../repositories/listar-publicaciones-por-usuario";
import { listarTodasLasPublicaciones } from "../repositories/listar-todas-las-publicaciones";

export const obtenerPublicacionesParaGestion = cache(async () => {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    return null;
  }

  if (usuario.rol === "ADMINISTRADOR") {
    return listarTodasLasPublicaciones();
  }

  return listarPublicacionesPorUsuario(usuario.id);
});
