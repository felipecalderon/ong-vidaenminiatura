import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Sparkles,
  UserCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { validarInvitacionService } from "@/features/invitaciones/services/validar-invitacion.service";

export const metadata: Metadata = {
  title: "Aceptar Invitación | Fundación Más Insectos",
  description:
    "Accede a la plataforma de Fundación Más Insectos mediante tu invitación.",
};

const ROL_LABELS: Record<string, { label: string; desc: string }> = {
  USUARIO: {
    label: "Usuario",
    desc: "Podrás participar activamente y firmar peticiones.",
  },
  AUTOR: {
    label: "Autor de Contenido",
    desc: "Podrás redactar y publicar noticias, estudios, eventos y recursos educativos.",
  },
  ADMINISTRADOR: {
    label: "Administrador",
    desc: "Tendrás control total sobre la configuración, publicaciones y usuarios del sistema.",
  },
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function InvitacionPage({ params }: PageProps) {
  const { token } = await params;
  const validacion = await validarInvitacionService(token);

  if (!validacion.esValida || !validacion.invitacion) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md bg-card border border-outline-variant rounded-2xl p-6 sm:p-8 shadow-sm text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
            {validacion.motivo === "EXPIRADA" ? (
              <Clock className="size-7" />
            ) : validacion.motivo === "YA_UTILIZADA" ? (
              <CheckCircle2 className="size-7 text-primary" />
            ) : (
              <ShieldAlert className="size-7" />
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-foreground mb-2">
            {validacion.motivo === "EXPIRADA"
              ? "Invitación Expirada"
              : validacion.motivo === "YA_UTILIZADA"
                ? "Invitación Ya Utilizada"
                : validacion.motivo === "CANCELADA"
                  ? "Invitación Revocada"
                  : "Invitación No Válida"}
          </h1>

          <p className="text-sm text-muted-foreground mb-6">
            {validacion.motivo === "EXPIRADA"
              ? "Este enlace ha superado el plazo de vigencia. Contacta al administrador que te invitó para solicitar un nuevo enlace."
              : validacion.motivo === "YA_UTILIZADA"
                ? "Esta invitación ya fue aceptada previamente. Puedes iniciar sesión directamente con tu cuenta."
                : validacion.motivo === "CANCELADA"
                  ? "Esta invitación fue cancelada por la administración de la plataforma."
                  : "El enlace proporcionado no existe o no corresponde a una invitación activa."}
          </p>

          <div className="flex flex-col gap-2">
            <Link
              href={validacion.motivo === "YA_UTILIZADA" ? "/auth/login" : "/"}
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-opacity hover:opacity-90 shadow-sm"
            >
              {validacion.motivo === "YA_UTILIZADA"
                ? "Iniciar Sesión"
                : "Volver al Inicio"}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { invitacion } = validacion;
  const infoRol = ROL_LABELS[invitacion.rol] || {
    label: invitacion.rol,
    desc: "Acceso asignado según perfil.",
  };

  const loginReturnUrl = `/auth/login?returnTo=${encodeURIComponent(
    `/invitacion/procesar?token=${token}`,
  )}`;

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-lg bg-card border border-outline-variant rounded-2xl p-6 sm:p-8 shadow-md">
        {/* Header con insignia */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="size-3.5" />
            Invitación Oficial
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            ¡Te damos la bienvenida!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Has sido invitado a formar parte activa de la plataforma de{" "}
            <strong className="text-foreground font-semibold">
              Fundación Más Insectos
            </strong>
            .
          </p>
        </div>

        {/* Ficha de datos de la invitación */}
        <div className="space-y-3 rounded-xl border border-outline-variant bg-surface-container/50 p-4 sm:p-5 mb-6">
          <div className="flex items-start justify-between gap-2 border-b border-outline-variant/60 pb-3">
            <span className="text-xs font-bold text-muted-foreground uppercase">
              Correo Invitado
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-foreground">
              {invitacion.correo}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2 border-b border-outline-variant/60 pb-3">
            <span className="text-xs font-bold text-muted-foreground uppercase">
              Rol Asignado
            </span>
            <div className="text-right">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-primary text-primary-foreground text-xs font-black uppercase">
                {infoRol.label}
              </span>
              <p className="text-[11px] text-muted-foreground mt-1 max-w-60">
                {infoRol.desc}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase">
              Invitado Por
            </span>
            <span className="text-xs sm:text-sm font-semibold text-foreground">
              {invitacion.creada_por.nombre}
            </span>
          </div>
        </div>

        {/* Advertencia amigable sobre el correo */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-950 dark:text-amber-200 text-xs mb-6">
          <AlertCircle className="size-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <p>
            Para activar correctamente tu rol, debes iniciar sesión o crear tu
            cuenta en el siguiente paso usando exactamente el correo:{" "}
            <strong>{invitacion.correo}</strong>.
          </p>
        </div>

        {/* Botón de acción */}
        <div className="space-y-2">
          <a
            href={loginReturnUrl}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm uppercase tracking-wider transition-all hover:opacity-90 shadow-sm"
          >
            <UserCheck className="size-4" />
            Aceptar Invitación y Continuar
          </a>
          <p className="text-center text-[11px] text-muted-foreground">
            Serás redirigido a nuestra pasarela segura de autenticación (Auth0).
          </p>
        </div>
      </div>
    </main>
  );
}
