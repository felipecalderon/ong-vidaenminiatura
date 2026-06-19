"use client";

import * as React from "react";
import { useTransition } from "react";
import { toast } from "sonner";
import { actualizarEstadoNoticiaAction } from "@/features/noticias/actions/actualizar-estado-noticia";
import { eliminarNoticiaAction } from "@/features/noticias/actions/eliminar-noticia";
import type { EstadoNoticia } from "@/generated/prisma/enums";

type NoticiaConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  estado: EstadoNoticia;
  resumen: string;
  contenido: string;
  imagen: string | null;
  categoria_id: string;
  categoria: {
    nombre: string;
    color: string | null;
  } | null;
  autor?: {
    id: string;
    nombre: string;
  } | null;
};

export function useGestionNoticias(initialNoticias: NoticiaConRelaciones[]) {
  const [isPending, startTransition] = useTransition();
  const [noticias, setNoticias] =
    React.useState<NoticiaConRelaciones[]>(initialNoticias);

  React.useEffect(() => {
    setNoticias(initialNoticias);
  }, [initialNoticias]);

  const handleStatusChange = (id: string, nuevoEstado: EstadoNoticia) => {
    startTransition(async () => {
      const result = await actualizarEstadoNoticiaAction(id, nuevoEstado);
      if (result.success) {
        toast.success("Estado actualizado", {
          description: `El estado de la noticia ha sido cambiado a ${nuevoEstado}.`,
        });
      } else {
        toast.error("Error al actualizar estado", {
          description: result.error || "No se pudo cambiar el estado.",
        });
      }
    });
  };

  const handleDeleteNoticia = (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que deseas eliminar esta noticia de forma permanente?",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await eliminarNoticiaAction(id);
      if (result.success) {
        toast.success("Noticia eliminada", {
          description: "La noticia ha sido eliminada permanentemente.",
        });
      } else {
        toast.error("Error al eliminar", {
          description: result.error || "No se pudo eliminar la noticia.",
        });
      }
    });
  };

  return {
    noticias,
    isPending,
    handleStatusChange,
    handleDeleteNoticia,
  };
}
