"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useActionState, useState } from "react";
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
import { crearNoticiaAction, type NoticiaActionState } from "../actions";

interface CrearNoticiaFormProps {
  categorias: {
    id: string;
    nombre: string;
  }[];
}

const initialState: NoticiaActionState = { success: false };

export function CrearNoticiaForm({ categorias }: CrearNoticiaFormProps) {
  const [state, formAction, isPending] = useActionState(
    crearNoticiaAction,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <form
      action={formAction}
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
          required
          className="border border-outline-variant text-base py-6"
        />
        {state.fieldErrors?.titulo && (
          <p className="text-red-600 text-sm font-semibold">
            {state.fieldErrors.titulo[0]}
          </p>
        )}
      </div>

      {/* Categoria */}
      <div className="space-y-2">
        <Label htmlFor="categoriaId" className="text-lg font-bold">
          Categoría *
        </Label>
        <Select name="categoriaId" required>
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
        {state.fieldErrors?.categoriaId && (
          <p className="text-red-600 text-sm font-semibold">
            {state.fieldErrors.categoriaId[0]}
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
          placeholder="Breve descripción que aparece en listados (entre 50 y 500 caracteres)."
          required
          rows={3}
          className="border border-outline-variant text-base"
        />
        {state.fieldErrors?.resumen && (
          <p className="text-red-600 text-sm font-semibold">
            {state.fieldErrors.resumen[0]}
          </p>
        )}
      </div>

      {/* Contenido */}
      <div className="space-y-2">
        <Label htmlFor="contenido" className="text-lg font-bold">
          Contenido del artículo *
        </Label>
        <Textarea
          id="contenido"
          name="contenido"
          placeholder="Escribe el contenido completo de la noticia (mínimo 100 caracteres)."
          required
          rows={12}
          className="border border-outline-variant text-base"
        />
        {state.fieldErrors?.contenido && (
          <p className="text-red-600 text-sm font-semibold">
            {state.fieldErrors.contenido[0]}
          </p>
        )}
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
        {state.fieldErrors?.imagen && (
          <p className="text-red-600 text-sm font-semibold">
            {state.fieldErrors.imagen[0]}
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
