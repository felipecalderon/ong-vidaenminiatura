"use client";

import { FileCode, ImageDown, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { LogoIcon } from "@/components/compartido/logo";
import { Button } from "@/components/ui/button";

/** Alto del logo (px) en el archivo exportado; el resto escala con la misma proporción de la vista previa. */
const TAMANO_LOGO_EXPORTACION = 1024;

type LineaTexto = {
  x: number;
  baselineY: number;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  letterSpacing: number;
  color: string;
  texto: string;
};

type MedidasComposicion = {
  ancho: number;
  alto: number;
  anchoLogo: number;
  altoLogo: number;
  lineas: LineaTexto[];
};

const escaparXml = (valor: string) =>
  valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const aColorHex = (color: string) => {
  const contexto = document.createElement("canvas").getContext("2d");
  if (!contexto) return color;
  contexto.fillStyle = color;
  contexto.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = contexto.getImageData(0, 0, 1, 1).data;
  if (a === 255) {
    return `#${[r, g, b]
      .map((valor) => valor.toString(16).padStart(2, "0"))
      .join("")}`;
  }
  return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
};

const dibujarTexto = (
  contexto: CanvasRenderingContext2D,
  linea: LineaTexto,
  escala: number,
) => {
  const x = linea.x * escala;
  const y = linea.baselineY * escala;
  const espaciado = linea.letterSpacing * escala;

  contexto.letterSpacing = `${espaciado}px`;
  contexto.fillText(linea.texto, x, y);
  contexto.letterSpacing = "0px";
};

export function ExportarLogo() {
  const contenedorSvgRef = useRef<HTMLDivElement>(null);
  const composicionRef = useRef<HTMLDivElement>(null);
  const [generandoPNG, setGenerandoPNG] = useState(false);

  const obtenerSvg = () =>
    contenedorSvgRef.current?.querySelector("svg") ?? null;

  const medirComposicion = (): MedidasComposicion | null => {
    const composicion = composicionRef.current;
    const logo = obtenerSvg();
    if (!composicion || !logo) return null;

    const rectComposicion = composicion.getBoundingClientRect();
    const svgVistaPrevia = composicion.querySelector("svg");
    const rectLogo = svgVistaPrevia?.getBoundingClientRect();
    if (!rectLogo) return null;

    const contextoMedicion = document.createElement("canvas").getContext("2d");
    if (!contextoMedicion) return null;

    const lineas: LineaTexto[] = Array.from(
      composicion.querySelectorAll("span"),
    ).map((span) => {
      const rect = span.getBoundingClientRect();
      const estilo = getComputedStyle(span);
      const texto = estilo.textTransform.includes("uppercase")
        ? (span.textContent ?? "").toUpperCase()
        : (span.textContent ?? "");
      const fontSize = parseFloat(estilo.fontSize) || 16;

      contextoMedicion.font = `${estilo.fontWeight} ${estilo.fontSize} ${estilo.fontFamily}`;
      const metrica = contextoMedicion.measureText("M");
      const ascent = metrica.actualBoundingBoxAscent || fontSize * 0.8;
      const descent = metrica.actualBoundingBoxDescent || fontSize * 0.2;
      const espaciado =
        estilo.letterSpacing === "normal" || !estilo.letterSpacing
          ? 0
          : parseFloat(estilo.letterSpacing) || 0;

      return {
        x: rect.left - rectComposicion.left,
        baselineY:
          rect.top - rectComposicion.top + (rect.height + ascent - descent) / 2,
        fontSize,
        fontWeight: estilo.fontWeight,
        fontFamily: estilo.fontFamily,
        letterSpacing: espaciado,
        color: aColorHex(estilo.color),
        texto,
      };
    });

    return {
      ancho: rectComposicion.width,
      alto: rectComposicion.height,
      anchoLogo: rectLogo.width,
      altoLogo: rectLogo.height,
      lineas,
    };
  };

  const construirSvgComposicion = (): string | null => {
    const logo = obtenerSvg();
    const medidas = medirComposicion();
    if (!logo || !medidas) return null;

    const escala = TAMANO_LOGO_EXPORTACION / medidas.anchoLogo;
    const ancho = Math.ceil(medidas.ancho * escala);
    const alto = Math.ceil(medidas.alto * escala);
    const anchoLogo = Math.ceil(medidas.anchoLogo * escala);
    const altoLogo = Math.ceil(medidas.altoLogo * escala);

    const atributosLogo = Array.from(logo.attributes)
      .filter(
        (atributo) =>
          !["width", "height", "xmlns", "viewBox"].includes(atributo.name),
      )
      .map((atributo) => `${atributo.name}="${atributo.value}"`)
      .join(" ");

    const logoMarkup = `<svg ${atributosLogo} xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="${anchoLogo}" height="${altoLogo}" viewBox="0 0 24 24">${logo.innerHTML}</svg>`;

    const textoMarkup = medidas.lineas
      .map((linea) => {
        const x = (linea.x * escala).toFixed(2);
        const y = (linea.baselineY * escala).toFixed(2);
        const fontSize = (linea.fontSize * escala).toFixed(2);
        const letterSpacing = (linea.letterSpacing * escala).toFixed(2);
        return `<text x="${x}" y="${y}" font-family="${escaparXml(linea.fontFamily)}" font-size="${fontSize}" font-weight="${linea.fontWeight}" letter-spacing="${letterSpacing}" fill="${escaparXml(linea.color)}">${escaparXml(linea.texto)}</text>`;
      })
      .join("");

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">${logoMarkup}${textoMarkup}</svg>`;
  };

  const descargarArchivo = (blob: Blob, nombreArchivo: string) => {
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombreArchivo;
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const descargarSVG = async () => {
    await document.fonts.ready;
    const marcado = construirSvgComposicion();
    if (!marcado) {
      toast.error("El logo aún no está listo. Recarga la página.");
      return;
    }

    descargarArchivo(
      new Blob([marcado], { type: "image/svg+xml;charset=utf-8" }),
      "logo-mas-insectos.svg",
    );
    toast.success("SVG descargado");
  };

  const descargarPNG = async () => {
    if (generandoPNG) return;
    await document.fonts.ready;

    const logo = obtenerSvg();
    const medidas = medirComposicion();
    if (!logo || !medidas) {
      toast.error("El logo aún no está listo. Recarga la página.");
      return;
    }

    setGenerandoPNG(true);
    const marcadoLogo = new XMLSerializer().serializeToString(logo);
    const urlLogo = URL.createObjectURL(
      new Blob([marcadoLogo], { type: "image/svg+xml;charset=utf-8" }),
    );
    const imagenLogo = new Image();

    const terminar = () => {
      setGenerandoPNG(false);
      URL.revokeObjectURL(urlLogo);
    };

    imagenLogo.onload = () => {
      const escala = TAMANO_LOGO_EXPORTACION / medidas.anchoLogo;
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(medidas.ancho * escala);
      canvas.height = Math.ceil(medidas.alto * escala);
      const contexto = canvas.getContext("2d");

      if (!contexto) {
        terminar();
        toast.error("No se pudo generar el PNG.");
        return;
      }

      contexto.imageSmoothingEnabled = true;
      contexto.imageSmoothingQuality = "high";
      contexto.drawImage(
        imagenLogo,
        0,
        0,
        Math.ceil(medidas.anchoLogo * escala),
        Math.ceil(medidas.altoLogo * escala),
      );

      for (const linea of medidas.lineas) {
        contexto.font = `${linea.fontWeight} ${(linea.fontSize * escala).toFixed(2)}px ${linea.fontFamily}`;
        contexto.fillStyle = linea.color;
        contexto.textAlign = "left";
        contexto.textBaseline = "alphabetic";
        dibujarTexto(contexto, linea, escala);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          descargarArchivo(blob, "logo-mas-insectos.png");
          toast.success("PNG descargado");
        } else {
          toast.error("No se pudo generar el PNG.");
        }
        terminar();
      }, "image/png");
    };

    imagenLogo.onerror = () => {
      terminar();
      toast.error("No se pudo generar el PNG. Inténtalo de nuevo.");
    };

    imagenLogo.src = urlLogo;
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
          La versión estática del logo con su nombre, sin animación y con fondo
          transparente, lista para documentos, redes y material de difusión.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-outline-variant bg-surface shadow-sm">
        <div
          className="flex items-center justify-center border-b border-outline-variant/60 px-6 py-16 sm:py-20"
          style={{
            backgroundColor: "#ffffff",
            backgroundImage:
              "linear-gradient(45deg, #e4e4e7 25%, transparent 25%, transparent 75%, #e4e4e7 75%), linear-gradient(45deg, #e4e4e7 25%, transparent 25%, transparent 75%, #e4e4e7 75%)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 8px 8px",
          }}
        >
          <div
            ref={composicionRef}
            className="group flex items-center gap-3 active:scale-95"
          >
            <div className="flex items-center justify-center text-primary">
              <LogoIcon size={120} animated={false} />{" "}
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
        </div>

        <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Estado neutro
            </p>
            <p className="mt-1 text-sm text-on-surface-variant">
              El archivo sale con el logo y el texto en la misma proporción de
              la vista previa.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={descargarSVG}
              aria-label="Descargar logo con nombre en SVG"
            >
              <FileCode className="size-4" />
              SVG
            </Button>
            <Button
              onClick={descargarPNG}
              disabled={generandoPNG}
              aria-label="Descargar logo con nombre en PNG con el logo a 1024 píxeles"
            >
              {generandoPNG ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <ImageDown className="size-4" />
              )}
              {generandoPNG ? "Generando…" : "PNG · 1024 px"}
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-on-surface-variant">
        SVG vectorial · PNG con logo a 1024 px · fondo transparente
      </p>

      <div aria-hidden="true" className="hidden">
        <div ref={contenedorSvgRef}>
          <LogoIcon size={TAMANO_LOGO_EXPORTACION} animated={false} />
        </div>
      </div>
    </div>
  );
}
