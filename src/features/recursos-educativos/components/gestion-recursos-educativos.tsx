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
import type { RecursoEducativoConRelaciones } from "@/features/recursos-educativos/types";
import { EstadoRecursoEducativo } from "@/features/recursos-educativos/types";
import { useGestionRecursosEducativos } from "../hooks/use-gestion-recursos-educativos";
import { formatearTipo } from "../lib/formateadores";

interface GestionRecursosEducativosProps {
  initialRecursosEducativos: RecursoEducativoConRelaciones[];
}

export function GestionRecursosEducativos({
  initialRecursosEducativos,
}: GestionRecursosEducativosProps) {
  const {
    recursosEducativos,
    isPending,
    handleStatusChange,
    handleDeleteRecursoEducativo,
  } = useGestionRecursosEducativos(initialRecursosEducativos);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-tight">
          Gestión de Recursos Educativos
        </h2>
        <Button
          asChild
          variant="outline"
          className="border border-outline-variant"
        >
          <Link href="/aprende/crear">Nuevo recurso</Link>
        </Button>
      </div>

      <div className="border border-outline-variant bg-card dark:">
        <Table>
          <TableHeader className="bg-muted border-b border-outline-variant">
            <TableRow>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Recurso educativo
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Tipo
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Autor
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
            {recursosEducativos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center font-bold">
                  No hay recursos educativos registrados.
                </TableCell>
              </TableRow>
            ) : (
              recursosEducativos.map((recurso) => (
                <TableRow
                  key={recurso.id}
                  className="border-b border-outline-variant/10"
                >
                  <TableCell>
                    <p className="font-bold text-foreground line-clamp-1">
                      {recurso.titulo}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 border uppercase rounded">
                      {formatearTipo(recurso.tipo)}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-sm">
                    {recurso.autor?.nombre || (
                      <span className="italic text-muted-foreground text-xs">
                        Desconocido
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      disabled={isPending}
                      value={recurso.estado}
                      onValueChange={(val) =>
                        handleStatusChange(
                          recurso.id,
                          val as EstadoRecursoEducativo,
                        )
                      }
                    >
                      <SelectTrigger className="w-36 border border-outline-variant font-semibold bg-background dark:">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border border-outline-variant bg-popover font-semibold">
                        <SelectItem value={EstadoRecursoEducativo.BORRADOR}>
                          BORRADOR
                        </SelectItem>
                        <SelectItem value={EstadoRecursoEducativo.REVISION}>
                          REVISIÓN
                        </SelectItem>
                        <SelectItem value={EstadoRecursoEducativo.PUBLICADA}>
                          PUBLICADA
                        </SelectItem>
                        <SelectItem value={EstadoRecursoEducativo.ARCHIVADA}>
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
                        title="Ver recurso educativo"
                      >
                        <Link href={`/aprende/${recurso.slug}`} target="_blank">
                          <Eye className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card hover:bg-muted dark:"
                        title="Editar recurso educativo"
                      >
                        <Link href={`/aprende/${recurso.slug}/editar`}>
                          <Edit className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDeleteRecursoEducativo(recurso.id)}
                        disabled={isPending}
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card text-destructive hover:bg-destructive/10 dark:"
                        title="Eliminar recurso educativo"
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
    </div>
  );
}
