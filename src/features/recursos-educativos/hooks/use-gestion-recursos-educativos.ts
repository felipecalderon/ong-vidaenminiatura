"use client";

import * as React from "react";
import { useTransition } from "react";
import { toast } from "sonner";
import { actualizarEstadoRecursoEducativoAction } from "@/features/recursos-educativos/actions/actualizar-estado-recurso-educativo";
import { eliminarRecursoEducativoAction } from "@/features/recursos-educativos/actions/eliminar-recurso-educativo";
import type {
  EstadoRecursoEducativo,
  RecursoEducativoConRelaciones,
} from "@/features/recursos-educativos/types";

export function useGestionRecursosEducativos(
  initialRecursosEducativos: RecursoEducativoConRelaciones[],
) {
  const [isPending, startTransition] = useTransition();
  const [recursosEducativos, setRecursosEducativos] = React.useState<
    RecursoEducativoConRelaciones[]
  >(initialRecursosEducativos);

  React.useEffect(() => {
    setRecursosEducativos(initialRecursosEducativos);
  }, [initialRecursosEducativos]);

  const handleStatusChange = (
    id: string,
    nuevoEstado: EstadoRecursoEducativo,
  ) => {
    startTransition(async () => {
      const result = await actualizarEstadoRecursoEducativoAction(
        id,
        nuevoEstado,
      );
      if (result.success) {
        toast.success("Estado actualizado", {
          description: `El estado del recurso educativo ha sido cambiado a ${nuevoEstado}.`,
        });
      } else {
        toast.error("Error al actualizar estado", {
          description: result.error || "No se pudo cambiar el estado.",
        });
      }
    });
  };

  const handleDeleteRecursoEducativo = (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que deseas eliminar este recurso educativo de forma permanente?",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await eliminarRecursoEducativoAction(id);
      if (result.success) {
        toast.success("Recurso educativo eliminado", {
          description:
            "El recurso educativo ha sido eliminado permanentemente.",
        });
      } else {
        toast.error("Error al eliminar", {
          description:
            result.error || "No se pudo eliminar el recurso educativo.",
        });
      }
    });
  };

  return {
    recursosEducativos,
    isPending,
    handleStatusChange,
    handleDeleteRecursoEducativo,
  };
}
