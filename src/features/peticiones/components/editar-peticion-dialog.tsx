"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PeticionConRelaciones } from "@/features/peticiones/types";
import { EditarPeticionForm } from "./editar-peticion-form";

interface EditarPeticionDialogProps {
  peticion: PeticionConRelaciones;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categorias: { id: string; nombre: string }[];
  onPublicar?: (id: string) => Promise<void>;
  publicandoId?: string | null;
  onSuccess?: () => void;
}

export function EditarPeticionDialog({
  peticion,
  open,
  onOpenChange,
  categorias,
  onPublicar,
  publicandoId,
  onSuccess,
}: EditarPeticionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-outline-variant dark: w-full max-w-[95vw] sm:max-w-175 max-h-[85vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">
            Editar Petición
          </DialogTitle>
          <DialogDescription>
            Modifica los campos necesarios y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 mt-2">
          {peticion.estado === "BORRADOR" && onPublicar && (
            <div className="bg-primary/10 border border-primary p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-bold text-lg text-primary truncate">
                  ¡Lista para publicar!
                </h3>
                <p className="text-sm">
                  Esta petición es un borrador. Publícala cuando hayas terminado
                  de editarla.
                </p>
              </div>
              <Button
                className="w-full sm:w-auto font-bold border border-outline-variant py-5 hover: transition-all shrink-0"
                onClick={() => onPublicar(peticion.id)}
                disabled={publicandoId === peticion.id}
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Publicar Ahora
              </Button>
            </div>
          )}

          {peticion.estado === "REVISION" && (
            <div className="bg-amber-50 border border-amber-400 p-4 rounded-xl dark:bg-amber-900/20">
              <h3 className="font-bold text-lg text-amber-700 dark:text-amber-300">
                Pendiente de revisión
              </h3>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Tu petición está siendo revisada por un administrador. Te
                notificaremos cuando sea aprobada o rechazada.
              </p>
            </div>
          )}

          <EditarPeticionForm
            peticion={{
              id: peticion.id,
              titulo: peticion.titulo,
              resumen: peticion.resumen,
              contenido: peticion.contenido,
              meta_firmas: peticion.meta_firmas,
              categoriaId: peticion.categoriaId,
              imagen: peticion.imagen,
              destacado: peticion.destacado,
            }}
            categorias={categorias}
            onSuccess={onSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
