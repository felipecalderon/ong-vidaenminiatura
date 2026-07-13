"use client";

import { Download, Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

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
      const response = await fetch(
        `/api/peticiones/${peticionId}/firmas/excel`,
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage || "No se pudieron exportar las firmas.");
        return;
      }

      const nombreArchivo = `firmas_${tituloPeticion
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .slice(0, 50)}.xlsx`;
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      return;
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
