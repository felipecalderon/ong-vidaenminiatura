"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  previewUrl: string | null;
  onFileSelect: (file: File | undefined) => void;
}

export function ImageUploader({
  previewUrl,
  onFileSelect,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileSelect(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        name="imagen"
        id="imagen"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative aspect-video w-full rounded-lg border border-outline-variant overflow-hidden group">
          <Image
            src={previewUrl}
            alt="Previsualización de portada"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleAreaClick}
              className="font-semibold"
            >
              Cambiar imagen
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
              aria-label="Eliminar imagen"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
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
          className={`relative aspect-video w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-primary bg-primary/5 scale-[0.99]"
              : "border-outline-variant hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <div className="p-4 rounded-full bg-muted border border-outline-variant mb-4 group-hover:scale-110 transition-transform">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="font-semibold text-lg">
            Arrastra tu imagen de portada aquí
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            o haz clic para buscar en tus archivos
          </p>
          <p className="text-xs text-muted-foreground/75 mt-4">
            Soporta JPG, PNG, WEBP, GIF o SVG (Máx. 5MB)
          </p>
        </div>
      )}
    </div>
  );
}
