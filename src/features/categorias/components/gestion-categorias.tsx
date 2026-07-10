"use client";

import { Edit2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGestionCategorias } from "../hooks/use-gestion-categorias";
import type { Categoria } from "../types";
import { CrearCategoriaDialog } from "./crear-categoria-dialog";
import { EditarCategoriaDialog } from "./editar-categoria-dialog";

interface GestionCategoriasProps {
  initialCategorias: Categoria[];
}

export function GestionCategorias({
  initialCategorias,
}: GestionCategoriasProps) {
  const {
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
  } = useGestionCategorias(initialCategorias);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-tight">
          Lista de Categorías
        </h2>
        <Button
          onClick={() => setIsNewCategoryOpen(true)}
          className="flex items-center gap-2 border border-outline-variant font-bold hover: dark: dark:hover:"
        >
          <Plus className="size-4" />
          Nueva Categoría
        </Button>
      </div>

      <div className="border border-outline-variant bg-card dark:">
        <Table>
          <TableHeader className="bg-muted border-b border-outline-variant">
            <TableRow>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Color
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Nombre
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Slug
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Descripción
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Estado
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase text-right">
                Acción
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorias.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center font-bold">
                  No hay categorías registradas.
                </TableCell>
              </TableRow>
            ) : (
              categorias.map((categoria) => (
                <TableRow
                  key={categoria.id}
                  className="border-b border-outline-variant/10"
                >
                  <TableCell>
                    <div
                      className="size-6 border border-outline-variant dark:"
                      style={{ backgroundColor: categoria.color ?? "#ccc" }}
                    />
                  </TableCell>
                  <TableCell className="font-bold text-foreground">
                    {categoria.nombre}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {categoria.slug}
                  </TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-xs">
                    {categoria.descripcion || (
                      <span className="italic text-xs">Sin descripción</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`border border-outline-variant font-extrabold ${
                        categoria.activo
                          ? "bg-green-300 text-black hover:bg-green-300"
                          : "bg-red-300 text-black hover:bg-red-300"
                      }`}
                    >
                      {categoria.activo ? "ACTIVO" : "INACTIVO"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleOpenEdit(categoria)}
                      variant="ghost"
                      size="icon"
                      className="border border-outline-variant bg-card hover:bg-muted dark:"
                    >
                      <Edit2 className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CrearCategoriaDialog
        open={isNewCategoryOpen}
        onOpenChange={setIsNewCategoryOpen}
        nombre={newCatName}
        onNombreChange={setNewCatName}
        descripcion={newCatDesc}
        onDescripcionChange={setNewCatDesc}
        color={newCatColor}
        onColorChange={setNewCatColor}
        isPending={isPending}
        onSubmit={handleCreateCategory}
      />

      <EditarCategoriaDialog
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
        nombre={editCatName}
        onNombreChange={setEditCatName}
        descripcion={editCatDesc}
        onDescripcionChange={setEditCatDesc}
        color={editCatColor}
        onColorChange={setEditCatColor}
        activo={editCatActive}
        onActivoChange={setEditCatActive}
        isPending={isPending}
        onSubmit={handleEditCategory}
      />
    </div>
  );
}
