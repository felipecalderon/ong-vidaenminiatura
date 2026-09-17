"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { urlMiniaturaCloudinary } from "@/lib/cloudinary-url";

interface NoticiaGaleriaProps {
  imagenes: string[];
  titulo: string;
}

const PROPORCION_POR_DEFECTO = 4 / 3;

interface MiniaturaGaleriaProps {
  url: string;
  titulo: string;
  indice: number;
  total: number;
  onOpen: () => void;
}

function MiniaturaGaleria({
  url,
  titulo,
  indice,
  total,
  onOpen,
}: MiniaturaGaleriaProps) {
  const [proporcion, setProporcion] = useState<number | null>(null);
  const imagenRef = useRef<HTMLImageElement>(null);

  // Si la imagen ya estaba cargada al hidratar, onLoad no se dispara: se revisa
  // al montar para conocer su proporción real.
  useEffect(() => {
    const imagen = imagenRef.current;

    if (imagen?.complete && imagen.naturalWidth > 0) {
      setProporcion(imagen.naturalWidth / imagen.naturalHeight);
    }
  }, []);

  const registrarProporcion = (ancho: number, alto: number) => {
    if (ancho <= 0 || alto <= 0) return;
    setProporcion(ancho / alto);
  };

  return (
    <li className="mb-4 break-inside-avoid">
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={`Ampliar imagen ${indice + 1} de ${total}`}
      >
        <span
          className="relative block w-full"
          style={{ aspectRatio: proporcion ?? PROPORCION_POR_DEFECTO }}
        >
          <Image
            ref={imagenRef}
            src={urlMiniaturaCloudinary(url, 800)}
            alt={`${titulo} - imagen ${indice + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={(event) =>
              registrarProporcion(
                event.currentTarget.naturalWidth,
                event.currentTarget.naturalHeight,
              )
            }
          />
        </span>
      </button>
    </li>
  );
}

export function NoticiaGaleria({ imagenes, titulo }: NoticiaGaleriaProps) {
  const [abierta, setAbierta] = useState<number | null>(null);

  if (imagenes.length === 0) {
    return null;
  }

  const irAnterior = () => {
    setAbierta((actual) =>
      actual === null
        ? actual
        : (actual - 1 + imagenes.length) % imagenes.length,
    );
  };

  const irSiguiente = () => {
    setAbierta((actual) =>
      actual === null ? actual : (actual + 1) % imagenes.length,
    );
  };

  const indiceAbierto = abierta ?? 0;

  return (
    <section className="mt-12" aria-labelledby="galeria-noticia">
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {imagenes.map((url, indice) => (
          <MiniaturaGaleria
            key={`${indice}-${url}`}
            url={url}
            titulo={titulo}
            indice={indice}
            total={imagenes.length}
            onOpen={() => setAbierta(indice)}
          />
        ))}
      </ul>

      <Dialog
        open={abierta !== null}
        onOpenChange={(abierto) => {
          if (!abierto) setAbierta(null);
        }}
      >
        <DialogContent
          className="max-w-5xl border-outline-variant bg-background p-4 sm:max-w-7xl"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") irAnterior();
            if (event.key === "ArrowRight") irSiguiente();
          }}
        >
          <DialogTitle className="sr-only">
            Imagen {indiceAbierto + 1} de {imagenes.length} de {titulo}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Usa las flechas del teclado para navegar entre las imágenes de la
            galería.
          </DialogDescription>

          <div className="relative h-[60vh] w-full sm:h-[85vh]">
            <Image
              src={imagenes[indiceAbierto]}
              alt={`${titulo} - imagen ${indiceAbierto + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={irAnterior}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              {indiceAbierto + 1} / {imagenes.length}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={irSiguiente}
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
