import {
  ClipboardList,
  Edit,
  FilePlus2,
  LogOut,
  Newspaper,
  ShieldAlert,
  User2,
} from "lucide-react";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { formatearEstado, formatearRol } from "@/lib/common";
import { cn } from "@/lib/utils";
import type { UsuarioAutenticadoResumen } from "../usuarios/types";
import { AvatarCuenta } from "./avatar-cuenta";

export function MobileAccountAccess({
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
