import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { obtenerEstadisticasAdministracionRepository } from "../repositories/obtener-estadisticas-administracion.repository";

export const obtenerEstadisticasAdministracion = cache(async () => {
  const usuarioAutenticado = await obtenerUsuarioAutenticado();

  if (!usuarioAutenticado || !usuarioAutenticado.acceso.esAdministrador) {
    redirect("/");
  }

  return obtenerEstadisticasAdministracionRepository();
});
