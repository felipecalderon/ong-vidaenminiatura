"use server";

import { cache } from "react";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { listarPeticionesPorUsuario } from "../repositories/listar-peticiones-por-usuario";
import { listarTodasLasPeticiones } from "../repositories/listar-todas-las-peticiones";

export const obtenerPeticionesParaGestion = cache(async () => {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    return null;
  }

  if (usuario.rol === "ADMINISTRADOR") {
    return listarTodasLasPeticiones();
  }

  return listarPeticionesPorUsuario(usuario.id);
});
