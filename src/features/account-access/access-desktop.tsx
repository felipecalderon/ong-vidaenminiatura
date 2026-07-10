import {
  ChevronDown,
  ClipboardList,
  Edit,
  FilePlus2,
  LogOut,
  Newspaper,
  ShieldAlert,
  User2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatearEstado, formatearRol } from "@/lib/common";
import { cn } from "@/lib/utils";
import type { UsuarioAutenticadoResumen } from "../usuarios/types";
import { AvatarCuenta } from "./avatar-cuenta";

export function DesktopAccountAccess({
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
