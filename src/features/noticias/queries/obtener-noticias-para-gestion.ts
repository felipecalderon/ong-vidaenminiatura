"use server";

import { cache } from "react";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { listarNoticiasPorUsuario } from "../repositories/listar-noticias-por-usuario";
import { listarTodasLasNoticias } from "../repositories/listar-todas-las-noticias";

export const obtenerNoticiasParaGestion = cache(async () => {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    return null;
  }

  if (usuario.rol === "ADMINISTRADOR") {
    return listarTodasLasNoticias();
  }

  return listarNoticiasPorUsuario(usuario.id);
});
