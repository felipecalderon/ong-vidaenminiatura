"use client";

import * as React from "react";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { actualizarRolAction } from "@/features/usuarios/actions/actualizar-rol";
import { cambiarEstadoUsuarioAction } from "@/features/usuarios/actions/cambiar-estado-usuario";
import type {
  Usuario,
  UsuarioAutenticadoResumen,
} from "@/features/usuarios/types";
import { EstadoUsuario, Rol } from "@/generated/prisma/enums";

export function useGestionUsuarios(
  initialUsuarios: Usuario[],
  currentUser: UsuarioAutenticadoResumen,
) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [usuarios, setUsuarios] = React.useState<Usuario[]>(initialUsuarios);

  React.useEffect(() => {
    setUsuarios(initialUsuarios);
  }, [initialUsuarios]);

  // Cambiar rol de usuario
  const handleRoleChange = (usuarioId: string, nuevoRol: Rol) => {
    if (usuarioId === currentUser.id) {
      toast({
        variant: "destructive",
        title: "Operación no permitida",
        description: "No puedes cambiar tu propio rol de administrador.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await actualizarRolAction(usuarioId, nuevoRol);
        toast({
          title: "Rol actualizado",
          description: `El rol de ${result.nombre} ahora es ${result.rol}.`,
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Ha ocurrido un error inesperado";
        toast({
          variant: "destructive",
          title: "Error al cambiar de rol",
          description: message || "Ocurrió un error.",
        });
      }
    });
  };

  // Cambiar estado de usuario
  const handleStatusChange = (
    usuarioId: string,
    nuevoEstado: EstadoUsuario,
  ) => {
    if (usuarioId === currentUser.id) {
      toast({
        variant: "destructive",
        title: "Operación no permitida",
        description: "No puedes suspender tu propia cuenta.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await cambiarEstadoUsuarioAction(usuarioId, nuevoEstado);
        toast({
          title: "Estado actualizado",
          description: `El estado de ${result.nombre} ahora es ${result.estado}.`,
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Ha ocurrido un error inesperado";
        toast({
          variant: "destructive",
          title: "Error al cambiar de estado",
          description: message || "Ocurrió un error.",
        });
      }
    });
  };

  return {
    usuarios,
    isPending,
    handleRoleChange,
    handleStatusChange,
  };
}
