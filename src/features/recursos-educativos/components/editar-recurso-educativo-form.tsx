"use client";

import { Loader2 } from "lucide-react";
import { ImageUploader } from "@/components/image-uploader";
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
import { NoticiaContentEditor } from "@/features/noticias/components/noticia-content-editor";
import { TipoRecursoEducativo } from "@/generated/prisma/enums";
import { useEditarRecursoEducativoForm } from "../hooks/use-editar-recurso-educativo-form";

interface EditarRecursoEducativoFormProps {
  recurso: {
    id: string;
    titulo: string;
    resumen: string;
    contenido: string;
    tipo: TipoRecursoEducativo;
    categoriaId: string | null;
    imagen: string | null;
  };
  categorias: { id: string; nombre: string }[];
}

export function EditarRecursoEducativoForm({
  recurso,
  categorias,
}: EditarRecursoEducativoFormProps) {
  const {
    state,
    formAction,
    isPending,
    previewUrl,
    validateField,
    processImageFile,
    handleSubmit,
    getFieldError,
  } = useEditarRecursoEducativoForm({
    id: recurso.id,
    titulo: recurso.titulo,
    resumen: recurso.resumen,
    contenido: recurso.contenido,
    tipo: recurso.tipo,
    categoriaId: recurso.categoriaId,
    imagen: recurso.imagen,
  });

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-8 border border-outline-variant bg-card dark:"
    >
      <h2 className="text-3xl font-bold border-b border-outline-variant pb-3 mb-6">
        Editar Recurso Educativo
      </h2>

      {state.error && (
        <div className="p-4 border border-red-600 bg-red-100 text-red-800 font-semibold text-sm">
          {state.error}
        </div>
      )}

      <input type="hidden" name="id" value={recurso.id} />
      <input
        type="hidden"
        name="imagenExistente"
        value={recurso.imagen || ""}
      />

      {/* Titulo */}
      <div className="space-y-2">
        <Label htmlFor="titulo" className="text-lg font-bold">
          Título *
        </Label>
        <Input
          id="titulo"
          name="titulo"
          defaultValue={state.fields?.titulo ?? recurso.titulo}
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

      {/* Tipo */}
      <div className="space-y-2">
        <Label htmlFor="tipo" className="text-lg font-bold">
          Tipo de recurso *
        </Label>
        <Select
          name="tipo"
          defaultValue={state.fields?.tipo ?? recurso.tipo}
          onValueChange={(val) => validateField("tipo", val)}
          required
        >
          <SelectTrigger className="border border-outline-variant py-6 text-base bg-background">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent className="border border-outline-variant bg-background">
            <SelectItem value={TipoRecursoEducativo.CONCEPTO}>
              Concepto clave
            </SelectItem>
            <SelectItem value={TipoRecursoEducativo.GUIA}>
              Guía de identificación
            </SelectItem>
            <SelectItem value={TipoRecursoEducativo.PREGUNTA}>
              Mito o pregunta frecuente
            </SelectItem>
            <SelectItem value={TipoRecursoEducativo.ACCION}>
              Cómo actuar
            </SelectItem>
          </SelectContent>
        </Select>
        {getFieldError("tipo") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("tipo")}
          </p>
        )}
      </div>

      {/* Categoria */}
      <div className="space-y-2">
        <Label htmlFor="categoriaId" className="text-lg font-bold">
          Categoría
        </Label>
        <select
          id="categoriaId"
          name="categoriaId"
          defaultValue={state.fields?.categoriaId ?? recurso.categoriaId ?? ""}
          onChange={(e) => validateField("categoriaId", e.target.value)}
          className="flex h-11 w-full cursor-pointer appearance-none rounded-md border border-outline-variant bg-background px-3 py-2 text-base text-foreground shadow-xs outline-none transition-[border-color,box-shadow] hover:border-outline focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Sin categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        {getFieldError("categoriaId") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("categoriaId")}
          </p>
        )}
      </div>

      {/* Contenido */}
      <div className="space-y-2">
        <Label htmlFor="contenido" className="text-lg font-bold">
          Contenido *
        </Label>
        <NoticiaContentEditor
          name="contenido"
          initialMarkdown={state.fields?.contenido ?? recurso.contenido}
          onChange={(val) => validateField("contenido", val)}
          error={getFieldError("contenido")}
          placeholder="Explica el concepto, guía, mito o acción concreta..."
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
        className="w-full text-xl font-bold py-6 border border-outline-variant dark: hover: dark:hover: disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Guardando cambios...
          </>
        ) : (
          "Guardar cambios"
        )}
      </Button>
    </form>
  );
}
