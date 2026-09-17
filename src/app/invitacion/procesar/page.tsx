import { AlertCircle, CheckCircle, LogOut } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { procesarAceptacionInvitacionService } from "@/features/invitaciones/services/procesar-aceptacion-invitacion.service";
import { auth0 } from "@/lib/auth0";

export const metadata: Metadata = {
  title: "Procesando Invitación | Fundación Más Insectos",
  description: "Vinculando tu cuenta con la invitación recibida.",
};

interface ProcesarPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ProcesarInvitacionPage({
  searchParams,
}: ProcesarPageProps) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/");
  }

  const session = await auth0.getSession();

  if (!session?.user?.sub) {
    // Si no hay sesión, volver al inicio del flujo con el token
    redirect(`/invitacion/${token}`);
  }

  let errorMensaje: string | null = null;
  let usuarioCreado: { nombre: string; correo: string; rol: string } | null =
    null;

  try {
    const resultado = await procesarAceptacionInvitacionService(
      token,
      session.user,
    );
    usuarioCreado = {
      nombre: resultado.usuario.nombre,
      correo: resultado.usuario.correo,
      rol: resultado.usuario.rol,
    };
  } catch (error) {
    errorMensaje =
      error instanceof Error
        ? error.message
        : "Ocurrió un error inesperado al procesar tu invitación.";
  }

  if (errorMensaje) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md bg-card border border-outline-variant rounded-2xl p-6 sm:p-8 shadow-sm text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
            <AlertCircle className="size-7" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-foreground mb-2">
            No se pudo vincular la invitación
          </h1>

          <p className="text-sm text-muted-foreground mb-6">{errorMensaje}</p>

          <div className="flex flex-col gap-2">
            <a
              href="/auth/logout"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-destructive text-destructive-foreground font-bold text-sm transition-opacity hover:opacity-90 shadow-sm"
            >
              <LogOut className="size-4" />
              Cerrar sesión e intentar con otra cuenta
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl border border-outline-variant font-bold text-sm text-muted-foreground hover:text-foreground"
            >
              Ir a la página principal
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const destinoRedireccion =
    usuarioCreado?.rol === "ADMINISTRADOR" ? "/administracion" : "/";

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md bg-card border border-outline-variant rounded-2xl p-6 sm:p-8 shadow-sm text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
          <CheckCircle className="size-8" />
        </div>

        <h1 className="text-2xl font-black text-foreground mb-2">
          ¡Invitación aceptada con éxito!
        </h1>

        <p className="text-sm text-muted-foreground mb-4">
          Tu cuenta ha sido vinculada correctamente con el rol de{" "}
          <strong className="text-foreground uppercase font-black">
            {usuarioCreado?.rol}
          </strong>
          .
        </p>

        <div className="p-3 bg-surface-container rounded-xl border border-outline-variant text-xs text-muted-foreground font-mono mb-6">
          {usuarioCreado?.correo}
        </div>

        <Link
          href={destinoRedireccion}
          className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm uppercase tracking-wider transition-opacity hover:opacity-90 shadow-sm"
        >
          {usuarioCreado?.rol === "ADMINISTRADOR"
            ? "Ir al Panel de Administración"
            : "Continuar a la Plataforma"}
        </Link>
      </div>
    </main>
  );
}
