import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { obtenerTodasLasInvitaciones } from "../repositories/obtener-invitaciones.repository";
import type { InvitacionConDetalle } from "../types";

export const obtenerInvitacionesParaGestion = cache(
  async (): Promise<InvitacionConDetalle[]> => {
    const usuarioAutenticado = await obtenerUsuarioAutenticado();

    if (!usuarioAutenticado || !usuarioAutenticado.acceso.esAdministrador) {
      redirect("/");
    }

    return obtenerTodasLasInvitaciones();
  },
);
