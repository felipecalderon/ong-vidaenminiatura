"use client";

import { Edit2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useGestionCategorias } from "../hooks/use-gestion-categorias";
import type { Categoria } from "../types";

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

      {/* MODAL CREAR CATEGORÍA */}
      <Dialog open={isNewCategoryOpen} onOpenChange={setIsNewCategoryOpen}>
        <DialogContent className="border border-outline-variant bg-background p-6 dark: max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold uppercase text-foreground">
              Nueva Categoría
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCategory} className="space-y-4 mt-2">
            <div className="space-y-2">
              <label
                htmlFor="create-name"
                className="text-sm font-bold uppercase"
              >
                Nombre
              </label>
              <Input
                id="create-name"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="Nombre de la categoría"
                className="border border-outline-variant font-semibold dark:"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="create-description"
                className="text-sm font-bold uppercase"
              >
                Descripción
              </label>
              <Textarea
                id="create-description"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="Breve descripción de la categoría"
                className="border border-outline-variant font-semibold dark:"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="create-color"
                className="text-sm font-bold uppercase block"
              >
                Color Identificador
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="create-color"
                  type="color"
                  value={newCatColor}
                  onChange={(e) => setNewCatColor(e.target.value)}
                  className="size-10 border border-outline-variant dark: cursor-pointer"
                />
                <Input
                  value={newCatColor}
                  onChange={(e) => setNewCatColor(e.target.value)}
                  className="border border-outline-variant font-mono dark: max-w-30"
                />
              </div>
            </div>
            <DialogFooter className="pt-4 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewCategoryOpen(false)}
                className="border border-outline-variant font-bold dark:"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="border border-outline-variant font-bold dark:"
              >
                {isPending ? "Creando..." : "Crear Categoría"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL EDITAR CATEGORÍA */}
      <Dialog
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
      >
        <DialogContent className="border border-outline-variant bg-background p-6 dark: max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold uppercase text-foreground">
              Editar Categoría
            </DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <form onSubmit={handleEditCategory} className="space-y-4 mt-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold uppercase">
                  Nombre
                </label>
                <Input
                  id="name"
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  placeholder="Nombre de la categoría"
                  className="border border-outline-variant font-semibold dark:"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-bold uppercase"
                >
                  Descripción
                </label>
                <Textarea
                  id="description"
                  value={editCatDesc}
                  onChange={(e) => setEditCatDesc(e.target.value)}
                  placeholder="Breve descripción de la categoría"
                  className="border border-outline-variant font-semibold dark:"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="color-id"
                  className="text-sm font-bold uppercase block"
                >
                  Color Identificador
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="color-id"
                    type="color"
                    value={editCatColor}
                    onChange={(e) => setEditCatColor(e.target.value)}
                    className="size-10 border border-outline-variant dark: cursor-pointer"
                  />
                  <Input
                    value={editCatColor}
                    onChange={(e) => setEditCatColor(e.target.value)}
                    className="border border-outline-variant font-mono dark: max-w-30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="activation-status"
                  className="text-sm font-bold uppercase block"
                >
                  Estado de Activación
                </label>
                <Select
                  value={editCatActive ? "active" : "inactive"}
                  onValueChange={(val) => setEditCatActive(val === "active")}
                >
                  <SelectTrigger
                    id="activation-status"
                    className="w-full border border-outline-variant font-semibold bg-background dark:"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border border-outline-variant bg-popover font-semibold">
                    <SelectItem value="active">ACTIVO</SelectItem>
                    <SelectItem value="inactive">INACTIVO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="pt-4 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingCategory(null)}
                  className="border border-outline-variant font-bold dark:"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="border border-outline-variant font-bold dark:"
                >
                  {isPending ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
