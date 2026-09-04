"use client";

import { FileCode, ImageDown, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { LogoIcon } from "@/components/compartido/logo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useExportarGrafico } from "@/hooks/use-exportar-grafico";

type VarianteExportacion = "completo" | "logo" | "texto";

interface InfoVariante {
  titulo: string;
  descripcion: string;
  nombreArchivoSvg: string;
  nombreArchivoPng: string;
}

const VARIANTES_CONFIG: Record<VarianteExportacion, InfoVariante> = {
  completo: {
    titulo: "Logo completo",
    descripcion:
      "El logo y el texto en la misma proporción y alineación de la vista previa.",
    nombreArchivoSvg: "logo-mas-insectos.svg",
    nombreArchivoPng: "logo-mas-insectos.png",
  },
  logo: {
    titulo: "Solo isotipo",
    descripcion:
      "Solo el icono del insecto, vectorizado y escalado a 1024 px sin texto.",
    nombreArchivoSvg: "isotipo-mas-insectos.svg",
    nombreArchivoPng: "isotipo-mas-insectos.png",
  },
  texto: {
    titulo: "Solo tipografía",
    descripcion:
      "Solo la marca tipográfica 'Más Insectos' con su espaciado y colores corporativos.",
    nombreArchivoSvg: "texto-mas-insectos.svg",
    nombreArchivoPng: "texto-mas-insectos.png",
  },
};

export function ExportarLogo() {
  const [variante, setVariante] = useState<VarianteExportacion>("completo");
  const { elementoRef, exportando, tipoExportando, exportarSVG, exportarPNG } =
    useExportarGrafico({
      tamanoBase: 1024,
    });

  const configActual = VARIANTES_CONFIG[variante];

  const handleDescargarSvg = () => {
    exportarSVG({
      nombreArchivo: configActual.nombreArchivoSvg,
    });
  };

  const handleDescargarPng = () => {
    exportarPNG({
      nombreArchivo: configActual.nombreArchivoPng,
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="space-y-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
          Recursos digitales
        </p>
        <h1 className="text-balance text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Logo Más Insectos
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-on-surface-variant">
          Versión estática sin animación y con fondo transparente, lista para
          documentos, presentaciones, redes y material de difusión.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <Tabs
          value={variante}
          onValueChange={(valor) => setVariante(valor as VarianteExportacion)}
        >
          <TabsList>
            <TabsTrigger value="completo">Logo + Texto</TabsTrigger>
            <TabsTrigger value="logo">Solo Logo</TabsTrigger>
            <TabsTrigger value="texto">Solo Texto</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-outline-variant bg-surface shadow-sm">
        <div
          className="flex min-h-65 items-center justify-center border-b border-outline-variant/60 px-6 py-16 sm:py-20"
          style={{
            backgroundColor: "#ffffff",
            backgroundImage:
              "linear-gradient(45deg, #e4e4e7 25%, transparent 25%, transparent 75%, #e4e4e7 75%), linear-gradient(45deg, #e4e4e7 25%, transparent 25%, transparent 75%, #e4e4e7 75%)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 8px 8px",
          }}
        >
          {/* Elemento medido y exportado según la variante seleccionada */}
          <div ref={elementoRef} key={variante}>
            {variante === "completo" && (
              <div className="group flex items-center gap-3 pr-2">
                <div className="flex items-center justify-center text-primary">
                  <LogoIcon size={120} animated={false} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[2rem] font-extrabold uppercase tracking-[0.12em] text-green-600">
                    Más
                  </span>
                  <span className="text-[5rem] font-black tracking-[-0.06em]">
                    Insectos
                  </span>
                </div>
              </div>
            )}

            {variante === "logo" && (
              <div className="group flex items-center justify-center text-primary">
                <LogoIcon size={140} animated={false} />
              </div>
            )}

            {variante === "texto" && (
              <div className="group flex flex-col leading-none pr-2">
                <span className="text-[2rem] font-extrabold uppercase tracking-[0.12em] text-green-600">
                  Más
                </span>
                <span className="text-[5rem] font-black tracking-[-0.06em]">
                  Insectos
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {configActual.titulo}
            </p>
            <p className="mt-1 text-sm text-on-surface-variant">
              {configActual.descripcion}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={handleDescargarSvg}
              disabled={exportando}
              aria-label={`Descargar ${configActual.titulo} en SVG`}
            >
              {exportando && tipoExportando === "svg" ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <FileCode className="size-4" />
              )}
              SVG
            </Button>
            <Button
              onClick={handleDescargarPng}
              disabled={exportando}
              aria-label={`Descargar ${configActual.titulo} en PNG a 1024 píxeles`}
            >
              {exportando && tipoExportando === "png" ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <ImageDown className="size-4" />
              )}
              {exportando && tipoExportando === "png"
                ? "Generando…"
                : "PNG · 1024 px"}
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-on-surface-variant">
        SVG vectorial · PNG con escala nítida a 1024 px · fondo transparente
      </p>
    </div>
  );
}
