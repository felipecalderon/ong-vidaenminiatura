import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Rol } from "@/generated/prisma/enums";

interface RolSelectorProps {
  value: string;
  disabled: boolean;
  onValueChange: (value: Rol) => void;
}

export function RolSelector({
  value,
  disabled,
  onValueChange,
}: RolSelectorProps) {
  return (
    <Select
      disabled={disabled}
      value={value}
      onValueChange={(val) => onValueChange(val as Rol)}
    >
      <SelectTrigger className="w-40 border border-outline-variant font-semibold bg-background dark:">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border border-outline-variant bg-popover font-semibold">
        <SelectItem value={Rol.USUARIO}>USUARIO</SelectItem>
        <SelectItem value={Rol.AUTOR}>AUTOR</SelectItem>
        <SelectItem value={Rol.ADMINISTRADOR}>ADMINISTRADOR</SelectItem>
      </SelectContent>
    </Select>
  );
}
