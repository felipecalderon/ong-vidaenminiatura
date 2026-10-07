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
import type { PublicacionConRelaciones } from "@/features/publicaciones/types";
import { EstadoPublicacion } from "@/features/publicaciones/types";
import { useGestionPublicaciones } from "../hooks/use-gestion-publicaciones";
import { formatearTipo } from "../lib/formateadores";

interface GestionPublicacionesProps {
  initialPublicaciones: PublicacionConRelaciones[];
}

export function GestionPublicaciones({
  initialPublicaciones,
}: GestionPublicacionesProps) {
  const {
    publicaciones,
    isPending,
    handleStatusChange,
    handleDeletePublicacion,
  } = useGestionPublicaciones(initialPublicaciones);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Publicaciones"
        description="Administra estudios, publicaciones y eventos de investigación."
      >
        <Button
          asChild
          variant="outline"
          className="border border-outline-variant"
        >
          <Link href="/investigacion/crear">Nueva publicación</Link>
        </Button>
      </AdminHeader>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-card">
        <Table
          className={publicaciones.length > 0 ? "min-w-[820px]" : undefined}
        >
          <TableHeader className="bg-surface-container/70">
            <TableRow>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Publicación
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
            {publicaciones.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-36 px-4 text-center text-sm text-muted-foreground"
                >
                  No hay publicaciones registradas.
                </TableCell>
              </TableRow>
            ) : (
              publicaciones.map((publicacion) => (
                <TableRow
                  key={publicacion.id}
                  className="border-b border-outline-variant/70"
                >
                  <TableCell>
                    <p className="font-bold text-foreground line-clamp-1">
                      {publicacion.titulo}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 border uppercase rounded">
                      {formatearTipo(publicacion.tipo)}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-sm">
                    {publicacion.autor?.nombre || (
                      <span className="italic text-muted-foreground text-xs">
                        Desconocido
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      disabled={isPending}
                      value={publicacion.estado}
                      onValueChange={(val) =>
                        handleStatusChange(
                          publicacion.id,
                          val as EstadoPublicacion,
                        )
                      }
                    >
                      <SelectTrigger
                        aria-label={`Estado de la publicación: ${publicacion.titulo}`}
                        className="w-36 border border-outline-variant bg-background font-medium"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border border-outline-variant bg-popover font-semibold">
                        <SelectItem value={EstadoPublicacion.BORRADOR}>
                          BORRADOR
                        </SelectItem>
                        <SelectItem value={EstadoPublicacion.REVISION}>
                          REVISIÓN
                        </SelectItem>
                        <SelectItem value={EstadoPublicacion.PUBLICADA}>
                          PUBLICADA
                        </SelectItem>
                        <SelectItem value={EstadoPublicacion.ARCHIVADA}>
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
                        title="Ver publicación"
                      >
                        <Link
                          href={`/investigacion/${publicacion.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver publicación: ${publicacion.titulo} (se abre en una pestaña nueva)`}
                        >
                          <Eye className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card hover:bg-muted"
                        aria-label={`Editar publicación: ${publicacion.titulo}`}
                        title="Editar publicación"
                      >
                        <Link
                          href={`/investigacion/${publicacion.slug}/editar`}
                        >
                          <Edit className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDeletePublicacion(publicacion.id)}
                        disabled={isPending}
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card text-destructive hover:bg-destructive/10"
                        aria-label={`Eliminar publicación: ${publicacion.titulo}`}
                        title="Eliminar publicación"
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
