import { User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { obtenerIniciales } from "@/lib/common";
import { cn } from "@/lib/utils";
import type { UsuarioAutenticadoResumen } from "../usuarios/types";

export function AvatarCuenta({
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
