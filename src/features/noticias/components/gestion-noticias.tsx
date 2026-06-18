"use client";

import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
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
import { EstadoNoticia } from "@/generated/prisma/enums";
import { useGestionNoticias } from "../hooks/use-gestion-noticias";

type NoticiaConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  estado: EstadoNoticia;
  resumen: string;
  contenido: string;
  imagen: string | null;
  categoria_id: string;
  categoria: {
    nombre: string;
    color: string | null;
  } | null;
  autor?: {
    id: string;
    nombre: string;
  } | null;
};

interface GestionNoticiasProps {
  initialNoticias: NoticiaConRelaciones[];
}

export function GestionNoticias({ initialNoticias }: GestionNoticiasProps) {
  const { noticias, isPending, handleStatusChange, handleDeleteNoticia } =
    useGestionNoticias(initialNoticias);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-tight">
          Gestión de Noticias
        </h2>
      </div>

      <div className="border border-outline-variant bg-card dark:">
        <Table>
          <TableHeader className="bg-muted border-b border-outline-variant">
            <TableRow>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Noticia
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
            {noticias.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center font-bold">
                  No hay noticias registradas.
                </TableCell>
              </TableRow>
            ) : (
              noticias.map((noticia) => (
                <TableRow
                  key={noticia.id}
                  className="border-b border-outline-variant/10"
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
                      <SelectTrigger className="w-36 border border-outline-variant font-semibold bg-background dark:">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border border-outline-variant bg-popover font-semibold">
                        <SelectItem value={EstadoNoticia.BORRADOR}>
                          BORRADOR
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
                        className="border border-outline-variant bg-card hover:bg-muted dark:"
                        title="Ver noticia"
                      >
                        <Link href={`/noticias/${noticia.slug}`} target="_blank">
                          <Eye className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="border border-outline-variant bg-card hover:bg-muted dark:"
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
                        className="border border-outline-variant bg-card text-destructive hover:bg-destructive/10 dark:"
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
