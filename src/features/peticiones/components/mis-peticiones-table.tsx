"use client";

import { Edit, Eye, Trash2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  eliminarPeticionAction, 
  publicarPeticionAction 
} from "@/features/peticiones/actions";
import { EditarPeticionForm } from "./editar-peticion-form";

type PeticionConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  estado: string;
  resumen: string;
  contenido: string;
  imagen: string | null;
  categoriaId: string;
  meta_firmas: number;
  cantidad_firmas: number;
  categoria: {
    nombre: string;
    color: string;
  } | null;
  usuario?: {
    id: string;
    nombre: string;
  } | null;
};

interface MisPeticionesTableProps {
  peticiones: PeticionConRelaciones[];
  esAdmin: boolean;
  categorias: { id: string; nombre: string }[];
}

export function MisPeticionesTable({
  peticiones,
  esAdmin,
  categorias,
}: MisPeticionesTableProps) {
  const router = useRouter();
  const [eliminandoId, setEliminandoId] = useState<string | null>(null);
  const [publicandoId, setPublicandoId] = useState<string | null>(null);
  const [peticionSeleccionada, setPeticionSeleccionada] = useState<PeticionConRelaciones | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleEliminar = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta petición?")) {
      return;
    }

    setEliminandoId(id);
    const result = await eliminarPeticionAction(id);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Ocurrió un error al eliminar la petición.");
    }
    setEliminandoId(null);
  };

  const handlePublicar = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres publicar esta petición? Una vez publicada será visible para todos.")) {
      return;
    }

    setPublicandoId(id);
    const result = await publicarPeticionAction(id);

    if (result.success) {
      alert("¡Petición publicada con éxito!");
      setModalAbierto(false);
      router.refresh();
    } else {
      alert(result.error || "Ocurrió un error al publicar la petición.");
    }
    setPublicandoId(null);
  };

  const abrirModal = (peticion: PeticionConRelaciones) => {
    setPeticionSeleccionada(peticion);
    setModalAbierto(true);
  };

  if (peticiones.length === 0) {
    return (
      <div className="text-center p-8 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <p className="text-lg font-bold mb-4">
          No tienes peticiones creadas aún.
        </p>
        <Link href="/peticiones/crear">
          <Button className="border-2 border-black dark:border-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            Crear Nueva Petición
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <Table>
          <TableHeader className="bg-secondary border-b-4 border-black dark:border-white">
            <TableRow>
              <TableHead className="font-bold text-black dark:text-white">
                Título
              </TableHead>
              {esAdmin && (
                <TableHead className="font-bold text-black dark:text-white">
                  Usuario
                </TableHead>
              )}
              <TableHead className="font-bold text-black dark:text-white">
                Categoría
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white">
                Estado
              </TableHead>
              <TableHead className="text-right font-bold text-black dark:text-white">
                Firmas
              </TableHead>
              <TableHead className="text-right font-bold text-black dark:text-white">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peticiones.map((peticion) => (
              <TableRow
                key={peticion.id}
                className="border-b border-black/20 dark:border-white/20"
              >
                <TableCell
                  className="font-medium max-w-[200px] truncate"
                  title={peticion.titulo}
                >
                  {peticion.titulo}
                </TableCell>
                {esAdmin && (
                  <TableCell>
                    {peticion.usuario?.nombre || "Desconocido"}
                  </TableCell>
                )}
                <TableCell>
                  {peticion.categoria ? (
                    <Badge
                      style={{ backgroundColor: peticion.categoria.color }}
                      className="border-2 border-black dark:border-white font-bold"
                    >
                      {peticion.categoria.nombre}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      peticion.estado === "PUBLICADA" ? "default" : "secondary"
                    }
                  >
                    {peticion.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-bold">
                  {peticion.cantidad_firmas.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/peticiones/${peticion.slug}`}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => abrirModal(peticion)}
                      className="border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                      onClick={() => handleEliminar(peticion.id)}
                      disabled={eliminandoId === peticion.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] w-full max-w-[95vw] sm:max-w-[700px] max-h-[85vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">Editar Petición</DialogTitle>
            <DialogDescription>
              Modifica los campos necesarios y guarda los cambios.
            </DialogDescription>
          </DialogHeader>
          
          {peticionSeleccionada && (
            <div className="space-y-8 mt-2">
              {peticionSeleccionada.estado === "BORRADOR" && (
                <div className="bg-primary/10 border-4 border-primary p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg text-primary truncate">¡Lista para publicar!</h3>
                    <p className="text-sm">Esta petición es un borrador. Publícala cuando hayas terminado de editarla.</p>
                  </div>
                  <Button 
                    className="w-full sm:w-auto font-bold border-2 border-black py-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex-shrink-0"
                    onClick={() => handlePublicar(peticionSeleccionada.id)}
                    disabled={publicandoId === peticionSeleccionada.id}
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Publicar Ahora
                  </Button>
                </div>
              )}

              <EditarPeticionForm 
                peticion={peticionSeleccionada} 
                categorias={categorias} 
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
