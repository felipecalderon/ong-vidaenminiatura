export type LineaTextoGrafico = {
  x: number;
  baselineY: number;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  letterSpacing: number;
  color: string;
  texto: string;
};

export type InfoSvgGrafico = {
  elemento: SVGSVGElement;
  x: number;
  y: number;
  ancho: number;
  alto: number;
  viewBox: string;
};

export type MedidasGrafico = {
  ancho: number;
  alto: number;
  svg: InfoSvgGrafico | null;
  lineas: LineaTextoGrafico[];
};

export type TipoEscalaGrafico = "logo" | "ancho-total" | "alto-total" | "auto";

export type OpcionesExportacionGrafico = {
  nombreArchivo?: string;
  tamanoBase?: number;
  tipoEscala?: TipoEscalaGrafico;
};

export const escaparXml = (valor: string): string =>
  valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const aColorHex = (color: string): string => {
  if (typeof window === "undefined") return color;
  const canvas = document.createElement("canvas");
  const contexto = canvas.getContext("2d");
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

export const descargarBlob = (blob: Blob, nombreArchivo: string): void => {
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const medirElementoGrafico = (
  elemento: HTMLElement,
): MedidasGrafico | null => {
  if (!elemento) return null;

  const rectElemento = elemento.getBoundingClientRect();
  if (rectElemento.width === 0 || rectElemento.height === 0) return null;

  const svgEncontrado =
    elemento instanceof SVGSVGElement
      ? elemento
      : elemento.querySelector("svg");

  let infoSvg: InfoSvgGrafico | null = null;

  if (svgEncontrado) {
    const rectSvg = svgEncontrado.getBoundingClientRect();
    const viewBox =
      svgEncontrado.getAttribute("viewBox") ||
      `0 0 ${rectSvg.width || 24} ${rectSvg.height || 24}`;

    infoSvg = {
      elemento: svgEncontrado,
      x: rectSvg.left - rectElemento.left,
      y: rectSvg.top - rectElemento.top,
      ancho: rectSvg.width,
      alto: rectSvg.height,
      viewBox,
    };
  }

  let maxDerecha = rectElemento.width;

  if (infoSvg) {
    maxDerecha = Math.max(maxDerecha, infoSvg.x + infoSvg.ancho);
  }

  const spans = Array.from(elemento.querySelectorAll("span"));
  const lineas: LineaTextoGrafico[] = [];

  if (spans.length > 0) {
    const canvasMedicion = document.createElement("canvas");
    const contextoMedicion = canvasMedicion.getContext("2d");

    if (contextoMedicion) {
      for (const span of spans) {
        const rect = span.getBoundingClientRect();
        const estilo = window.getComputedStyle(span);
        const texto = estilo.textTransform.includes("uppercase")
          ? (span.textContent ?? "").toUpperCase()
          : (span.textContent ?? "");

        if (!texto.trim()) continue;

        const fontSize = Number.parseFloat(estilo.fontSize) || 16;
        contextoMedicion.font = `${estilo.fontWeight} ${estilo.fontSize} ${estilo.fontFamily}`;

        const espaciado =
          estilo.letterSpacing === "normal" || !estilo.letterSpacing
            ? 0
            : Number.parseFloat(estilo.letterSpacing) || 0;

        const ctxConEspaciado = contextoMedicion as CanvasRenderingContext2D & {
          letterSpacing?: string;
        };
        if (typeof ctxConEspaciado.letterSpacing === "string") {
          ctxConEspaciado.letterSpacing = `${espaciado}px`;
        }

        const metrica = contextoMedicion.measureText(texto);
        const ascent = metrica.actualBoundingBoxAscent || fontSize * 0.8;
        const descent = metrica.actualBoundingBoxDescent || fontSize * 0.2;

        const xInicio = rect.left - rectElemento.left;
        const anchoMedido = metrica.width;
        const boundingBoxRight = metrica.actualBoundingBoxRight || anchoMedido;
        // Holgura tipográfica para evitar cortes de glifos en curvas o terminales (ej. 's')
        const holguraGlifo = Math.max(6, Math.ceil(fontSize * 0.08));
        const finDerechaTexto =
          xInicio +
          Math.max(rect.width, anchoMedido, boundingBoxRight) +
          holguraGlifo;

        if (finDerechaTexto > maxDerecha) {
          maxDerecha = finDerechaTexto;
        }

        lineas.push({
          x: xInicio,
          baselineY:
            rect.top - rectElemento.top + (rect.height + ascent - descent) / 2,
          fontSize,
          fontWeight: estilo.fontWeight,
          fontFamily: estilo.fontFamily,
          letterSpacing: espaciado,
          color: aColorHex(estilo.color),
          texto,
        });
      }
    }
  }

  if (!infoSvg && lineas.length === 0) {
    return null;
  }

  return {
    ancho: Math.ceil(maxDerecha),
    alto: Math.ceil(rectElemento.height),
    svg: infoSvg,
    lineas,
  };
};

export const calcularFactorEscala = (
  medidas: MedidasGrafico,
  tamanoBase = 1024,
  tipoEscala: TipoEscalaGrafico = "auto",
): number => {
  if (
    (tipoEscala === "logo" || (tipoEscala === "auto" && medidas.svg)) &&
    medidas.svg &&
    medidas.svg.ancho > 0
  ) {
    return tamanoBase / medidas.svg.ancho;
  }

  if (tipoEscala === "alto-total" && medidas.alto > 0) {
    return tamanoBase / medidas.alto;
  }

  if (medidas.ancho > 0) {
    return tamanoBase / medidas.ancho;
  }

  return 1;
};

export const construirSvgString = (
  medidas: MedidasGrafico,
  opciones?: OpcionesExportacionGrafico,
): string | null => {
  const tamanoBase = opciones?.tamanoBase ?? 1024;
  const escala = calcularFactorEscala(
    medidas,
    tamanoBase,
    opciones?.tipoEscala ?? "auto",
  );

  const ancho = Math.ceil(medidas.ancho * escala);
  const alto = Math.ceil(medidas.alto * escala);

  let svgMarkup = "";
  if (medidas.svg) {
    const anchoSvg = Math.ceil(medidas.svg.ancho * escala);
    const altoSvg = Math.ceil(medidas.svg.alto * escala);
    const xSvg = (medidas.svg.x * escala).toFixed(2);
    const ySvg = (medidas.svg.y * escala).toFixed(2);

    const atributosSvg = Array.from(medidas.svg.elemento.attributes)
      .filter(
        (attr) =>
          !["width", "height", "xmlns", "viewBox", "x", "y"].includes(
            attr.name,
          ),
      )
      .map((attr) => `${attr.name}="${attr.value}"`)
      .join(" ");

    svgMarkup = `<svg ${atributosSvg} xmlns="http://www.w3.org/2000/svg" x="${xSvg}" y="${ySvg}" width="${anchoSvg}" height="${altoSvg}" viewBox="${medidas.svg.viewBox}">${medidas.svg.elemento.innerHTML}</svg>`;
  }

  const textoMarkup = medidas.lineas
    .map((linea) => {
      const x = (linea.x * escala).toFixed(2);
      const y = (linea.baselineY * escala).toFixed(2);
      const fontSize = (linea.fontSize * escala).toFixed(2);
      const letterSpacing = (linea.letterSpacing * escala).toFixed(2);
      return `<text x="${x}" y="${y}" font-family="${escaparXml(linea.fontFamily)}" font-size="${fontSize}" font-weight="${linea.fontWeight}" letter-spacing="${letterSpacing}" fill="${escaparXml(linea.color)}">${escaparXml(linea.texto)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">${svgMarkup}${textoMarkup}</svg>`;
};

const dibujarTextoEnCanvas = (
  contexto: CanvasRenderingContext2D,
  linea: LineaTextoGrafico,
  escala: number,
) => {
  const x = linea.x * escala;
  const y = linea.baselineY * escala;
  const espaciado = linea.letterSpacing * escala;

  contexto.font = `${linea.fontWeight} ${(linea.fontSize * escala).toFixed(2)}px ${linea.fontFamily}`;
  contexto.fillStyle = linea.color;
  contexto.textAlign = "left";
  contexto.textBaseline = "alphabetic";

  const ctxConEspaciado = contexto as CanvasRenderingContext2D & {
    letterSpacing?: string;
  };
  const tieneLetterSpacing = typeof ctxConEspaciado.letterSpacing === "string";

  if (tieneLetterSpacing) {
    ctxConEspaciado.letterSpacing = `${espaciado}px`;
  }

  contexto.fillText(linea.texto, x, y);

  if (tieneLetterSpacing) {
    ctxConEspaciado.letterSpacing = "0px";
  }
};

export const generarPngBlob = async (
  medidas: MedidasGrafico,
  opciones?: OpcionesExportacionGrafico,
): Promise<Blob | null> => {
  if (typeof document === "undefined") return null;

  await document.fonts.ready;

  const tamanoBase = opciones?.tamanoBase ?? 1024;
  const escala = calcularFactorEscala(
    medidas,
    tamanoBase,
    opciones?.tipoEscala ?? "auto",
  );

  const ancho = Math.ceil(medidas.ancho * escala);
  const alto = Math.ceil(medidas.alto * escala);

  const canvas = document.createElement("canvas");
  canvas.width = ancho;
  canvas.height = alto;
  const contexto = canvas.getContext("2d");

  if (!contexto) return null;

  contexto.imageSmoothingEnabled = true;
  contexto.imageSmoothingQuality = "high";

  // Si tiene SVG, lo convertimos a imagen para dibujarlo en el Canvas
  if (medidas.svg) {
    const svgXml = new XMLSerializer().serializeToString(medidas.svg.elemento);
    const urlSvg = URL.createObjectURL(
      new Blob([svgXml], { type: "image/svg+xml;charset=utf-8" }),
    );

    try {
      const imagenSvg = await new Promise<HTMLImageElement>(
        (resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () =>
            reject(new Error("Error al cargar SVG en canvas"));
          img.src = urlSvg;
        },
      );

      const xSvg = Math.round(medidas.svg.x * escala);
      const ySvg = Math.round(medidas.svg.y * escala);
      const anchoSvg = Math.ceil(medidas.svg.ancho * escala);
      const altoSvg = Math.ceil(medidas.svg.alto * escala);

      contexto.drawImage(imagenSvg, xSvg, ySvg, anchoSvg, altoSvg);
    } finally {
      URL.revokeObjectURL(urlSvg);
    }
  }

  // Dibujar las líneas de texto si las hay
  for (const linea of medidas.lineas) {
    dibujarTextoEnCanvas(contexto, linea, escala);
  }

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
};
