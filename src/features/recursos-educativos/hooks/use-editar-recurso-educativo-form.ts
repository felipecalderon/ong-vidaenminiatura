"use client";

import { type ChangeEvent, useActionState, useState } from "react";
import { toast } from "sonner";
import { editarRecursoEducativoAction } from "../actions/editar-recurso-educativo";
import type { RecursoEducativoActionState } from "../actions/recurso-educativo-action-state";
import { editarRecursoEducativoSchema } from "../schemas/editar-recurso-educativo.schema";

const initialState: RecursoEducativoActionState = { success: false };

interface RecursoEducativoData {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  tipo: string;
  categoriaId: string | null;
  imagen: string | null;
}

export function useEditarRecursoEducativoForm(recurso: RecursoEducativoData) {
  const [state, formAction, isPending] = useActionState(
    editarRecursoEducativoAction,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(recurso.imagen);
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>(
    {},
  );

  const validateField = (
    name: keyof typeof editarRecursoEducativoSchema.shape,
    value: string,
  ) => {
    const fieldSchema = editarRecursoEducativoSchema.shape[name];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
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

  const processImageFile = (file: File | undefined) => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error(
        "Formato de imagen no permitido. Usa JPG, PNG, WEBP, GIF o SVG.",
      );
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("La imagen es demasiado grande. El límite máximo es de 5MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setClientErrors((prev) => {
      const next = { ...prev };
      delete next.imagen;
      return next;
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = {
      id: formData.get("id") as string,
      titulo: formData.get("titulo") as string,
      tipo: formData.get("tipo") as string,
      contenido: formData.get("contenido") as string,
      categoriaId: formData.get("categoriaId") as string,
      imagen: previewUrl, // Para pasar validación Zod
    };

    const result = editarRecursoEducativoSchema.safeParse(data);
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

    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setClientErrors(errors);
      return;
    }
  };

  const getFieldError = (name: string) => {
    return clientErrors[name]?.[0] || state.fieldErrors?.[name]?.[0];
  };

  return {
    state,
    formAction,
    isPending,
    previewUrl,
    validateField,
    handleImageChange,
    processImageFile,
    handleSubmit,
    getFieldError,
  };
}
