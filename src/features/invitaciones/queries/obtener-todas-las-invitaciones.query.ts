import "server-only";
import { cache } from "react";
import { obtenerTodasLasInvitaciones } from "../repositories/obtener-invitaciones.repository";
import type { InvitacionConDetalle } from "../types";

export const obtenerInvitacionesParaGestion = cache(
  async (): Promise<InvitacionConDetalle[]> => {
    return obtenerTodasLasInvitaciones();
  },
);
