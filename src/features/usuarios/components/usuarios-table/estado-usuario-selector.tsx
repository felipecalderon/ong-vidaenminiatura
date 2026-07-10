import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EstadoUsuario } from "@/generated/prisma/enums";

interface EstadoUsuarioSelectorProps {
  value: string;
  disabled: boolean;
  onValueChange: (value: EstadoUsuario) => void;
}

export function EstadoUsuarioSelector({
  value,
  disabled,
  onValueChange,
}: EstadoUsuarioSelectorProps) {
  return (
    <Select
      disabled={disabled}
      value={value}
      onValueChange={(val) => onValueChange(val as EstadoUsuario)}
    >
      <SelectTrigger className="w-35 ml-auto border border-outline-variant font-semibold bg-background dark:">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border border-outline-variant bg-popover font-semibold">
        <SelectItem value={EstadoUsuario.ACTIVO}>ACTIVO</SelectItem>
        <SelectItem value={EstadoUsuario.SUSPENDIDO}>SUSPENDIDO</SelectItem>
      </SelectContent>
    </Select>
  );
}
