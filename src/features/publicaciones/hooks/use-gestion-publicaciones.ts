"use client";

import * as React from "react";
import { useTransition } from "react";
import { toast } from "sonner";
import { actualizarEstadoPublicacionAction } from "@/features/publicaciones/actions/actualizar-estado-publicacion";
import { eliminarPublicacionAction } from "@/features/publicaciones/actions/eliminar-publicacion";
import type {
  EstadoPublicacion,
  PublicacionConRelaciones,
} from "@/features/publicaciones/types";

export function useGestionPublicaciones(
  initialPublicaciones: PublicacionConRelaciones[],
) {
  const [isPending, startTransition] = useTransition();
  const [publicaciones, setPublicaciones] =
    React.useState<PublicacionConRelaciones[]>(initialPublicaciones);

  React.useEffect(() => {
    setPublicaciones(initialPublicaciones);
  }, [initialPublicaciones]);

  const handleStatusChange = (id: string, nuevoEstado: EstadoPublicacion) => {
    startTransition(async () => {
      const result = await actualizarEstadoPublicacionAction(id, nuevoEstado);
      if (result.success) {
        toast.success("Estado actualizado", {
          description: `El estado de la publicación ha sido cambiado a ${nuevoEstado}.`,
        });
      } else {
        toast.error("Error al actualizar estado", {
          description: result.error || "No se pudo cambiar el estado.",
        });
      }
    });
  };

  const handleDeletePublicacion = (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que deseas eliminar esta publicación de forma permanente?",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await eliminarPublicacionAction(id);
      if (result.success) {
        toast.success("Publicación eliminada", {
          description: "La publicación ha sido eliminada permanentemente.",
        });
      } else {
        toast.error("Error al eliminar", {
          description: result.error || "No se pudo eliminar la publicación.",
        });
      }
    });
  };

  return {
    publicaciones,
    isPending,
    handleStatusChange,
    handleDeletePublicacion,
  };
}
