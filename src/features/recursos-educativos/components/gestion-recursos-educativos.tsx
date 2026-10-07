"use client";

import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
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
    <div className="space-y-6">
      <AdminHeader
        title="Recursos educativos"
        description="Mantén organizados los materiales para aprender y compartir."
      >
        <Button
          asChild
          variant="outline"
          className="border border-outline-variant"
        >
          <Link href="/aprende/crear">Nuevo recurso</Link>
        </Button>
      </AdminHeader>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-card">
        <Table
          className={
            recursosEducativos.length > 0 ? "min-w-[840px]" : undefined
          }
        >
          <TableHeader className="bg-surface-container/70">
            <TableRow>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Recurso educativo
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Tipo
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Autor
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Estado
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recursosEducativos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-36 px-4 text-center text-sm text-muted-foreground"
                >
                  No hay recursos educativos registrados.
                </TableCell>
              </TableRow>
            ) : (
              recursosEducativos.map((recurso) => (
                <TableRow
                  key={recurso.id}
                  className="border-b border-outline-variant/70"
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
                      <SelectTrigger
                        aria-label={`Estado del recurso: ${recurso.titulo}`}
                        className="w-36 border border-outline-variant bg-background font-medium"
                      >
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
                        className="border border-outline-variant bg-card hover:bg-muted"
                        title="Ver recurso educativo"
                      >
                        <Link
                          href={`/aprende/${recurso.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver recurso educativo: ${recurso.titulo} (se abre en una pestaña nueva)`}
                        >
                          <Eye className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card hover:bg-muted"
                        aria-label={`Editar recurso educativo: ${recurso.titulo}`}
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
                        className="border border-outline-variant bg-card text-destructive hover:bg-destructive/10"
                        aria-label={`Eliminar recurso educativo: ${recurso.titulo}`}
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
