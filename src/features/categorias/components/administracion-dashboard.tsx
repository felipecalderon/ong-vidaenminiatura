"use client";

import { Edit2, Plus, Settings, User } from "lucide-react";
import * as React from "react";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  crearCategoriaAction,
  editarCategoriaAction,
} from "@/features/categorias/actions";
import type { Categoria } from "@/features/categorias/types";
// Acciones del servidor
import {
  actualizarRolAction,
  cambiarEstadoUsuarioAction,
} from "@/features/usuarios/actions";
import type {
  Usuario,
  UsuarioAutenticadoResumen,
} from "@/features/usuarios/types";
import { EstadoUsuario, Rol } from "@/generated/prisma/enums";

interface AdministracionDashboardProps {
  initialUsuarios: Usuario[];
  initialCategorias: Categoria[];
  currentUser: UsuarioAutenticadoResumen;
}

export function AdministracionDashboard({
  initialUsuarios,
  initialCategorias,
  currentUser,
}: AdministracionDashboardProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Estados locales optimistas/reactivos
  const [usuarios, setUsuarios] = React.useState<Usuario[]>(initialUsuarios);
  const [categorias, setCategorias] =
    React.useState<Categoria[]>(initialCategorias);

  React.useEffect(() => {
    setUsuarios(initialUsuarios);
  }, [initialUsuarios]);

  React.useEffect(() => {
    setCategorias(initialCategorias);
  }, [initialCategorias]);

  // Estados de modales
  const [isNewCategoryOpen, setIsNewCategoryOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] =
    React.useState<Categoria | null>(null);

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
          description: `La categoría"${result.nombre}"ha sido creada exitosamente.`,
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
          description: `La categoría"${result.nombre}"ha sido actualizada.`,
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

  return (
    <div className="w-full">
      <Tabs defaultValue="categorias" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2 border border-outline-variant bg-background p-1 dark:">
          <TabsTrigger
            value="categorias"
            className="flex items-center gap-2 text-sm font-bold uppercase transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Settings className="size-4" />
            Categorías
          </TabsTrigger>
          <TabsTrigger
            value="usuarios"
            className="flex items-center gap-2 text-sm font-bold uppercase transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <User className="size-4" />
            Usuarios
          </TabsTrigger>
        </TabsList>

        {/* CONTENIDO CATEGORIAS */}
        <TabsContent value="categorias" className="space-y-4">
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
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center font-bold"
                    >
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
                          <span className="italic text-xs">
                            Sin descripción
                          </span>
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
        </TabsContent>

        {/* CONTENIDO USUARIOS */}
        <TabsContent value="usuarios" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-tight">
              Gestión de Usuarios
            </h2>
          </div>

          <div className="border border-outline-variant bg-card dark:">
            <Table>
              <TableHeader className="bg-muted border-b border-outline-variant">
                <TableRow>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase">
                    Usuario
                  </TableHead>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase">
                    Correo
                  </TableHead>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase">
                    Rol
                  </TableHead>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase">
                    Estado
                  </TableHead>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase text-right">
                    Acciones de Estado
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((user) => {
                  const esPropio = user.id === currentUser.id;
                  return (
                    <TableRow
                      key={user.id}
                      className="border-b border-outline-variant/10"
                    >
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="size-8 border border-outline-variant dark:">
                          <AvatarImage src={user.picture ?? undefined} />
                          <AvatarFallback className="font-extrabold">
                            {user.nombre.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-foreground">
                            {user.nombre}
                            {""}
                            {esPropio && (
                              <span className="text-xs text-primary font-extrabold">
                                (Tú)
                              </span>
                            )}
                          </p>
                          {user.nickname && (
                            <p className="text-xs text-muted-foreground">
                              @{user.nickname}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {user.correo}
                      </TableCell>
                      <TableCell>
                        <Select
                          disabled={esPropio || isPending}
                          value={user.rol}
                          onValueChange={(val) =>
                            handleRoleChange(user.id, val as Rol)
                          }
                        >
                          <SelectTrigger className="w-[160px] border border-outline-variant font-semibold bg-background dark:">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border border-outline-variant bg-popover font-semibold">
                            <SelectItem value={Rol.USUARIO}>USUARIO</SelectItem>
                            <SelectItem value={Rol.AUTOR}>AUTOR</SelectItem>
                            <SelectItem value={Rol.ADMINISTRADOR}>
                              ADMINISTRADOR
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`border border-outline-variant font-extrabold ${
                            user.estado === EstadoUsuario.ACTIVO
                              ? "bg-green-300 text-black hover:bg-green-300"
                              : "bg-red-300 text-black hover:bg-red-300"
                          }`}
                        >
                          {user.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Select
                          disabled={esPropio || isPending}
                          value={user.estado}
                          onValueChange={(val) =>
                            handleStatusChange(user.id, val as EstadoUsuario)
                          }
                        >
                          <SelectTrigger className="w-[140px] ml-auto border border-outline-variant font-semibold bg-background dark:">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border border-outline-variant bg-popover font-semibold">
                            <SelectItem value={EstadoUsuario.ACTIVO}>
                              ACTIVO
                            </SelectItem>
                            <SelectItem value={EstadoUsuario.SUSPENDIDO}>
                              SUSPENDIDO
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

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
                  className="border border-outline-variant font-mono dark: max-w-[120px]"
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
                    className="border border-outline-variant font-mono dark: max-w-[120px]"
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
