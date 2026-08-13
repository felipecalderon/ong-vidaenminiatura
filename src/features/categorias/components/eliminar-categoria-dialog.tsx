"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Categoria } from "../types";

interface EliminarCategoriaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoria: Categoria | null;
  categorias: Categoria[];
  conteos: { peticiones: number; noticias: number } | null;
  conteosError: string | null;
  reemplazoId: string;
  onReemplazoChange: (value: string) => void;
  isPending: boolean;
  onConfirm: () => void;
}

export function EliminarCategoriaDialog({
  open,
  onOpenChange,
  categoria,
  categorias,
  conteos,
  conteosError,
  reemplazoId,
  onReemplazoChange,
  isPending,
  onConfirm,
}: EliminarCategoriaDialogProps) {
  const tieneDependencias = conteos
    ? conteos.peticiones > 0 || conteos.noticias > 0
    : false;
  const opcionesReemplazo = categorias.filter(
    (categoriaOpcion) => categoriaOpcion.id !== categoria?.id,
  );
  const reemplazoInvalido = tieneDependencias && !reemplazoId;
  const puedeConfirmar =
    !!conteos && !conteosError && !reemplazoInvalido && !isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-outline-variant bg-background p-6 dark: max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold uppercase text-foreground">
            Eliminar Categoría
          </DialogTitle>
          <DialogDescription className="font-semibold">
            Esta acción es permanente y no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <p className="text-sm font-bold text-foreground">
            ¿Eliminar la categoría{" "}
            <span className="text-destructive">“{categoria?.nombre}”</span>?
          </p>

          {conteosError ? (
            <p className="text-sm font-bold text-destructive">{conteosError}</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-outline-variant bg-muted p-3 dark:">
                <p className="text-xs font-extrabold text-muted-foreground uppercase">
                  Peticiones
                </p>
                <p className="mt-1 text-2xl font-extrabold text-foreground">
                  {conteos?.peticiones ?? "…"}
                </p>
              </div>
              <div className="border border-outline-variant bg-muted p-3 dark:">
                <p className="text-xs font-extrabold text-muted-foreground uppercase">
                  Noticias
                </p>
                <p className="mt-1 text-2xl font-extrabold text-foreground">
                  {conteos?.noticias ?? "…"}
                </p>
              </div>
            </div>
          )}

          {tieneDependencias && (
            <div className="space-y-2">
              <label
                htmlFor="categoria-reemplazo"
                className="text-sm font-bold uppercase"
              >
                Categoría de reemplazo
              </label>
              <Select
                value={reemplazoId}
                onValueChange={onReemplazoChange}
                disabled={isPending}
              >
                <SelectTrigger
                  id="categoria-reemplazo"
                  className="w-full border border-outline-variant font-semibold bg-background dark:"
                >
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent className="border border-outline-variant bg-popover font-semibold">
                  {opcionesReemplazo.map((categoriaOpcion) => (
                    <SelectItem
                      key={categoriaOpcion.id}
                      value={categoriaOpcion.id}
                    >
                      {categoriaOpcion.nombre}
                      {categoriaOpcion.activo ? "" : " (inactiva)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs font-semibold text-muted-foreground">
                Todo el contenido asociado será reasignado a esta categoría
                antes de eliminar.
              </p>
            </div>
          )}
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
            type="button"
            variant="destructive"
            disabled={!puedeConfirmar}
            onClick={onConfirm}
            className="border border-outline-variant font-bold dark: hover:shadow-none"
          >
            {isPending ? "Eliminando..." : "Eliminar Categoría"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
