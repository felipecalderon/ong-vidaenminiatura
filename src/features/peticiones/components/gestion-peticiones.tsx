"use client";

import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
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
import type { PeticionConRelaciones } from "@/features/peticiones/types";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { useGestionPeticiones } from "../hooks/use-gestion-peticiones";
import { DescargarFirmasExcelButton } from "./descargar-firmas-excel-button";
import { EditarPeticionDialog } from "./editar-peticion-dialog";

interface GestionPeticionesProps {
  initialPeticiones: PeticionConRelaciones[];
  categorias: { id: string; nombre: string }[];
}

export function GestionPeticiones({
  initialPeticiones,
  categorias,
}: GestionPeticionesProps) {
  const {
    peticiones,
    isPending,
    editingPeticion,
    setEditingPeticion,
    handleStatusChange,
    handleDeletePeticion,
  } = useGestionPeticiones(initialPeticiones);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-tight">
          Gestión de Peticiones
        </h2>
      </div>

      <div className="border border-outline-variant bg-card dark:">
        <Table>
          <TableHeader className="bg-muted border-b border-outline-variant">
            <TableRow>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Petición
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Creador
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Firmas
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Estado
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peticiones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center font-bold">
                  No hay peticiones registradas.
                </TableCell>
              </TableRow>
            ) : (
              peticiones.map((peticion) => (
                <TableRow
                  key={peticion.id}
                  className="border-b border-outline-variant/10"
                >
                  <TableCell>
                    <div>
                      <p className="font-bold text-foreground line-clamp-1">
                        {peticion.titulo}
                      </p>
                      {peticion.categoria && (
                        <span
                          className="inline-block text-[10px] font-extrabold px-2 py-0.5 mt-1 border uppercase rounded"
                          style={{
                            borderColor: peticion.categoria.color || undefined,
                          }}
                        >
                          {peticion.categoria.nombre}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-sm">
                    {peticion.usuario?.nombre || (
                      <span className="italic text-muted-foreground text-xs">
                        Desconocido
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {peticion.cantidad_firmas} / {peticion.meta_firmas}
                  </TableCell>
                  <TableCell>
                    <Select
                      disabled={isPending}
                      value={peticion.estado}
                      onValueChange={(val) =>
                        handleStatusChange(peticion.id, val as EstadoPeticion)
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
                      <Button
                        onClick={() => setEditingPeticion(peticion)}
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card hover:bg-muted dark:"
                        title="Editar petición"
                      >
                        <Edit className="size-3.5" />
                      </Button>
                      <DescargarFirmasExcelButton
                        peticionId={peticion.id}
                        tituloPeticion={peticion.titulo}
                        cantidadFirmas={peticion.cantidad_firmas}
                      />
                      <Button
                        onClick={() => handleDeletePeticion(peticion.id)}
                        disabled={isPending}
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card text-destructive hover:bg-destructive/10 dark:"
                        title="Eliminar petición"
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

      {editingPeticion && (
        <EditarPeticionDialog
          peticion={editingPeticion}
          open={!!editingPeticion}
          onOpenChange={(open) => !open && setEditingPeticion(null)}
          categorias={categorias}
          onSuccess={() => setEditingPeticion(null)}
        />
      )}
    </div>
  );
}
