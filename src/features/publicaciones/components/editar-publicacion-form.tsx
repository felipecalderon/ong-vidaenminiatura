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
import { TipoPublicacion } from "@/generated/prisma/enums";
import { useEditarPublicacionForm } from "../hooks/use-editar-publicacion-form";
import { formatearFechaInput } from "../lib/formateadores";

interface EditarPublicacionFormProps {
  publicacion: {
    id: string;
    titulo: string;
    resumen: string;
    contenido: string;
    tipo: TipoPublicacion;
    autores: string[];
    anio: number | null;
    enlace: string | null;
    lugar: string | null;
    fecha_evento: Date | null;
    imagen: string | null;
  };
}

export function EditarPublicacionForm({
  publicacion,
}: EditarPublicacionFormProps) {
  const {
    state,
    formAction,
    isPending,
    previewUrl,
    validateField,
    processImageFile,
    handleSubmit,
    getFieldError,
  } = useEditarPublicacionForm({
    id: publicacion.id,
    titulo: publicacion.titulo,
    resumen: publicacion.resumen,
    contenido: publicacion.contenido,
    tipo: publicacion.tipo,
    autores: publicacion.autores,
    anio: publicacion.anio,
    enlace: publicacion.enlace,
    lugar: publicacion.lugar,
    fechaEvento: publicacion.fecha_evento,
    imagen: publicacion.imagen,
  });

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-8 border border-outline-variant bg-card dark:"
    >
      <h2 className="text-3xl font-bold border-b border-outline-variant pb-3 mb-6">
        Editar Publicación
      </h2>

      {state.error && (
        <div className="p-4 border border-red-600 bg-red-100 text-red-800 font-semibold text-sm">
          {state.error}
        </div>
      )}

      <input type="hidden" name="id" value={publicacion.id} />
      <input
        type="hidden"
        name="imagenExistente"
        value={publicacion.imagen || ""}
      />

      {/* Titulo */}
      <div className="space-y-2">
        <Label htmlFor="titulo" className="text-lg font-bold">
          Título *
        </Label>
        <Input
          id="titulo"
          name="titulo"
          defaultValue={state.fields?.titulo ?? publicacion.titulo}
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
          Tipo de contenido *
        </Label>
        <Select
          name="tipo"
          defaultValue={state.fields?.tipo ?? publicacion.tipo}
          onValueChange={(val) => validateField("tipo", val)}
          required
        >
          <SelectTrigger className="border border-outline-variant py-6 text-base bg-background">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent className="border border-outline-variant bg-background">
            <SelectItem value={TipoPublicacion.ESTUDIO}>
              Estudio / Investigación
            </SelectItem>
            <SelectItem value={TipoPublicacion.PUBLICACION}>
              Publicación (artículo, libro, revista)
            </SelectItem>
            <SelectItem value={TipoPublicacion.EVENTO}>
              Seminario, taller o evento
            </SelectItem>
          </SelectContent>
        </Select>
        {getFieldError("tipo") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("tipo")}
          </p>
        )}
      </div>

      {/* Metadata científica */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="autores" className="text-lg font-bold">
            Autores/as
          </Label>
          <Input
            id="autores"
            name="autores"
            placeholder="Nombre, Nombre, Institución"
            defaultValue={
              state.fields?.autores ?? publicacion.autores.join(", ")
            }
            onChange={(e) => validateField("autores", e.target.value)}
            className="border border-outline-variant text-base py-6"
          />
          {getFieldError("autores") && (
            <p className="text-red-600 text-sm font-semibold">
              {getFieldError("autores")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="anio" className="text-lg font-bold">
            Año
          </Label>
          <Input
            id="anio"
            name="anio"
            type="number"
            min={1900}
            max={2100}
            placeholder="2026"
            defaultValue={
              state.fields?.anio ?? (publicacion.anio?.toString() || "")
            }
            onChange={(e) => validateField("anio", e.target.value)}
            className="border border-outline-variant text-base py-6"
          />
          {getFieldError("anio") && (
            <p className="text-red-600 text-sm font-semibold">
              {getFieldError("anio")}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="enlace" className="text-lg font-bold">
          Enlace externo
        </Label>
        <Input
          id="enlace"
          name="enlace"
          type="url"
          placeholder="https://..."
          defaultValue={state.fields?.enlace ?? publicacion.enlace ?? ""}
          onChange={(e) => validateField("enlace", e.target.value)}
          className="border border-outline-variant text-base py-6"
        />
        {getFieldError("enlace") && (
          <p className="text-red-600 text-sm font-semibold">
            {getFieldError("enlace")}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lugar" className="text-lg font-bold">
            Lugar
          </Label>
          <Input
            id="lugar"
            name="lugar"
            placeholder="Solo para seminarios, talleres y eventos"
            defaultValue={state.fields?.lugar ?? publicacion.lugar ?? ""}
            onChange={(e) => validateField("lugar", e.target.value)}
            className="border border-outline-variant text-base py-6"
          />
          {getFieldError("lugar") && (
            <p className="text-red-600 text-sm font-semibold">
              {getFieldError("lugar")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaEvento" className="text-lg font-bold">
            Fecha del evento
          </Label>
          <Input
            id="fechaEvento"
            name="fechaEvento"
            type="date"
            defaultValue={
              state.fields?.fechaEvento ??
              formatearFechaInput(publicacion.fecha_evento)
            }
            onChange={(e) => validateField("fechaEvento", e.target.value)}
            className="border border-outline-variant text-base py-6"
          />
          {getFieldError("fechaEvento") && (
            <p className="text-red-600 text-sm font-semibold">
              {getFieldError("fechaEvento")}
            </p>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="space-y-2">
        <Label htmlFor="contenido" className="text-lg font-bold">
          Contenido *
        </Label>
        <NoticiaContentEditor
          name="contenido"
          initialMarkdown={state.fields?.contenido ?? publicacion.contenido}
          onChange={(val) => validateField("contenido", val)}
          error={getFieldError("contenido")}
          placeholder="Describe el estudio, publicación o actividad formativa..."
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
