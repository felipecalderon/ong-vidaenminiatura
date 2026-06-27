"use client";

import {
  ChevronDown,
  ClipboardList,
  Edit,
  FilePlus2,
  LogIn,
  LogOut,
  Newspaper,
  ShieldAlert,
  User2,
} from "lucide-react";
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
    .split("")
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
    <Avatar
      className={cn("size-9 border border-outline-variant/10", className)}
    >
      <AvatarImage alt={usuario.nombre} src={usuario.picture ?? undefined} />
      <AvatarFallback className="bg-primary text-on-primary text-xs font-bold">
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
      className="gap-2 border border-outline-variant rounded-full"
    >
      <a href="/auth/login" className="flex items-center gap-2">
        <LogIn className="size-4" />
        <span>Iniciar sesión</span>
      </a>
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
          className="max-w-56 border border-outline-variant px-3 font-semibold"
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
            href="/usuario/mis-datos"
            className="flex w-full items-center gap-2"
          >
            <User2 className="size-4" />
            Mis datos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/peticiones/crear"
            className="flex w-full items-center gap-2"
          >
            <FilePlus2 className="size-4" />
            Crear Petición
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/peticiones/mis-peticiones"
            className="flex w-full items-center gap-2"
          >
            <ClipboardList className="size-4" />
            {usuario.rol === "ADMINISTRADOR"
              ? "Gestión de Peticiones"
              : "Mis Peticiones"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/noticias/crear"
            className="flex w-full items-center gap-2"
          >
            <Newspaper className="size-4" />
            Crear Noticia
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/noticias/mis-noticias"
            className="flex w-full items-center gap-2"
          >
            <Edit className="size-4" />
            {usuario.rol === "ADMINISTRADOR"
              ? "Gestión de Noticias"
              : "Mis Noticias"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/logout" className="flex w-full items-center gap-2">
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
    <div className="rounded-xl border border-outline-variant bg-card p-4">
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
        <span className="rounded-full bg-secondary/10 text-secondary px-2 py-1 font-semibold dark:bg-secondary/20 dark:text-on-surface-variant">
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
      <div className="mt-4 flex flex-col gap-2">
        <SheetClose asChild>
          <Link
            href="/usuario/mis-datos"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-background px-4 py-2.5 text-sm font-semibold transition-all hover:bg-surface-container-high active:scale-[0.98]"
          >
            <User2 className="size-4" />
            Mis datos
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href="/peticiones/crear"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-background px-4 py-2.5 text-sm font-semibold transition-all hover:bg-surface-container-high active:scale-[0.98]"
          >
            <FilePlus2 className="size-4" />
            Crear Petición
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href="/peticiones/mis-peticiones"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-background px-4 py-2.5 text-sm font-semibold transition-all hover:bg-surface-container-high active:scale-[0.98]"
          >
            <ClipboardList className="size-4" />
            {usuario.rol === "ADMINISTRADOR"
              ? "Gestión de Peticiones"
              : "Mis Peticiones"}
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href="/noticias/crear"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-background px-4 py-2.5 text-sm font-semibold transition-all hover:bg-surface-container-high active:scale-[0.98]"
          >
            <Newspaper className="size-4" />
            Crear Noticia
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href="/noticias/mis-noticias"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-background px-4 py-2.5 text-sm font-semibold transition-all hover:bg-surface-container-high active:scale-[0.98]"
          >
            <Edit className="size-4" />
            {usuario.rol === "ADMINISTRADOR"
              ? "Gestión de Noticias"
              : "Mis Noticias"}
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href="/auth/logout"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-background px-4 py-2.5 text-sm font-semibold transition-all hover:bg-surface-container-high text-destructive active:scale-[0.98]"
          >
            <LogOut className="size-4" />
            Cerrar sesión
          </Link>
        </SheetClose>
      </div>
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
        className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-transparent bg-primary px-4 py-3.5 font-bold text-on-primary transition-all hover:bg-primary/90 active:scale-[0.98] shadow-sm shadow-primary/20"
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
