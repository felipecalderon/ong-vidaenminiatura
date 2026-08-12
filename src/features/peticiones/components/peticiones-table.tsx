"use client";

import { Edit, Eye, RotateCcw, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { actualizarEstadoPeticionAction } from "@/features/peticiones/actions/actualizar-estado-peticion";
import { eliminarPeticionAction } from "@/features/peticiones/actions/eliminar-peticion";
import { publicarPeticionAction } from "@/features/peticiones/actions/publicar-peticion";
import { DescargarFirmasExcelButton } from "@/features/peticiones/components/descargar-firmas-excel-button";
import type { PeticionConRelaciones } from "@/features/peticiones/types";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { EditarPeticionDialog } from "./editar-peticion-dialog";

interface PeticionesTableProps {
  peticiones: PeticionConRelaciones[];
  categorias: { id: string; nombre: string }[];
  esAdmin: boolean;
  emptyCtaHref?: string;
  emptyCtaLabel?: string;
}

export function PeticionesTable({
  peticiones,
  categorias,
  esAdmin,
  emptyCtaHref,
  emptyCtaLabel,
}: PeticionesTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [eliminandoId, setEliminandoId] = useState<string | null>(null);
  const [publicandoId, setPublicandoId] = useState<string | null>(null);
  const [reabriendoId, setReabriendoId] = useState<string | null>(null);
  const [cerrandoId, setCerrandoId] = useState<string | null>(null);
  const [peticionSeleccionada, setPeticionSeleccionada] =
    useState<PeticionConRelaciones | null>(null);
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
    if (
      !confirm(
        "¿Estás seguro de que quieres publicar esta petición? Una vez publicada será visible para todos.",
      )
    ) {
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

  const handleCerrar = async (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que quieres cerrar esta petición? Ya no se podrán recibir firmas.",
      )
    ) {
      return;
    }

    setCerrandoId(id);
    const result = await actualizarEstadoPeticionAction(
      id,
      EstadoPeticion.CERRADA,
    );

    if (result.success) {
      alert("¡Petición cerrada con éxito!");
      router.refresh();
    } else {
      alert(result.error || "Ocurrió un error al cerrar la petición.");
    }
    setCerrandoId(null);
  };

  const handleReabrir = async (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que quieres reabrir esta petición? Volverá a estar visible públicamente.",
      )
    ) {
      return;
    }

    setReabriendoId(id);
    const result = await actualizarEstadoPeticionAction(
      id,
      EstadoPeticion.PUBLICADA,
    );

    if (result.success) {
      alert("¡Petición reabierta con éxito!");
      router.refresh();
    } else {
      alert(result.error || "Ocurrió un error al reabrir la petición.");
    }
    setReabriendoId(null);
  };

  const abrirModal = (peticion: PeticionConRelaciones) => {
    setPeticionSeleccionada(peticion);
    setModalAbierto(true);
  };

  const handleEstadoChange = (id: string, nuevoEstado: EstadoPeticion) => {
    startTransition(async () => {
      const result = await actualizarEstadoPeticionAction(id, nuevoEstado);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "No se pudo cambiar el estado.");
      }
    });
  };

  if (peticiones.length === 0) {
    return (
      <div className="text-center p-8 border border-outline-variant dark:">
        <p className="text-lg font-bold mb-4">No hay peticiones registradas.</p>
        {emptyCtaHref && emptyCtaLabel && (
          <Link href={emptyCtaHref}>
            <Button className="border border-outline-variant font-bold hover: dark: dark:hover:">
              {emptyCtaLabel}
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto border border-outline-variant dark:">
        <Table>
          <TableHeader className="bg-secondary border-b border-outline-variant">
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
                className="border-b border-outline-variant/20"
              >
                <TableCell
                  className="font-medium max-w-50 truncate"
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
                      style={{
                        borderColor: peticion.categoria.color ?? undefined,
                      }}
                      className="border border-outline-variant font-bold"
                    >
                      {peticion.categoria.nombre}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {esAdmin ? (
                    <Select
                      disabled={isPending}
                      value={peticion.estado}
                      onValueChange={(val) =>
                        handleEstadoChange(peticion.id, val as EstadoPeticion)
                      }
                    >
                      <SelectTrigger className="w-36 border border-outline-variant font-semibold bg-background dark:">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border border-outline-variant bg-popover font-semibold">
                        <SelectItem value={EstadoPeticion.BORRADOR}>
                          BORRADOR
                        </SelectItem>
                        <SelectItem value={EstadoPeticion.REVISION}>
                          REVISIÓN
                        </SelectItem>
                        <SelectItem value={EstadoPeticion.PUBLICADA}>
                          PUBLICADA
                        </SelectItem>
                        <SelectItem value={EstadoPeticion.CERRADA}>
                          CERRADA
                        </SelectItem>
                        <SelectItem value={EstadoPeticion.ARCHIVADA}>
                          ARCHIVADA
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      variant={
                        peticion.estado === EstadoPeticion.PUBLICADA
                          ? "default"
                          : "secondary"
                      }
                      className={
                        peticion.estado === EstadoPeticion.REVISION
                          ? "border border-amber-500 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          : undefined
                      }
                    >
                      {peticion.estado === EstadoPeticion.REVISION
                        ? "En Revisión"
                        : peticion.estado}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {peticion.cantidad_firmas.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-1.5">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="border border-outline-variant bg-card hover:bg-muted dark:"
                      title="Ver petición"
                    >
                      <Link
                        href={`/peticiones/${peticion.slug}`}
                        target="_blank"
                      >
                        <Eye className="size-3.5" />
                      </Link>
                    </Button>
                    {esAdmin && (
                      <DescargarFirmasExcelButton
                        peticionId={peticion.id}
                        tituloPeticion={peticion.titulo}
                        cantidadFirmas={peticion.cantidad_firmas}
                      />
                    )}
                    {peticion.estado === EstadoPeticion.PUBLICADA && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="border border-outline-variant hover:border-red-500 hover:text-red-500 dark: hover:shadow-none"
                        onClick={() => handleCerrar(peticion.id)}
                        disabled={cerrandoId === peticion.id}
                        title="Cerrar petición"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                    {esAdmin && peticion.estado === EstadoPeticion.CERRADA && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="border border-outline-variant hover:border-primary hover:text-primary dark: hover:shadow-none"
                        onClick={() => handleReabrir(peticion.id)}
                        disabled={reabriendoId === peticion.id}
                        title="Reabrir petición"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      onClick={() => abrirModal(peticion)}
                      variant="outline"
                      size="icon"
                      className="border border-outline-variant bg-card hover:bg-muted dark:"
                      title="Editar petición"
                    >
                      <Edit className="size-3.5" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none"
                      onClick={() => handleEliminar(peticion.id)}
                      disabled={eliminandoId === peticion.id}
                      title="Eliminar petición"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {peticionSeleccionada && (
        <EditarPeticionDialog
          peticion={peticionSeleccionada}
          open={modalAbierto}
          onOpenChange={setModalAbierto}
          categorias={categorias}
          onPublicar={handlePublicar}
          publicandoId={publicandoId}
        />
      )}
    </>
  );
}
