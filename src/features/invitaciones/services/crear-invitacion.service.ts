import "server-only";
import { EstadoInvitacion, type Rol } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { actualizarInvitacion } from "../repositories/actualizar-invitacion.repository";
import { crearInvitacion } from "../repositories/crear-invitacion.repository";
import { obtenerInvitacionPendientePorCorreo } from "../repositories/obtener-invitacion-pendiente-por-correo.repository";
import type { Invitacion } from "../types";
import { enviarEmailInvitacionService } from "./enviar-email-invitacion.service";
import { generarTokenInvitacion } from "./tokens";

export interface CrearInvitacionParams {
  correo: string;
  rol: Rol;
  adminId: string;
  adminNombre: string;
}

export interface CrearInvitacionResultado {
  exito: boolean;
  mensaje: string;
  invitacion?: Invitacion;
}

export async function crearInvitacionService(
  params: CrearInvitacionParams,
): Promise<CrearInvitacionResultado> {
  const correoNormalizado = params.correo.trim().toLowerCase();

  // 1. Verificar si el usuario ya existe en el sistema
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { correo: correoNormalizado },
  });

  if (usuarioExistente && usuarioExistente.rol === params.rol) {
    return {
      exito: false,
      mensaje: `El usuario con correo ${correoNormalizado} ya existe y ya tiene asignado el rol ${params.rol}.`,
    };
  }

  // 2. Si ya hay una invitación pendiente para ese correo, cancelarla para reemplazarla con la nueva
  const invitacionPendiente =
    await obtenerInvitacionPendientePorCorreo(correoNormalizado);
  if (invitacionPendiente) {
    await actualizarInvitacion(invitacionPendiente.id, {
      estado: EstadoInvitacion.CANCELADA,
      cancelada_at: new Date(),
    });
  }

  // 3. Generar token criptográfico
  const { token, tokenHash } = generarTokenInvitacion();
  const expiraAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días de vigencia

  // 4. Guardar en base de datos
  const nuevaInvitacion = await crearInvitacion({
    correo: correoNormalizado,
    rol: params.rol,
    tokenHash,
    expiraAt,
    creadaPorId: params.adminId,
  });

  // 5. Construir URL para el enlace
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_URL ||
    "http://localhost:3000";
  const urlInvitacion = `${baseUrl.replace(/\/$/, "")}/invitacion/${token}`;

  // 6. Enviar correo vía Resend
  const envio = await enviarEmailInvitacionService({
    correo: correoNormalizado,
    rol: params.rol,
    urlInvitacion,
    invitadoPorNombre: params.adminNombre,
  });

  if (!envio.success) {
    console.warn(
      `[Invitaciones] Invitación creada pero el correo no pudo enviarse: ${envio.error}`,
    );
  }

  return {
    exito: true,
    mensaje: "Invitación enviada exitosamente.",
    invitacion: nuevaInvitacion,
  };
}
