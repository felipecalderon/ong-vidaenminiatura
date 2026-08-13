"use client";

import * as React from "react";
import { useTransition } from "react";
import { toast } from "sonner";
import { crearCategoriaAction } from "@/features/categorias/actions/crear-categoria";
import { editarCategoriaAction } from "@/features/categorias/actions/editar-categoria";
import { eliminarCategoriaAction } from "@/features/categorias/actions/eliminar-categoria";
import { obtenerConteosCategoriaAction } from "@/features/categorias/actions/obtener-conteos-categoria";
import type { Categoria } from "@/features/categorias/types";

type ConteosCategoria = {
  peticiones: number;
  noticias: number;
};

export function useGestionCategorias(initialCategorias: Categoria[]) {
  const [isPending, startTransition] = useTransition();

  const [categorias, setCategorias] =
    React.useState<Categoria[]>(initialCategorias);

  React.useEffect(() => {
    setCategorias(initialCategorias);
  }, [initialCategorias]);

  // Estados de modales
  const [isNewCategoryOpen, setIsNewCategoryOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] =
    React.useState<Categoria | null>(null);
  const [deletingCategory, setDeletingCategory] =
    React.useState<Categoria | null>(null);
  const [conteos, setConteos] = React.useState<ConteosCategoria | null>(null);
  const [conteosError, setConteosError] = React.useState<string | null>(null);
  const [reemplazoCategoriaId, setReemplazoCategoriaId] = React.useState("");
  const conteosRequestId = React.useRef(0);

  // Form de nueva categoría
  const [newCatName, setNewCatName] = React.useState("");
  const [newCatDesc, setNewCatDesc] = React.useState("");
  const [newCatColor, setNewCatColor] = React.useState("#000000");

  // Form de edición de categoría
  const [editCatName, setEditCatName] = React.useState("");
  const [editCatDesc, setEditCatDesc] = React.useState("");
  const [editCatColor, setEditCatColor] = React.useState("#000000");
  const [editCatActive, setEditCatActive] = React.useState(true);

  // Abrir modal de edición
  const handleOpenEdit = (categoria: Categoria) => {
    setEditingCategory(categoria);
    setEditCatName(categoria.nombre);
    setEditCatDesc(categoria.descripcion ?? "");
    setEditCatColor(categoria.color ?? "#000000");
    setEditCatActive(categoria.activo);
  };

  // Abrir modal de eliminación y cargar conteos
  const handleOpenDelete = async (categoria: Categoria) => {
    const requestId = ++conteosRequestId.current;

    setDeletingCategory(categoria);
    setConteos(null);
    setConteosError(null);
    setReemplazoCategoriaId("");

    try {
      const conteosCategoria = await obtenerConteosCategoriaAction(
        categoria.id,
      );
      if (conteosRequestId.current !== requestId) return;
      setConteos(conteosCategoria);
    } catch (err: unknown) {
      if (conteosRequestId.current !== requestId) return;
      const message =
        err instanceof Error
          ? err.message
          : "No se pudieron cargar los conteos de la categoría.";
      setConteosError(
        message || "No se pudieron cargar los conteos de la categoría.",
      );
    }
  };

  // Crear categoría
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    startTransition(async () => {
      try {
        const result = await crearCategoriaAction({
          nombre: newCatName,
          descripcion: newCatDesc,
          color: newCatColor,
        });

        toast.success("Categoría creada", {
          description: `La categoría "${result.nombre}" ha sido creada exitosamente.`,
        });

        // Limpiar
        setNewCatName("");
        setNewCatDesc("");
        setNewCatColor("#000000");
        setIsNewCategoryOpen(false);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Ha ocurrido un error inesperado";
        toast.error("Error al crear la categoría", {
          description: message || "Ocurrió un error inesperado.",
        });
      }
    });
  };

  // Editar categoría
  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editCatName.trim()) return;

    startTransition(async () => {
      try {
        const result = await editarCategoriaAction(editingCategory.id, {
          nombre: editCatName,
          descripcion: editCatDesc,
          color: editCatColor,
          activo: editCatActive,
        });

        toast.success("Categoría actualizada", {
          description: `La categoría "${result.nombre}" ha sido actualizada.`,
        });

        setEditingCategory(null);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Ha ocurrido un error inesperado";
        toast.error("Error al actualizar la categoría", {
          description: message || "Ocurrió un error inesperado.",
        });
      }
    });
  };

  // Eliminar categoría (con reasignación si tiene contenido)
  const handleDeleteCategory = () => {
    if (!deletingCategory) return;

    startTransition(async () => {
      try {
        const result = await eliminarCategoriaAction(deletingCategory.id, {
          categoriaReemplazoId: reemplazoCategoriaId || undefined,
        });

        if (!result.success) {
          toast.error("Error al eliminar la categoría", {
            description: result.error || "Ocurrió un error inesperado.",
          });
          return;
        }

        toast.success("Categoría eliminada", {
          description: `La categoría "${deletingCategory.nombre}" ha sido eliminada permanentemente.`,
        });

        setCategorias((actuales) =>
          actuales.filter((categoria) => categoria.id !== deletingCategory.id),
        );
        setDeletingCategory(null);
        setConteos(null);
        setConteosError(null);
        setReemplazoCategoriaId("");
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Ha ocurrido un error inesperado";
        toast.error("Error al eliminar la categoría", {
          description: message || "Ocurrió un error inesperado.",
        });
      }
    });
  };

  return {
    categorias,
    isPending,
    isNewCategoryOpen,
    setIsNewCategoryOpen,
    editingCategory,
    setEditingCategory,
    deletingCategory,
    setDeletingCategory,
    conteos,
    setConteos,
    conteosError,
    setConteosError,
    reemplazoCategoriaId,
    setReemplazoCategoriaId,
    newCatName,
    setNewCatName,
    newCatDesc,
    setNewCatDesc,
    newCatColor,
    setNewCatColor,
    editCatName,
    setEditCatName,
    editCatDesc,
    setEditCatDesc,
    editCatColor,
    setEditCatColor,
    editCatActive,
    setEditCatActive,
    handleOpenEdit,
    handleOpenDelete,
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,
  };
}
