"use client";

import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCrearNoticiaForm } from "../hooks/use-crear-noticia-form";
import { NoticiaContentEditor } from "./noticia-content-editor";

interface ImageUploaderProps {
  previewUrl: string | null;
  onFileSelect: (file: File | undefined) => void;
}

function ImageUploader({ previewUrl, onFileSelect }: ImageUploaderProps) {
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
        // Enlazar el archivo al input nativo para que se envíe en el FormData
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
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleAreaClick}
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

interface CrearNoticiaFormProps {
  categorias: {
    id: string;
    nombre: string;
  }[];
}

export function CrearNoticiaForm({ categorias }: CrearNoticiaFormProps) {
  const {
    state,
    formAction,
    isPending,
    previewUrl,
    validateField,
    handleImageChange,
    processImageFile,
    handleSubmit,
    getFieldError,
  } = useCrearNoticiaForm();

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-8 border border-outline-variant bg-card dark:"
    >
      <h2 className="text-3xl font-bold border-b border-outline-variant pb-3 mb-6">
        Nueva Noticia
      </h2>

      {state.error && (
        <div className="p-4 border border-red-600 bg-red-100 text-red-800 font-semibold text-sm">
          {state.error}
        </div>
      )}

      {/* Titulo */}
      <div className="space-y-2">
        <Label htmlFor="titulo" className="text-lg font-bold">
          Título *
        </Label>
        <Input
          id="titulo"
          name="titulo"
          placeholder="Ej. Descubren nueva especie de abeja en el Amazonas"
          defaultValue={state.fields?.titulo}
          onChange={(e) => validateField("titulo", e.target.value)}
          onBlur={(e) => validateField("titulo", e.target.value)}
          required
          className="border border-outline-variant text-base py-6"
        />
        {getFieldError("titulo") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("titulo")}
          </p>
        )}
      </div>

      {/* Categoria */}
      <div className="space-y-2">
        <Label htmlFor="categoriaId" className="text-lg font-bold">
          Categoría *
        </Label>
        <Select
          name="categoriaId"
          defaultValue={state.fields?.categoriaId}
          onValueChange={(val) => validateField("categoriaId", val)}
          required
        >
          <SelectTrigger className="border border-outline-variant py-6 text-base bg-background">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent className="border border-outline-variant bg-background">
            {categorias.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {getFieldError("categoriaId") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("categoriaId")}
          </p>
        )}
      </div>

      {/* Contenido */}
      <div className="space-y-2">
        <Label htmlFor="contenido" className="text-lg font-bold">
          Contenido del artículo *
        </Label>
        <NoticiaContentEditor
          name="contenido"
          initialMarkdown={state.fields?.contenido || ""}
          onChange={(val) => validateField("contenido", val)}
          error={getFieldError("contenido")}
        />
      </div>

      {/* Imagen */}
      <div className="space-y-3">
        <Label htmlFor="imagen" className="text-lg font-bold">
          Imagen de portada
        </Label>

        <ImageUploader
          previewUrl={previewUrl}
          onFileSelect={processImageFile}
        />

        {getFieldError("imagen") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("imagen")}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-xl font-bold py-6 border border-outline-variant dark: hover: dark:hover: transition-all disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Guardando noticia...
          </>
        ) : (
          "Crear Noticia en Borrador"
        )}
      </Button>
    </form>
  );
}
