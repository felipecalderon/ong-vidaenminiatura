import "server-only";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Remitente predeterminado (Si no está configurado un dominio personalizado, se usa el de desarrollo de Resend)
export const EMAIL_FROM =
  process.env.EMAIL_FROM || "Fundación Más Insectos <onboarding@resend.dev>";

// Correo oficial de la fundación para notificaciones internas
export const EMAIL_OFICIAL_ONG =
  process.env.EMAIL_OFFICIAL || "hola@masinsectos.org";
