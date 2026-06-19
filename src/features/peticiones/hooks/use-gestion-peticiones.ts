"use client";

import * as React from "react";
import { useTransition } from "react";
import { toast } from "sonner";
import { actualizarEstadoPeticionAction } from "@/features/peticiones/actions/actualizar-estado-peticion";
import { eliminarPeticionAction } from "@/features/peticiones/actions/eliminar-peticion";
import type { EstadoPeticion } from "@/generated/prisma/enums";

// Adapt local types to match return of listing repositories
type PeticionConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  estado: EstadoPeticion;
  resumen: string;
  contenido: string;
  imagen: string | null;
  categoriaId?: string;
  meta_firmas: number;
  cantidad_firmas: number;
  destacado: boolean;
  categoria: {
    nombre: string;
    color: string | null;
  } | null;
  usuario?: {
    id: string;
    nombre: string;
  } | null;
};

export function useGestionPeticiones(
  initialPeticiones: PeticionConRelaciones[],
) {
  const [isPending, startTransition] = useTransition();
  const [peticiones, setPeticiones] =
    React.useState<PeticionConRelaciones[]>(initialPeticiones);

  React.useEffect(() => {
    setPeticiones(initialPeticiones);
  }, [initialPeticiones]);

  const [editingPeticion, setEditingPeticion] =
    React.useState<PeticionConRelaciones | null>(null);

  const handleStatusChange = (id: string, nuevoEstado: EstadoPeticion) => {
    startTransition(async () => {
      const result = await actualizarEstadoPeticionAction(id, nuevoEstado);
      if (result.success) {
        toast.success("Estado actualizado", {
          description: `El estado de la petición ha sido cambiado a ${nuevoEstado}.`,
        });
      } else {
        toast.error("Error al actualizar estado", {
          description: result.error || "No se pudo cambiar el estado.",
        });
      }
    });
  };

  const handleDeletePeticion = (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que deseas eliminar esta petición de forma permanente?",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await eliminarPeticionAction(id);
      if (result.success) {
        toast.success("Petición eliminada", {
          description: "La petición ha sido eliminada permanentemente.",
        });
      } else {
        toast.error("Error al eliminar", {
          description: result.error || "No se pudo eliminar la petición.",
        });
      }
    });
  };

  return {
    peticiones,
    isPending,
    editingPeticion,
    setEditingPeticion,
    handleStatusChange,
    handleDeletePeticion,
  };
}
