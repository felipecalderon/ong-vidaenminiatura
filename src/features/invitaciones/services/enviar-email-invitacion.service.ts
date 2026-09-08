import "server-only";
import { InvitacionUsuarioEmail } from "@/emails/invitacion-usuario";
import type { Rol } from "@/generated/prisma/enums";
import { EMAIL_FROM, resend } from "@/lib/resend";

export interface EnviarEmailInvitacionParams {
  correo: string;
  rol: Rol;
  urlInvitacion: string;
  invitadoPorNombre: string;
}

export async function enviarEmailInvitacionService(
  params: EnviarEmailInvitacionParams,
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!resend) {
    console.warn(
      "[Invitaciones] RESEND_API_KEY no configurada. Se omite el envío de correo real. URL de invitación generada:",
      params.urlInvitacion,
    );
    return { success: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [params.correo],
      subject: `Invitación a colaborar en Fundación Más Insectos`,
      react: InvitacionUsuarioEmail({
        correo: params.correo,
        rol: params.rol,
        urlInvitacion: params.urlInvitacion,
        invitadoPorNombre: params.invitadoPorNombre,
      }),
    });

    if (error) {
      console.error("[Invitaciones] Error devuelto por Resend:", error);
      return { success: false, error: error.message };
    }

    console.log("[Invitaciones] Correo enviado exitosamente con ID:", data?.id);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[Invitaciones] Excepción al enviar correo con Resend:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Error desconocido al enviar correo",
    };
  }
}
