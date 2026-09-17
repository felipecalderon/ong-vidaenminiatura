"use client";

import { ArrowLeft, ArrowRight, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { urlMiniaturaCloudinary } from "@/lib/cloudinary-url";
import { formatearPeso } from "@/lib/preparar-imagen";
import type { ItemGaleria } from "@/types/galeria";

interface MultiImageUploaderProps {
  items: ItemGaleria[];
  onFilesSelected: (files: File[]) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direccion: -1 | 1) => void;
  /** Cantidad máxima de imágenes admitidas (se usa para el contador). */
  maxImagenes?: number;
  /** Mientras se comprimen los archivos recién elegidos. */
  comprimiendo?: boolean;
}

export function MultiImageUploader({
  items,
  onFilesSelected,
  onRemove,
  onMove,
  maxImagenes = 10,
  comprimiendo = false,
}: MultiImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // El input de archivos debe reflejar siempre el orden actual de la lista.
  useEffect(() => {
    const input = fileInputRef.current;
    if (!input) return;

    const dataTransfer = new DataTransfer();
    for (const item of items) {
      if (item.file) {
        dataTransfer.items.add(item.file);
      }
    }
    input.files = dataTransfer.files;
  }, [items]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files ?? []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // Se limpia el input para poder volver a elegir el mismo archivo.
    e.target.value = "";
  };

  const total = items.length;
  const limiteAlcanzado = total >= maxImagenes;

  return (
    <div className="w-full space-y-3">
      <input
        type="file"
        ref={fileInputRef}
        name="imagenesArchivos"
        id="imagenesArchivos"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {total > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="group relative overflow-hidden rounded-lg border border-outline-variant bg-card"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={urlMiniaturaCloudinary(item.url, 400)}
                  alt={`Imagen ${index + 1} de la galería`}
                  fill
                  sizes="(max-width: 640px) 50vw, 200px"
                  className="object-cover"
                />

                {item.file && (
                  <span className="absolute right-2 bottom-2 rounded bg-background/90 px-1.5 py-0.5 text-[10px] font-bold text-foreground">
                    {formatearPeso(item.file.size)}
                  </span>
                )}
              </div>

              {index === 0 && (
                <span className="absolute top-2 left-2 bg-primary text-on-primary text-xs font-bold px-2 py-0.5">
                  Principal
                </span>
              )}

              <div className="flex items-center justify-between gap-1 border-t border-outline-variant bg-surface-container p-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onMove(item.id, -1)}
                  disabled={index === 0}
                  aria-label={`Mover imagen ${index + 1} hacia atrás`}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Eliminar imagen ${index + 1}`}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onMove(item.id, 1)}
                  disabled={index === total - 1}
                  aria-label={`Mover imagen ${index + 1} hacia adelante`}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        role="button"
        tabIndex={0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleAreaClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleAreaClick();
        }}
        className={`relative rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-primary bg-primary/5 scale-[0.99]"
            : "border-outline-variant hover:border-primary/50 hover:bg-muted/30"
        } ${limiteAlcanzado ? "opacity-60" : ""}`}
      >
        <div className="p-3 rounded-full bg-muted border border-outline-variant mb-3">
          {comprimiendo ? (
            <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
          ) : (
            <Upload className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <p className="font-semibold">
          {comprimiendo
            ? "Optimizando imágenes..."
            : "Arrastra tus imágenes de galería aquí"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          o haz clic para buscar en tus archivos
        </p>
        <p className="text-xs text-muted-foreground/75 mt-3">
          {total}/{maxImagenes} imágenes · JPG, PNG, WEBP, GIF o SVG (Máx. 5MB
          c/u)
        </p>
      </div>
    </div>
  );
}
