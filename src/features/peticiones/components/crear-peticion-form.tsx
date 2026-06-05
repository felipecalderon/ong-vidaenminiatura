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
import { crearPeticionSchema } from "../schemas/crear-peticion.schema";

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
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>(
    {},
  );

  const validateField = (
    name: keyof typeof crearPeticionSchema.shape,
    value: string | number,
  ) => {
    let parsedValue: string | number = value;
    if (name === "meta_firmas") {
      parsedValue = Number(value);
    }

    const fieldSchema = crearPeticionSchema.shape[name];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(parsedValue);
    if (!result.success) {
      setClientErrors((prev) => ({
        ...prev,
        [name]: result.error.flatten().formErrors,
      }));
    } else {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next.imagen;
        return next;
      });
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = {
      titulo: formData.get("titulo") as string,
      resumen: formData.get("resumen") as string,
      contenido: formData.get("contenido") as string,
      meta_firmas: Number(formData.get("meta_firmas")),
      categoriaId: formData.get("categoriaId") as string,
      imagen: null,
    };

    const result = crearPeticionSchema.safeParse(data);
    const errors: Record<string, string[]> = {};

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors as Record<
        string,
        string[] | undefined
      >;
      for (const key in fieldErrors) {
        const fieldError = fieldErrors[key];
        if (fieldError) {
          errors[key] = fieldError;
        }
      }
    }

    const imagenFile = formData.get("imagen") as File | null;
    if (!imagenFile || imagenFile.size === 0) {
      errors.imagen = ["La imagen destacada es requerida."];
    }

    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setClientErrors(errors);
      return;
    }
  };

  const getFieldError = (name: string) => {
    return clientErrors[name]?.[0] || state.fieldErrors?.[name]?.[0];
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-8 border border-outline-variant bg-card dark:"
    >
      <h2 className="text-3xl font-bold border-b border-outline-variant pb-3 mb-6">
        Nueva Petición
      </h2>

      {state.error && (
        <div className="p-4 border border-red-600 bg-red-100 text-red-800 font-semibold text-sm">
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

      {/* Resumen */}
      <div className="space-y-2">
        <Label htmlFor="resumen" className="text-lg font-bold">
          Resumen o descripción corta *
        </Label>
        <Textarea
          id="resumen"
          name="resumen"
          placeholder="Describe brevemente la causa (entre 50 y 500 caracteres)."
          defaultValue={state.fields?.resumen}
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
          Cuerpo o explicación detallada *
        </Label>
        <Textarea
          id="contenido"
          name="contenido"
          placeholder="Explica la problemática, los objetivos y por qué la gente debería firmar (mínimo 100 caracteres)."
          defaultValue={state.fields?.contenido}
          onChange={(e) => validateField("contenido", e.target.value)}
          onBlur={(e) => validateField("contenido", e.target.value)}
          required
          rows={8}
          className="border border-outline-variant text-base"
        />
        {getFieldError("contenido") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("contenido")}
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
          className="border border-outline-variant text-base bg-background file:mr-4 file:py-1 file:px-4 file:border file:border-outline-variant file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        {previewUrl && (
          <div className="relative aspect-video w-full mt-4 border border-outline-variant overflow-hidden dark:">
            <Image
              src={previewUrl}
              alt="Previsualización de la imagen"
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

      {/* Meta Firmas */}
      <div className="space-y-2">
        <Label htmlFor="meta_firmas" className="text-lg font-bold">
          Meta de firmas *
        </Label>
        <Input
          id="meta_firmas"
          name="meta_firmas"
          type="number"
          defaultValue={state.fields?.meta_firmas ?? 1000}
          onChange={(e) => validateField("meta_firmas", e.target.value)}
          onBlur={(e) => validateField("meta_firmas", e.target.value)}
          required
          min={10}
          className="border border-outline-variant text-base py-6"
        />
        {getFieldError("meta_firmas") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("meta_firmas")}
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
            Creando petición...
          </>
        ) : (
          "Crear Petición en Borrador"
        )}
      </Button>
    </form>
  );
}
