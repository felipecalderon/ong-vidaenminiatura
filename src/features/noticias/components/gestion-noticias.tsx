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
import {
  EstadoNoticia,
  type NoticiaConRelaciones,
} from "@/features/noticias/types";
import { useGestionNoticias } from "../hooks/use-gestion-noticias";

interface GestionNoticiasProps {
  initialNoticias: NoticiaConRelaciones[];
}

export function GestionNoticias({ initialNoticias }: GestionNoticiasProps) {
  const { noticias, isPending, handleStatusChange, handleDeleteNoticia } =
    useGestionNoticias(initialNoticias);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Noticias"
        description="Revisa las publicaciones, actualiza su estado y conserva el contenido vigente."
      >
        <Button
          asChild
          variant="outline"
          className="border border-outline-variant"
        >
          <Link href="/noticias/crear">Nueva noticia</Link>
        </Button>
      </AdminHeader>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-card">
        <Table className={noticias.length > 0 ? "min-w-[720px]" : undefined}>
          <TableHeader className="bg-surface-container/70">
            <TableRow>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Noticia
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
            {noticias.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-36 px-4 text-center text-sm text-muted-foreground"
                >
                  No hay noticias registradas.
                </TableCell>
              </TableRow>
            ) : (
              noticias.map((noticia) => (
                <TableRow
                  key={noticia.id}
                  className="border-b border-outline-variant/70"
                >
                  <TableCell>
                    <div>
                      <p className="font-bold text-foreground line-clamp-1">
                        {noticia.titulo}
                      </p>
                      {noticia.categoria && (
                        <span
                          className="inline-block text-[10px] font-extrabold px-2 py-0.5 mt-1 border uppercase rounded"
                          style={{
                            borderColor: noticia.categoria.color || undefined,
                          }}
                        >
                          {noticia.categoria.nombre}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-sm">
                    {noticia.autor?.nombre || (
                      <span className="italic text-muted-foreground text-xs">
                        Desconocido
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      disabled={isPending}
                      value={noticia.estado}
                      onValueChange={(val) =>
                        handleStatusChange(noticia.id, val as EstadoNoticia)
                      }
                    >
                      <SelectTrigger
                        aria-label={`Estado de la noticia: ${noticia.titulo}`}
                        className="w-36 border border-outline-variant bg-background font-medium"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border border-outline-variant bg-popover font-semibold">
                        <SelectItem value={EstadoNoticia.BORRADOR}>
                          BORRADOR
                        </SelectItem>
                        <SelectItem value={EstadoNoticia.REVISION}>
                          REVISIÓN
                        </SelectItem>
                        <SelectItem value={EstadoNoticia.PUBLICADA}>
                          PUBLICADA
                        </SelectItem>
                        <SelectItem value={EstadoNoticia.ARCHIVADA}>
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
                        title="Ver noticia"
                      >
                        <Link
                          href={`/noticias/${noticia.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver noticia: ${noticia.titulo} (se abre en una pestaña nueva)`}
                        >
                          <Eye className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card hover:bg-muted"
                        aria-label={`Editar noticia: ${noticia.titulo}`}
                        title="Editar noticia"
                      >
                        <Link href={`/noticias/${noticia.slug}/editar`}>
                          <Edit className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDeleteNoticia(noticia.id)}
                        disabled={isPending}
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card text-destructive hover:bg-destructive/10"
                        aria-label={`Eliminar noticia: ${noticia.titulo}`}
                        title="Eliminar noticia"
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
