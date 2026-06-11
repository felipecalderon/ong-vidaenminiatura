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
import { publicarNoticiaAction } from "@/features/noticias/actions";

type NoticiaConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  estado: string;
  fecha_publicacion: string | null;
  categoria: {
    nombre: string;
    color: string | null;
  } | null;
  autor?: {
    id: string;
    nombre: string;
  } | null;
};

interface MisNoticiasTableProps {
  noticias: NoticiaConRelaciones[];
  esAdmin: boolean;
}

function formatearEstado(estado: string) {
  switch (estado) {
    case "BORRADOR":
      return "Borrador";
    case "PUBLICADA":
      return "Publicada";
    case "ARCHIVADA":
      return "Archivada";
    default:
      return estado;
  }
}

function formatearFecha(fecha: string | null) {
  if (!fecha) return "-";

  return new Date(fecha).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function MisNoticiasTable({ noticias, esAdmin }: MisNoticiasTableProps) {
  const router = useRouter();
  const [publicandoId, setPublicandoId] = useState<string | null>(null);

  const handlePublicar = async (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que quieres publicar esta noticia? Una vez publicada será visible para todos.",
      )
    ) {
      return;
    }

    setPublicandoId(id);
    const result = await publicarNoticiaAction(id);

    if (result.success) {
      alert("¡Noticia publicada con éxito!");
      router.refresh();
    } else {
      alert(result.error || "Ocurrió un error al publicar la noticia.");
    }

    setPublicandoId(null);
  };

  if (noticias.length === 0) {
    return (
      <div className="text-center p-8 border border-outline-variant dark:">
        <p className="text-lg font-bold mb-4">
          No tienes noticias creadas aún.
        </p>
        <Link href="/noticias/crear">
          <Button className="border border-outline-variant font-bold transition-all hover: dark: dark:hover:">
            Crear Nueva Noticia
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
              Categoría
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
          {noticias.map((noticia) => (
            <TableRow
              key={noticia.id}
              className="border-b border-outline-variant/20"
            >
              <TableCell
                className="font-medium max-w-[220px] truncate"
                title={noticia.titulo}
              >
                {noticia.titulo}
              </TableCell>
              {esAdmin && (
                <TableCell>{noticia.autor?.nombre || "Desconocido"}</TableCell>
              )}
              <TableCell>
                {noticia.categoria ? (
                  <Badge
                    style={{
                      backgroundColor: noticia.categoria.color ?? undefined,
                    }}
                    className="border border-outline-variant font-bold"
                  >
                    {noticia.categoria.nombre}
                  </Badge>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    noticia.estado === "PUBLICADA" ? "default" : "secondary"
                  }
                >
                  {formatearEstado(noticia.estado)}
                </Badge>
              </TableCell>
              <TableCell>{formatearFecha(noticia.fecha_publicacion)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/noticias/${noticia.slug}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none transition-all"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/noticias/${noticia.slug}/editar`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none transition-all"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  {noticia.estado === "BORRADOR" && (
                    <Button
                      variant="default"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none transition-all"
                      onClick={() => handlePublicar(noticia.id)}
                      disabled={publicandoId === noticia.id}
                    >
                      {publicandoId === noticia.id ? (
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
