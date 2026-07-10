"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface EditarCategoriaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nombre: string;
  onNombreChange: (value: string) => void;
  descripcion: string;
  onDescripcionChange: (value: string) => void;
  color: string;
  onColorChange: (value: string) => void;
  activo: boolean;
  onActivoChange: (value: boolean) => void;
  isPending: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function EditarCategoriaDialog({
  open,
  onOpenChange,
  nombre,
  onNombreChange,
  descripcion,
  onDescripcionChange,
  color,
  onColorChange,
  activo,
  onActivoChange,
  isPending,
  onSubmit,
}: EditarCategoriaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-outline-variant bg-background p-6 dark: max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold uppercase text-foreground">
            Editar Categoría
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold uppercase">
              Nombre
            </label>
            <Input
              id="name"
              value={nombre}
              onChange={(e) => onNombreChange(e.target.value)}
              placeholder="Nombre de la categoría"
              className="border border-outline-variant font-semibold dark:"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-bold uppercase"
            >
              Descripción
            </label>
            <Textarea
              id="description"
              value={descripcion}
              onChange={(e) => onDescripcionChange(e.target.value)}
              placeholder="Breve descripción de la categoría"
              className="border border-outline-variant font-semibold dark:"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="edit-color"
              className="text-sm font-bold uppercase block"
            >
              Color Identificador
            </label>
            <div className="flex items-center gap-3">
              <input
                id="edit-color"
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="size-10 border border-outline-variant dark: cursor-pointer"
              />
              <Input
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="border border-outline-variant font-mono dark: max-w-30"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="activation-status"
              className="text-sm font-bold uppercase block"
            >
              Estado de Activación
            </label>
            <Select
              value={activo ? "active" : "inactive"}
              onValueChange={(val) => onActivoChange(val === "active")}
            >
              <SelectTrigger
                id="activation-status"
                className="w-full border border-outline-variant font-semibold bg-background dark:"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border border-outline-variant bg-popover font-semibold">
                <SelectItem value="active">ACTIVO</SelectItem>
                <SelectItem value="inactive">INACTIVO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="pt-4 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border border-outline-variant font-bold dark:"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="border border-outline-variant font-bold dark:"
            >
              {isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
