import "server-only";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { listarFirmasPorPeticion } from "../repositories/listar-firmas-por-peticion";

export async function obtenerFirmasDePeticion(peticionId: string) {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.esAdministrador) {
    return null;
  }

  return listarFirmasPorPeticion(peticionId);
}
