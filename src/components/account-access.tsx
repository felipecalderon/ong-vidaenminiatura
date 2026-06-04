"use client";

import { ChevronDown, LogIn, LogOut, ShieldAlert, User2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetClose } from "@/components/ui/sheet";
import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";
import { cn } from "@/lib/utils";

interface AccountAccessProps {
  usuario: UsuarioAutenticadoResumen | null;
  variant: "desktop" | "mobile";
}

function obtenerIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .join("");
}

function formatearRol(rol: UsuarioAutenticadoResumen["rol"]): string {
  switch (rol) {
    case "ADMINISTRADOR":
      return "Administrador";
    case "AUTOR":
      return "Autor";
    default:
      return "Usuario";
  }
}

function formatearEstado(estado: UsuarioAutenticadoResumen["estado"]): string {
  return estado === "SUSPENDIDO" ? "Suspendida" : "Activa";
}

function AvatarCuenta({
  usuario,
  className,
}: {
  usuario: UsuarioAutenticadoResumen;
  className?: string;
}) {
  const initials = obtenerIniciales(usuario.nombre);

  return (
    <Avatar className={cn("size-9 border border-black/10", className)}>
      <AvatarImage alt={usuario.nombre} src={usuario.picture ?? undefined} />
      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
        {initials || <User2 className="size-4" />}
      </AvatarFallback>
    </Avatar>
  );
}

function LoginButton() {
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="border-2 border-black dark:border-white"
    >
      <Link href="/auth/login">
        <LogIn className="size-4" />
        <span className="sr-only">Iniciar sesión</span>
      </Link>
    </Button>
  );
}

function DesktopAccountAccess({
  usuario,
}: {
  usuario: UsuarioAutenticadoResumen;
}) {
  const esSuspendida = usuario.estado === "SUSPENDIDO";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="max-w-[14rem] border-2 border-black px-3 font-semibold dark:border-white"
        >
          <AvatarCuenta usuario={usuario} />
          <span className="hidden max-w-28 truncate sm:inline">
            {usuario.nombre}
          </span>
          <ChevronDown className="size-4 shrink-0 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="space-y-2">
          <div className="flex items-center gap-3">
            <AvatarCuenta usuario={usuario} className="size-10" />
            <div className="min-w-0">
              <p className="truncate font-semibold">{usuario.nombre}</p>
              <p className="truncate text-xs text-muted-foreground">
                {usuario.correo}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-secondary px-2 py-1 font-semibold">
              {formatearRol(usuario.rol)}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-1 font-semibold",
                esSuspendida
                  ? "bg-destructive/10 text-destructive"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
              )}
            >
              {formatearEstado(usuario.estado)}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/auth/logout?returnTo=/"
            className="flex w-full items-center gap-2"
          >
            <LogOut className="size-4" />
            Cerrar sesión
          </Link>
        </DropdownMenuItem>
        {esSuspendida ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled className="gap-2">
              <ShieldAlert className="size-4" />
              Cuenta suspendida
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileAccountAccess({
  usuario,
}: {
  usuario: UsuarioAutenticadoResumen;
}) {
  const esSuspendida = usuario.estado === "SUSPENDIDO";

  return (
    <div className="rounded-2xl border-2 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
      <div className="flex items-center gap-3">
        <AvatarCuenta usuario={usuario} className="size-11" />
        <div className="min-w-0">
          <p className="truncate text-lg font-bold">{usuario.nombre}</p>
          <p className="truncate text-sm text-muted-foreground">
            {usuario.correo}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-secondary px-2 py-1 font-semibold">
          {formatearRol(usuario.rol)}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-1 font-semibold",
            esSuspendida
              ? "bg-destructive/10 text-destructive"
              : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
          )}
        >
          {formatearEstado(usuario.estado)}
        </span>
      </div>
      <SheetClose asChild>
        <Link
          href="/auth/logout?returnTo=/"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-black bg-background px-4 py-2 font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
        >
          <LogOut className="size-4" />
          Cerrar sesión
        </Link>
      </SheetClose>
      {esSuspendida ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-destructive">
          <ShieldAlert className="size-4" />
          Acceso funcional denegado por suspensión.
        </p>
      ) : null}
    </div>
  );
}

function MobileAnonymousAccess() {
  return (
    <SheetClose asChild>
      <Link
        href="/auth/login"
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-black bg-primary px-4 py-3 font-bold text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
      >
        <LogIn className="size-4" />
        Iniciar sesión
      </Link>
    </SheetClose>
  );
}

export function AccountAccess({ usuario, variant }: AccountAccessProps) {
  if (!usuario) {
    return variant === "desktop" ? <LoginButton /> : <MobileAnonymousAccess />;
  }

  return variant === "desktop" ? (
    <DesktopAccountAccess usuario={usuario} />
  ) : (
    <MobileAccountAccess usuario={usuario} />
  );
}
