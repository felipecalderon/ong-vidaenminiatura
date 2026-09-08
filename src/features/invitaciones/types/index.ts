import type { EstadoInvitacion, Rol } from "@/generated/prisma/enums";
import type { invitacionModel } from "@/generated/prisma/models/invitacion";
import type { usuarioModel } from "@/generated/prisma/models/usuario";

export type Invitacion = invitacionModel;
export type { EstadoInvitacion, Rol };

export interface InvitacionConDetalle extends Invitacion {
  creada_por: Pick<usuarioModel, "id" | "nombre" | "correo" | "picture">;
  usuario_aceptado?: Pick<
    usuarioModel,
    "id" | "nombre" | "correo" | "picture"
  > | null;
}

export interface CrearInvitacionInput {
  correo: string;
  rol: Rol;
  creadaPorId: string;
}

export interface ValidacionInvitacionResultado {
  esValida: boolean;
  motivo?: "EXPIRADA" | "CANCELADA" | "YA_UTILIZADA" | "NO_ENCONTRADA";
  invitacion?: InvitacionConDetalle;
}
