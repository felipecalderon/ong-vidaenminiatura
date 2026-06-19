"use server";

import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { listarFirmasPorPeticion } from "../repositories/listar-firmas-por-peticion";

export type FirmaParaExportar = {
  nombre: string;
  correo: string;
  fecha_creacion: string; // ISO string — serializable para el cliente
};

export async function obtenerFirmasParaExportarAction(
  peticionId: string,
): Promise<
  | { success: true; data: FirmaParaExportar[] }
  | { success: false; error: string }
> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario?.acceso.esAdministrador) {
    return { success: false, error: "No autorizado." };
  }

  const firmas = await listarFirmasPorPeticion(peticionId);

  if (!firmas) {
    return { success: false, error: "No se pudieron obtener las firmas." };
  }

  return {
    success: true,
    data: firmas.map((f) => ({
      nombre: f.usuario.nombre,
      correo: f.usuario.correo,
      fecha_creacion: f.fecha_creacion.toISOString(),
    })),
  };
}
