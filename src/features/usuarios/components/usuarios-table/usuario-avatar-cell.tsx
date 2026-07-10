import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UsuarioAvatarCellProps {
  nombre: string;
  picture?: string | null;
  nickname?: string | null;
  esPropio: boolean;
}

export function UsuarioAvatarCell({
  nombre,
  picture,
  nickname,
  esPropio,
}: UsuarioAvatarCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-8 border border-outline-variant dark:">
        <AvatarImage src={picture ?? undefined} />
        <AvatarFallback className="font-extrabold">
          {nombre.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold text-foreground">
          {nombre}{" "}
          {esPropio && (
            <span className="text-xs text-primary font-extrabold">(Tú)</span>
          )}
        </p>
        {nickname && (
          <p className="text-xs text-muted-foreground">@{nickname}</p>
        )}
      </div>
    </div>
  );
}
