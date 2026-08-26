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
import { publicarRecursoEducativoAction } from "@/features/recursos-educativos/actions/publicar-recurso-educativo";
import {
  formatearEstado,
  formatearFecha,
  formatearTipo,
} from "@/features/recursos-educativos/lib/formateadores";
import type { RecursoEducativoConRelaciones } from "@/features/recursos-educativos/types";

interface MisRecursosEducativosTableProps {
  recursosEducativos: RecursoEducativoConRelaciones[];
  esAdmin: boolean;
}

export function MisRecursosEducativosTable({
  recursosEducativos,
  esAdmin,
}: MisRecursosEducativosTableProps) {
  const router = useRouter();
  const [publicandoId, setPublicandoId] = useState<string | null>(null);

  const handlePublicar = async (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que quieres publicar este recurso educativo? Una vez publicado será visible para todos.",
      )
    ) {
      return;
    }

    setPublicandoId(id);
    const result = await publicarRecursoEducativoAction(id);

    if (result.success) {
      alert("¡Recurso educativo publicado con éxito!");
      router.refresh();
    } else {
      alert(
        result.error || "Ocurrió un error al publicar el recurso educativo.",
      );
    }

    setPublicandoId(null);
  };

  if (recursosEducativos.length === 0) {
    return (
      <div className="text-center p-8 border border-outline-variant dark:">
        <p className="text-lg font-bold mb-4">
          No tienes recursos educativos creados aún.
        </p>
        <Link href="/aprende/crear">
          <Button className="border border-outline-variant font-bold hover: dark: dark:hover:">
            Crear Nuevo Recurso
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
              Publicado
            </TableHead>
            <TableHead className="text-right font-bold text-black dark:text-white">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recursosEducativos.map((recurso) => (
            <TableRow
              key={recurso.id}
              className="border-b border-outline-variant/20"
            >
              <TableCell
                className="font-medium max-w-55 truncate"
                title={recurso.titulo}
              >
                {recurso.titulo}
              </TableCell>
              {esAdmin && (
                <TableCell>{recurso.autor?.nombre || "Desconocido"}</TableCell>
              )}
              <TableCell>
                <Badge
                  className="border border-outline-variant font-bold"
                  variant="secondary"
                >
                  {formatearTipo(recurso.tipo)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    recurso.estado === "PUBLICADA" ? "default" : "secondary"
                  }
                  className={
                    recurso.estado === "REVISION"
                      ? "border border-amber-500 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      : undefined
                  }
                >
                  {formatearEstado(recurso.estado)}
                </Badge>
              </TableCell>
              <TableCell>{formatearFecha(recurso.fecha_publicacion)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/aprende/${recurso.slug}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/aprende/${recurso.slug}/editar`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  {recurso.estado === "BORRADOR" && (
                    <Button
                      variant="default"
                      size="icon"
                      className="border border-outline-variant dark: hover:shadow-none"
                      onClick={() => handlePublicar(recurso.id)}
                      disabled={publicandoId === recurso.id}
                    >
                      {publicandoId === recurso.id ? (
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
