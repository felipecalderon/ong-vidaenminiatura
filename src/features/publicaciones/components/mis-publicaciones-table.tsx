"use client";

import { CheckCircle, Edit, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { publicarPublicacionAction } from "@/features/publicaciones/actions/publicar-publicacion";
import {
  formatearEstado,
  formatearFecha,
  formatearTipo,
} from "@/features/publicaciones/lib/formateadores";
import type { PublicacionConRelaciones } from "@/features/publicaciones/types";

interface MisPublicacionesTableProps {
  publicaciones: PublicacionConRelaciones[];
  esAdmin: boolean;
}

export function MisPublicacionesTable({
  publicaciones,
  esAdmin,
}: MisPublicacionesTableProps) {
  const router = useRouter();
  const [publicandoId, setPublicandoId] = useState<string | null>(null);

  const handlePublicar = async (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que quieres publicar esta publicación? Una vez publicada será visible para todos.",
      )
    ) {
      return;
    }

    setPublicandoId(id);
    const result = await publicarPublicacionAction(id);

    if (result.success) {
      alert("¡Publicación publicada con éxito!");
      router.refresh();
    } else {
      alert(result.error || "Ocurrió un error al publicar la publicación.");
    }

    setPublicandoId(null);
  };

  if (publicaciones.length === 0) {
    return (
      <div className="text-center p-8 border border-outline-variant dark:">
        <p className="text-lg font-bold mb-4">
          No tienes publicaciones creadas aún.
        </p>
        <Link href="/investigacion/crear">
          <Button className="border border-outline-variant font-bold hover: dark: dark:hover:">
            Crear Nueva Publicación
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-outline-variant dark:">
      <Table>
        <TableHeader className="bg-secondary border-b border-outline-variant">
          <TableRow>
            <TableHead className="font-bold text-black dark:text-white">
              Título
            </TableHead>
            {esAdmin && (
              <TableHead className="font-bold text-black dark:text-white">
                Autor
              </TableHead>
            )}
            <TableHead className="font-bold text-black dark:text-white">
              Tipo
            </TableHead>
            <TableHead className="font-bold text-black dark:text-white">
              Estado
            </TableHead>
            <TableHead className="font-bold text-black dark:text-white">
              Publicada
            </TableHead>
            <TableHead className="text-right font-bold text-black dark:text-white">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publicaciones.map((publicacion) => (
            <TableRow
              key={publicacion.id}
              className="border-b border-outline-variant/20"
            >
              <TableCell
                className="font-medium max-w-55 truncate"
                title={publicacion.titulo}
              >
                {publicacion.titulo}
              </TableCell>
              {esAdmin && (
                <TableCell>
                  {publicacion.autor?.nombre || "Desconocido"}
                </TableCell>
              )}
              <TableCell>
                <Badge
                  className="border border-outline-variant font-bold"
                  variant="secondary"
                >
                  {formatearTipo(publicacion.tipo)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    publicacion.estado === "PUBLICADA" ? "default" : "secondary"
                  }
                  className={
                    publicacion.estado === "REVISION"
                      ? "border border-amber-500 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      : undefined
                  }
                >
                  {formatearEstado(publicacion.estado)}
                </Badge>
              </TableCell>
              <TableCell>
                {formatearFecha(publicacion.fecha_publicacion)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/investigacion/${publicacion.slug}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/investigacion/${publicacion.slug}/editar`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  {publicacion.estado === "BORRADOR" && (
                    <Button
                      variant="default"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none"
                      onClick={() => handlePublicar(publicacion.id)}
                      disabled={publicandoId === publicacion.id}
                    >
                      {publicandoId === publicacion.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
