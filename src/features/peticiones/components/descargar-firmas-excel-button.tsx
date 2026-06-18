"use client";

import * as XLSX from "xlsx";
import { Download, Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { obtenerFirmasDePeticion } from "@/features/firmas/queries/obtener-firmas-de-peticion";

interface DescargarFirmasExcelButtonProps {
  peticionId: string;
  tituloPeticion: string;
  cantidadFirmas: number;
}

export function DescargarFirmasExcelButton({
  peticionId,
  tituloPeticion,
  cantidadFirmas,
}: DescargarFirmasExcelButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const firmas = await obtenerFirmasDePeticion(peticionId);

      if (!firmas || firmas.length === 0) {
        alert("Esta petición no tiene firmas registradas.");
        return;
      }

      const filas = firmas.map((firma, index) => ({
        "#": index + 1,
        Nombre: firma.usuario.nombre,
        Correo: firma.usuario.correo,
        "Fecha de firma": new Date(firma.fecha_creacion).toLocaleString(
          "es-ES",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          },
        ),
      }));

      const hoja = XLSX.utils.json_to_sheet(filas);

      // Ajustar anchos de columna
      hoja["!cols"] = [
        { wch: 5 },
        { wch: 35 },
        { wch: 40 },
        { wch: 22 },
      ];

      const libro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libro, hoja, "Firmas");

      const nombreArchivo = `firmas_${tituloPeticion
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .slice(0, 50)}.xlsx`;

      XLSX.writeFile(libro, nombreArchivo);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading || cantidadFirmas === 0}
      variant="ghost"
      size="icon"
      className="border border-outline-variant bg-card hover:bg-muted dark:"
      title="Descargar firmas en Excel"
    >
      {isLoading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Download className="size-3.5" />
      )}
    </Button>
  );
}
