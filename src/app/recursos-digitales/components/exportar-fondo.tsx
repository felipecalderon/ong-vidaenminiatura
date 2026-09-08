"use client";

import { ImageDown, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { descargarBlob } from "@/lib/exportar-grafico";

// ---------------------------------------------------------------------------
// Configuración del fondo – refleja SiteBackground + tokens de globals.css
// ---------------------------------------------------------------------------

type Modo = "claro" | "oscuro";

interface ConfigModo {
  background: string;
  primary: string;
  tertiary: string;
}

const CONFIGS: Record<Modo, ConfigModo> = {
  claro: {
    background: "#f8fafc",
    primary: "#7c3aed",
    tertiary: "#10b981",
  },
  oscuro: {
    background: "#070414",
    primary: "#c084fc",
    tertiary: "#22d3ee",
  },
};

/** Posicionamiento de insectos expresado como fracción del canvas */
interface InsectConfig {
  src: string;
  tintKey: "primary" | "tertiary";
  /** Centro X como fracción del ancho */
  cx: number;
  /** Centro Y como fracción del alto */
  cy: number;
  /** Ancho como fracción del ancho total del canvas */
  wFrac: number;
  /** Aspect ratio original (ancho / alto) del PNG */
  aspect: number;
  rotateDeg: number;
  opacity: number;
}

const INSECTS: InsectConfig[] = [
  {
    src: "/assets/png/mariposa.png",
    tintKey: "primary",
    cx: 0.13,
    cy: 0.13,
    wFrac: 0.18,
    aspect: 500 / 495,
    rotateDeg: -12,
    opacity: 0.07,
  },
  {
    src: "/assets/png/libelula.png",
    tintKey: "tertiary",
    cx: 0.85,
    cy: 0.14,
    wFrac: 0.2,
    aspect: 500 / 422,
    rotateDeg: 45,
    opacity: 0.07,
  },
  {
    src: "/assets/png/grillo.png",
    tintKey: "tertiary",
    cx: 0.1,
    cy: 0.88,
    wFrac: 0.15,
    aspect: 500 / 700,
    rotateDeg: -80,
    opacity: 0.07,
  },
  {
    src: "/assets/png/hormiga.png",
    tintKey: "primary",
    cx: 0.92,
    cy: 0.82,
    wFrac: 0.09,
    aspect: 500 / 650,
    rotateDeg: 90,
    opacity: 0.07,
  },
  {
    src: "/assets/png/cucaracha.png",
    tintKey: "primary",
    cx: 0.46,
    cy: 0.52,
    wFrac: 0.11,
    aspect: 500 / 557,
    rotateDeg: 12,
    opacity: 0.07,
  },
];

// ---------------------------------------------------------------------------
// Utilidades de canvas
// ---------------------------------------------------------------------------

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

async function cargarImagen(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`No se pudo cargar: ${src}`));
    img.src = src;
  });
}

/**
 * Dibuja un PNG tintado con `color` y la opacidad dada.
 * Técnica: rellena color → recorta con el alpha del PNG (destination-in).
 */
function dibujarInsectoTintado(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  color: string,
  opacity: number,
  cx: number,
  cy: number,
  w: number,
  h: number,
  rotateDeg: number,
) {
  const oc = document.createElement("canvas");
  oc.width = Math.ceil(w);
  oc.height = Math.ceil(h);
  const ot = oc.getContext("2d");
  if (!ot) return;

  ot.fillStyle = color;
  ot.fillRect(0, 0, oc.width, oc.height);
  ot.globalCompositeOperation = "destination-in";
  ot.drawImage(img, 0, 0, oc.width, oc.height);

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(cx, cy);
  ctx.rotate((rotateDeg * Math.PI) / 180);
  ctx.drawImage(oc, -w / 2, -h / 2, w, h);
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Generación del JPEG en Canvas
// ---------------------------------------------------------------------------

async function generarFondoJpeg(
  modo: Modo,
  ancho: number,
  alto: number,
): Promise<Blob | null> {
  const cfg = CONFIGS[modo];

  const canvas = document.createElement("canvas");
  canvas.width = ancho;
  canvas.height = alto;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Fondo base sólido
  ctx.fillStyle = cfg.background;
  ctx.fillRect(0, 0, ancho, alto);

  // 2. Gradientes de ultraviolet-canvas
  const p = hexToRgb(cfg.primary);
  const t = hexToRgb(cfg.tertiary);

  const g1 = ctx.createRadialGradient(
    ancho * 0.12,
    0,
    0,
    ancho * 0.12,
    0,
    Math.min(ancho, alto) * 0.72,
  );
  g1.addColorStop(0, `rgba(${p.r},${p.g},${p.b},0.12)`);
  g1.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, ancho, alto);

  const g2 = ctx.createRadialGradient(
    ancho * 0.88,
    alto * 0.18,
    0,
    ancho * 0.88,
    alto * 0.18,
    Math.min(ancho, alto) * 0.62,
  );
  g2.addColorStop(0, `rgba(${t.r},${t.g},${t.b},0.08)`);
  g2.addColorStop(1, `rgba(${t.r},${t.g},${t.b},0)`);
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, ancho, alto);

  // 3. Halos difusos (como los blur:100px del SiteBackground)
  const h1 = ctx.createRadialGradient(
    -ancho * 0.04,
    -alto * 0.05,
    0,
    -ancho * 0.04,
    -alto * 0.05,
    ancho * 0.65,
  );
  h1.addColorStop(0, `rgba(${p.r},${p.g},${p.b},0.05)`);
  h1.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
  ctx.fillStyle = h1;
  ctx.fillRect(0, 0, ancho, alto);

  const h2 = ctx.createRadialGradient(
    ancho * 1.04,
    alto * 1.05,
    0,
    ancho * 1.04,
    alto * 1.05,
    ancho * 0.58,
  );
  h2.addColorStop(0, `rgba(${t.r},${t.g},${t.b},0.05)`);
  h2.addColorStop(1, `rgba(${t.r},${t.g},${t.b},0)`);
  ctx.fillStyle = h2;
  ctx.fillRect(0, 0, ancho, alto);

  // 4. Siluetas de insectos tintadas
  await Promise.all(
    INSECTS.map(async (ins) => {
      try {
        const img = await cargarImagen(ins.src);
        const color = ins.tintKey === "primary" ? cfg.primary : cfg.tertiary;
        const w = ancho * ins.wFrac;
        const h = w / ins.aspect;
        dibujarInsectoTintado(
          ctx,
          img,
          color,
          ins.opacity,
          ancho * ins.cx,
          alto * ins.cy,
          w,
          h,
          ins.rotateDeg,
        );
      } catch {
        // Si falla un insecto, continuar sin él
      }
    }),
  );

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95);
  });
}

// ---------------------------------------------------------------------------
// Componente de UI
// ---------------------------------------------------------------------------

const W = 2560;
const H = 1440;

export function ExportarFondo() {
  const [descargando, setDescargando] = useState<Record<Modo, boolean>>({
    claro: false,
    oscuro: false,
  });

  const handleDescargar = async (modo: Modo) => {
    setDescargando((prev) => ({ ...prev, [modo]: true }));
    try {
      const blob = await generarFondoJpeg(modo, W, H);
      if (!blob) {
        toast.error("No se pudo generar el fondo.");
        return;
      }
      descargarBlob(blob, `fondo-mas-insectos-${modo}.jpg`);
      toast.success(
        `Fondo ${modo === "claro" ? "claro" : "oscuro"} descargado`,
      );
    } catch {
      toast.error("Ocurrió un error al generar el fondo.");
    } finally {
      setDescargando((prev) => ({ ...prev, [modo]: false }));
    }
  };

  const ocupado = descargando.claro || descargando.oscuro;

  return (
    <div className="mt-14 overflow-hidden rounded-2xl border border-outline-variant bg-surface shadow-sm">
      {/* Vista previa de ambos modos */}
      <div className="grid grid-cols-2 divide-x divide-outline-variant/60 border-b border-outline-variant/60">
        {/* Claro */}
        <div
          className="relative flex min-h-40 items-end justify-end p-3"
          style={{
            background: [
              "radial-gradient(circle at 12% 0%, rgba(124,58,237,0.12), transparent 55%)",
              "radial-gradient(circle at 88% 18%, rgba(16,185,129,0.08), transparent 50%)",
              "#f8fafc",
            ].join(", "),
          }}
        >
          {/* Silueta decorativa inline */}
          <span className="pointer-events-none absolute left-4 top-3 text-5xl opacity-[0.08] select-none">
            🦋
          </span>
          <span className="rounded bg-white/70 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-zinc-600 backdrop-blur-sm">
            Modo claro
          </span>
        </div>

        {/* Oscuro */}
        <div
          className="relative flex min-h-40 items-end justify-end p-3"
          style={{
            background: [
              "radial-gradient(circle at 12% 0%, rgba(192,132,252,0.14), transparent 55%)",
              "radial-gradient(circle at 88% 18%, rgba(34,211,238,0.09), transparent 50%)",
              "#070414",
            ].join(", "),
          }}
        >
          <span className="pointer-events-none absolute left-4 top-3 text-5xl opacity-[0.12] select-none">
            🦋
          </span>
          <span className="rounded bg-black/50 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-purple-300 backdrop-blur-sm">
            Modo oscuro
          </span>
        </div>
      </div>

      {/* Info + botones */}
      <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Fondo decorativo
          </p>
          <p className="mt-1 text-sm text-on-surface-variant">
            Gradientes y siluetas de insectos · {W}×{H} px · JPG
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => handleDescargar("claro")}
            disabled={ocupado}
            aria-label="Descargar fondo en modo claro como JPG"
          >
            {descargando.claro ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <ImageDown className="size-4" />
            )}
            {descargando.claro ? "Generando…" : "Claro · JPG"}
          </Button>

          <Button
            onClick={() => handleDescargar("oscuro")}
            disabled={ocupado}
            aria-label="Descargar fondo en modo oscuro como JPG"
          >
            {descargando.oscuro ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <ImageDown className="size-4" />
            )}
            {descargando.oscuro ? "Generando…" : "Oscuro · JPG"}
          </Button>
        </div>
      </div>
    </div>
  );
}
