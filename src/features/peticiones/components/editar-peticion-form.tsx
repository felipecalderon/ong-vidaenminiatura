"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useEditarPeticionForm } from "../hooks/use-editar-peticion-form";

interface EditarPeticionFormProps {
  peticion: {
    id: string;
    titulo: string;
    resumen: string;
    contenido: string;
    meta_firmas: number;
    categoriaId?: string;
    imagen: string | null;
    destacado: boolean;
  };
  categorias: {
    id: string;
    nombre: string;
  }[];
  onSuccess?: () => void;
}

export function EditarPeticionForm({
  peticion,
  categorias,
  onSuccess,
}: EditarPeticionFormProps) {
  const {
    state,
    formAction,
    isPending,
    previewUrl,
    validateField,
    handleImageChange,
    handleSubmit,
    getFieldError,
  } = useEditarPeticionForm(peticion);

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="id" value={peticion.id} />
      <input
        type="hidden"
        name="imagenExistente"
        value={peticion.imagen || ""}
      />

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
          defaultValue={state.fields?.titulo ?? peticion.titulo}
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
          defaultValue={state.fields?.categoriaId ?? peticion.categoriaId ?? ""}
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
          defaultValue={state.fields?.resumen ?? peticion.resumen}
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
          defaultValue={state.fields?.contenido ?? peticion.contenido}
          onChange={(e) => validateField("contenido", e.target.value)}
          onBlur={(e) => validateField("contenido", e.target.value)}
          required
          rows={5}
          className="border border-outline-variant text-base"
        />
        {getFieldError("contenido") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("contenido")}
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
          defaultValue={state.fields?.meta_firmas ?? peticion.meta_firmas}
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

      {/* Imagen */}
      <div className="space-y-2">
        <Label htmlFor="imagen" className="text-lg font-bold">
          Imagen destacada (Opcional, dejar vacío para mantener la actual)
        </Label>
        <Input
          id="imagen"
          name="imagen"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full overflow-hidden text-ellipsis border border-outline-variant text-base bg-background file:mr-4 file:py-1 file:px-4 file:border file:border-outline-variant file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        {previewUrl && (
          <div className="relative aspect-video w-full mt-4 border border-outline-variant overflow-hidden dark:">
            <Image
              src={previewUrl}
              alt="Previsualización de la imagen"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Destacado */}
      <div className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-outline-variant rounded-md">
        <Checkbox
          id="destacado"
          name="destacado"
          defaultChecked={state.fields?.destacado ?? peticion.destacado}
        />
        <div className="space-y-1 leading-none">
          <Label htmlFor="destacado" className="font-bold cursor-pointer">
            Marcar como destacado
          </Label>
          <p className="text-sm text-muted-foreground">
            Si marcas esta opción, la petición aparecerá en la sección de
            destacados.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-lg font-bold py-6 border border-outline-variant dark: hover: transition-all disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Guardando...
          </>
        ) : (
          "Guardar Cambios"
        )}
      </Button>
    </form>
  );
}
