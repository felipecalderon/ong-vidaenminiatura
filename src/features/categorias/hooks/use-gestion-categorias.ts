"use client";

import * as React from "react";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { crearCategoriaAction } from "@/features/categorias/actions/crear-categoria";
import { editarCategoriaAction } from "@/features/categorias/actions/editar-categoria";
import type { Categoria } from "@/features/categorias/types";

export function useGestionCategorias(initialCategorias: Categoria[]) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [categorias, setCategorias] = React.useState<Categoria[]>(initialCategorias);

  React.useEffect(() => {
    setCategorias(initialCategorias);
  }, [initialCategorias]);

  // Estados de modales
  const [isNewCategoryOpen, setIsNewCategoryOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<Categoria | null>(null);

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

        toast({
          title: "Categoría creada",
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
        toast({
          variant: "destructive",
          title: "Error al crear la categoría",
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

        toast({
          title: "Categoría actualizada",
          description: `La categoría "${result.nombre}" ha sido actualizada.`,
        });

        setEditingCategory(null);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Ha ocurrido un error inesperado";
        toast({
          variant: "destructive",
          title: "Error al actualizar la categoría",
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
    handleCreateCategory,
    handleEditCategory,
  };
}
