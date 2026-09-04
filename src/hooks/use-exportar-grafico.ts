"use client";

import { type RefObject, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import {
  construirSvgString,
  descargarBlob,
  generarPngBlob,
  medirElementoGrafico,
  type OpcionesExportacionGrafico,
  type TipoEscalaGrafico,
} from "@/lib/exportar-grafico";

export type ParametrosExportarGrafico = {
  elementoRef?: RefObject<HTMLElement | null>;
  nombreArchivoPorDefecto?: string;
  tamanoBase?: number;
  tipoEscala?: TipoEscalaGrafico;
};

export type OpcionesDescargaGrafico = OpcionesExportacionGrafico & {
  elemento?: HTMLElement | null;
};

export function useExportarGrafico(parametros?: ParametrosExportarGrafico) {
  const refInterna = useRef<HTMLDivElement>(null);
  const [exportando, setExportando] = useState(false);
  const [tipoExportando, setTipoExportando] = useState<"svg" | "png" | null>(
    null,
  );

  const obtenerElementoObjetivo = useCallback(
    (elementoSobrescrito?: HTMLElement | null): HTMLElement | null => {
      if (elementoSobrescrito) return elementoSobrescrito;
      if (parametros?.elementoRef?.current)
        return parametros.elementoRef.current;
      return refInterna.current;
    },
    [parametros?.elementoRef],
  );

  const exportarSVG = useCallback(
    async (opciones?: OpcionesDescargaGrafico): Promise<boolean> => {
      const elemento = obtenerElementoObjetivo(opciones?.elemento);
      if (!elemento) {
        toast.error("No se encontró el elemento gráfico para exportar.");
        return false;
      }

      setExportando(true);
      setTipoExportando("svg");

      try {
        if (typeof document !== "undefined" && document.fonts) {
          await document.fonts.ready;
        }

        const medidas = medirElementoGrafico(elemento);
        if (!medidas) {
          toast.error("El elemento aún no está listo. Recarga la página.");
          return false;
        }

        const tamanoBase =
          opciones?.tamanoBase ?? parametros?.tamanoBase ?? 1024;
        const tipoEscala =
          opciones?.tipoEscala ?? parametros?.tipoEscala ?? "auto";
        const nombreArchivo =
          opciones?.nombreArchivo ??
          parametros?.nombreArchivoPorDefecto ??
          "grafico.svg";

        const marcado = construirSvgString(medidas, {
          tamanoBase,
          tipoEscala,
        });

        if (!marcado) {
          toast.error("No se pudo generar el SVG.");
          return false;
        }

        const blob = new Blob([marcado], {
          type: "image/svg+xml;charset=utf-8",
        });
        descargarBlob(blob, nombreArchivo);
        toast.success("SVG descargado exitosamente");
        return true;
      } catch (error) {
        console.error("Error al exportar SVG:", error);
        toast.error("Ocurrió un error al generar el SVG.");
        return false;
      } finally {
        setExportando(false);
        setTipoExportando(null);
      }
    },
    [
      obtenerElementoObjetivo,
      parametros?.tamanoBase,
      parametros?.tipoEscala,
      parametros?.nombreArchivoPorDefecto,
    ],
  );

  const exportarPNG = useCallback(
    async (opciones?: OpcionesDescargaGrafico): Promise<boolean> => {
      const elemento = obtenerElementoObjetivo(opciones?.elemento);
      if (!elemento) {
        toast.error("No se encontró el elemento gráfico para exportar.");
        return false;
      }

      setExportando(true);
      setTipoExportando("png");

      try {
        if (typeof document !== "undefined" && document.fonts) {
          await document.fonts.ready;
        }

        const medidas = medirElementoGrafico(elemento);
        if (!medidas) {
          toast.error("El elemento aún no está listo. Recarga la página.");
          return false;
        }

        const tamanoBase =
          opciones?.tamanoBase ?? parametros?.tamanoBase ?? 1024;
        const tipoEscala =
          opciones?.tipoEscala ?? parametros?.tipoEscala ?? "auto";
        const nombreArchivo =
          opciones?.nombreArchivo ??
          parametros?.nombreArchivoPorDefecto ??
          "grafico.png";

        const blob = await generarPngBlob(medidas, {
          tamanoBase,
          tipoEscala,
        });

        if (!blob) {
          toast.error("No se pudo generar el archivo PNG.");
          return false;
        }

        descargarBlob(blob, nombreArchivo);
        toast.success("PNG descargado exitosamente");
        return true;
      } catch (error) {
        console.error("Error al exportar PNG:", error);
        toast.error("Ocurrió un error al generar el PNG.");
        return false;
      } finally {
        setExportando(false);
        setTipoExportando(null);
      }
    },
    [
      obtenerElementoObjetivo,
      parametros?.tamanoBase,
      parametros?.tipoEscala,
      parametros?.nombreArchivoPorDefecto,
    ],
  );

  return {
    elementoRef: refInterna,
    exportando,
    tipoExportando,
    exportarSVG,
    exportarPNG,
  };
}
