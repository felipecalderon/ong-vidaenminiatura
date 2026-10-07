"use client";

import { Edit2, Plus, Trash2 } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
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
import { EliminarCategoriaDialog } from "./eliminar-categoria-dialog";

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
  } = useGestionCategorias(initialCategorias);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Categorías"
        description="Organiza el contenido con etiquetas coherentes y fáciles de encontrar."
      >
        <Button
          onClick={() => setIsNewCategoryOpen(true)}
          className="flex items-center gap-2 font-semibold"
        >
          <Plus className="size-4" />
          Nueva Categoría
        </Button>
      </AdminHeader>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-card">
        <Table className={categorias.length > 0 ? "min-w-[900px]" : undefined}>
          <TableHeader className="bg-surface-container/70">
            <TableRow>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Color
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Nombre
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Slug
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Descripción
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Estado
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground text-right">
                Acción
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorias.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-36 px-4 text-center text-sm text-muted-foreground"
                >
                  No hay categorías registradas.
                </TableCell>
              </TableRow>
            ) : (
              categorias.map((categoria) => (
                <TableRow
                  key={categoria.id}
                  className="border-b border-outline-variant/70"
                >
                  <TableCell>
                    <div
                      className="size-6 rounded-sm border border-outline-variant"
                      role="img"
                      aria-label={`Color de ${categoria.nombre}: ${categoria.color ?? "#ccc"}`}
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
                          ? "border-emerald-700/20 bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/10 dark:text-emerald-300"
                          : "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/10"
                      }`}
                    >
                      {categoria.activo ? "ACTIVO" : "INACTIVO"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-1.5">
                      <Button
                        onClick={() => handleOpenEdit(categoria)}
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card hover:bg-muted"
                        aria-label={`Editar categoría: ${categoria.nombre}`}
                        title="Editar categoría"
                      >
                        <Edit2 className="size-3.5" />
                      </Button>
                      <Button
                        onClick={() => handleOpenDelete(categoria)}
                        disabled={isPending || categorias.length <= 1}
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card text-destructive hover:bg-destructive/10"
                        aria-label={
                          categorias.length <= 1
                            ? "No se puede eliminar la última categoría"
                            : `Eliminar categoría: ${categoria.nombre}`
                        }
                        title={
                          categorias.length <= 1
                            ? "No se puede eliminar la última categoría"
                            : "Eliminar categoría"
                        }
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
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

      <EliminarCategoriaDialog
        open={!!deletingCategory}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingCategory(null);
            setConteos(null);
            setConteosError(null);
            setReemplazoCategoriaId("");
          }
        }}
        categoria={deletingCategory}
        categorias={categorias}
        conteos={conteos}
        conteosError={conteosError}
        reemplazoId={reemplazoCategoriaId}
        onReemplazoChange={setReemplazoCategoriaId}
        isPending={isPending}
        onConfirm={handleDeleteCategory}
      />
    </div>
  );
}
