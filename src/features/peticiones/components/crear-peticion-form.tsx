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
import { type ActionState, crearPeticionAction } from "../actions";

interface CrearPeticionFormProps {
  categorias: {
    id: string;
    nombre: string;
  }[];
}

const initialState: ActionState = {
  success: false,
};

export function CrearPeticionForm({ categorias }: CrearPeticionFormProps) {
  const [state, formAction, isPending] = useActionState(
    crearPeticionAction,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="space-y-6 max-w-2xl mx-auto p-8 border-4 border-black dark:border-white bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
    >
      <h2 className="text-3xl font-bold border-b-4 border-black dark:border-white pb-3 mb-6">
        Nueva Petición
      </h2>

      {state.error && (
        <div className="p-4 border-2 border-red-600 bg-red-100 text-red-800 font-semibold text-sm">
          {state.error}
        </div>
      )}

      {/* Titulo */}
      <div className="space-y-2">
        <Label htmlFor="titulo" className="text-lg font-bold">
          Título de la petición *
        </Label>
        <Input
          id="titulo"
          name="titulo"
          placeholder="Ej. Salvemos a las abejas de la pradera"
          required
          className="border-2 border-black dark:border-white text-base py-6"
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
          <SelectTrigger className="border-2 border-black dark:border-white py-6 text-base bg-background">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent className="border-2 border-black bg-background dark:border-white">
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
          Resumen o descripción corta *
        </Label>
        <Textarea
          id="resumen"
          name="resumen"
          placeholder="Describe brevemente la causa (entre 50 y 500 caracteres)."
          required
          rows={3}
          className="border-2 border-black dark:border-white text-base"
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
          Cuerpo o explicación detallada *
        </Label>
        <Textarea
          id="contenido"
          name="contenido"
          placeholder="Explica la problemática, los objetivos y por qué la gente debería firmar (mínimo 100 caracteres)."
          required
          rows={8}
          className="border-2 border-black dark:border-white text-base"
        />
        {state.fieldErrors?.contenido && (
          <p className="text-red-600 text-sm font-semibold">
            {state.fieldErrors.contenido[0]}
          </p>
        )}
      </div>

      {/* Imagen */}
      <div className="space-y-2">
        <Label htmlFor="imagen" className="text-lg font-bold">
          Imagen destacada *
        </Label>
        <Input
          id="imagen"
          name="imagen"
          type="file"
          accept="image/*"
          required
          onChange={handleImageChange}
          className="border-2 border-black dark:border-white text-base py-3 bg-background file:mr-4 file:py-1 file:px-4 file:border-2 file:border-black file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        {previewUrl && (
          <div className="relative aspect-video w-full mt-4 border-4 border-black dark:border-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <Image
              src={previewUrl}
              alt="Previsualización de la imagen"
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

      {/* Meta Firmas */}
      <div className="space-y-2">
        <Label htmlFor="meta_firmas" className="text-lg font-bold">
          Meta de firmas *
        </Label>
        <Input
          id="meta_firmas"
          name="meta_firmas"
          type="number"
          defaultValue={1000}
          required
          min={10}
          className="border-2 border-black dark:border-white text-base py-6"
        />
        {state.fieldErrors?.meta_firmas && (
          <p className="text-red-600 text-sm font-semibold">
            {state.fieldErrors.meta_firmas[0]}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-xl font-bold py-6 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Creando petición...
          </>
        ) : (
          "Crear Petición en Borrador"
        )}
      </Button>
    </form>
  );
}
