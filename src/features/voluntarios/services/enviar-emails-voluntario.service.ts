import "server-only";
import { VoluntarioConfirmacionEmail } from "@/emails/voluntario-confirmacion";
import { VoluntarioNotificacionAdminEmail } from "@/emails/voluntario-notificacion-admin";
import { EMAIL_FROM, EMAIL_OFICIAL_ONG, resend } from "@/lib/resend";

export interface VoluntarioEmailData {
  nombre: string;
  correo: string;
  telefono?: string | null;
  ciudad?: string | null;
  profesion_ocupacion?: string | null;
  disponibilidad?: string | null;
  areas_interes: string[];
  motivacion: string;
  fecha_creacion?: Date;
}

export async function enviarEmailsVoluntarioService(
  voluntario: VoluntarioEmailData,
) {
  if (!resend) {
    console.warn(
      "[Emails Voluntariado] RESEND_API_KEY no está configurada en las variables de entorno. Se omite el envío real.",
    );
    return;
  }

  const fechaFormateada = (
    voluntario.fecha_creacion || new Date()
  ).toLocaleString("es-CL", {
    timeZone: "America/Santiago",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const envios = [
    // 1. Correo de confirmación y bienvenida al postulante
    resend.emails.send({
      from: EMAIL_FROM,
      to: [voluntario.correo],
      subject:
        "¡Recibimos tu postulación a la Red de Voluntariado! — Fundación Más Insectos",
      react: VoluntarioConfirmacionEmail({
        nombre: voluntario.nombre,
        areasInteres: voluntario.areas_interes,
      }),
    }),

    // 2. Correo de notificación interna a la directiva/administración de la ONG
    resend.emails.send({
      from: EMAIL_FROM,
      to: [EMAIL_OFICIAL_ONG],
      subject: `[Nuevo Voluntario] ${voluntario.nombre} - ${voluntario.ciudad || "Sin ciudad"}`,
      react: VoluntarioNotificacionAdminEmail({
        nombre: voluntario.nombre,
        correo: voluntario.correo,
        telefono: voluntario.telefono,
        ciudad: voluntario.ciudad,
        profesionOcupacion: voluntario.profesion_ocupacion,
        disponibilidad: voluntario.disponibilidad,
        areasInteres: voluntario.areas_interes,
        motivacion: voluntario.motivacion,
        fechaCreacion: fechaFormateada,
      }),
    }),
  ];

  const resultados = await Promise.allSettled(envios);

  resultados.forEach((res, idx) => {
    const destino =
      idx === 0
        ? `postulante (${voluntario.correo})`
        : `ONG (${EMAIL_OFICIAL_ONG})`;
    if (res.status === "fulfilled") {
      if (res.value.error) {
        console.error(
          `[Emails Voluntariado] Error de Resend enviando a ${destino}:`,
          res.value.error,
        );
      } else {
        console.log(
          `[Emails Voluntariado] Correo enviado exitosamente a ${destino}. ID:`,
          res.value.data?.id,
        );
      }
    } else {
      console.error(
        `[Emails Voluntariado] Error crítico al intentar enviar a ${destino}:`,
        res.reason,
      );
    }
  });
}
