"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
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
import { Textarea } from "@/components/ui/textarea";
import { useEditarNoticiaForm } from "../hooks/use-editar-noticia-form";
import { NoticiaContentEditor } from "./noticia-content-editor";

interface EditarNoticiaFormProps {
  noticia: {
    id: string;
    titulo: string;
    resumen: string;
    contenido: string;
    categoriaId: string;
    imagen: string | null;
  };
  categorias: {
    id: string;
    nombre: string;
  }[];
}

export function EditarNoticiaForm({
  noticia,
  categorias,
}: EditarNoticiaFormProps) {
  const {
    state,
    formAction,
    isPending,
    previewUrl,
    validateField,
    handleImageChange,
    handleSubmit,
    getFieldError,
  } = useEditarNoticiaForm(noticia);

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-8 border border-outline-variant bg-card dark:"
    >
      <h2 className="text-3xl font-bold border-b border-outline-variant pb-3 mb-6">
        Editar Noticia
      </h2>

      {state.error && (
        <div className="p-4 border border-red-600 bg-red-100 text-red-800 font-semibold text-sm">
          {state.error}
        </div>
      )}

      <input type="hidden" name="id" value={noticia.id} />
      <input
        type="hidden"
        name="imagenExistente"
        value={noticia.imagen || ""}
      />

      {/* Titulo */}
      <div className="space-y-2">
        <Label htmlFor="titulo" className="text-lg font-bold">
          Título *
        </Label>
        <Input
          id="titulo"
          name="titulo"
          defaultValue={state.fields?.titulo ?? noticia.titulo}
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
          defaultValue={state.fields?.categoriaId ?? noticia.categoriaId}
          onValueChange={(value) => validateField("categoriaId", value)}
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

      {/* Resumen */}
      <div className="space-y-2">
        <Label htmlFor="resumen" className="text-lg font-bold">
          Resumen o extracto *
        </Label>
        <Textarea
          id="resumen"
          name="resumen"
          defaultValue={state.fields?.resumen ?? noticia.resumen}
          onChange={(e) => validateField("resumen", e.target.value)}
          onBlur={(e) => validateField("resumen", e.target.value)}
          required
          rows={3}
          className="border border-outline-variant text-base"
        />
        {getFieldError("resumen") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("resumen")}
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
          initialMarkdown={state.fields?.contenido ?? noticia.contenido}
          onChange={(value) => validateField("contenido", value)}
          error={getFieldError("contenido")}
        />
      </div>

      {/* Imagen */}
      <div className="space-y-3">
        <Label htmlFor="imagen" className="text-lg font-bold">
          Imagen de portada
        </Label>
        <Input
          id="imagen"
          name="imagen"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-outline-variant text-base py-3 bg-background file:mr-4 file:py-1 file:px-4 file:border file:border-outline-variant file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        {previewUrl && (
          <div className="relative aspect-video w-full border border-outline-variant overflow-hidden dark:">
            <Image
              src={previewUrl}
              alt="Previsualización"
              fill
              className="object-cover"
            />
          </div>
        )}
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
            Guardando cambios...
          </>
        ) : (
          "Guardar cambios"
        )}
      </Button>
    </form>
  );
}
