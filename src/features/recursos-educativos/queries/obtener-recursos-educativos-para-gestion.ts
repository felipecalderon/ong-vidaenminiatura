import "server-only";
import { cache } from "react";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { listarRecursosEducativosPorUsuario } from "../repositories/listar-recursos-educativos-por-usuario";
import { listarTodosLosRecursosEducativos } from "../repositories/listar-todos-los-recursos-educativos";

export const obtenerRecursosEducativosParaGestion = cache(async () => {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    return null;
  }

  if (usuario.rol === "ADMINISTRADOR") {
    return listarTodosLosRecursosEducativos();
  }

  return listarRecursosEducativosPorUsuario(usuario.id);
});
