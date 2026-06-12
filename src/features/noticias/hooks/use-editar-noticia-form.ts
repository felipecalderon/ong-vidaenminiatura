"use client";

import { type ChangeEvent, useActionState, useState } from "react";
import { editarNoticiaAction } from "../actions/editar-noticia";
import type { NoticiaActionState } from "../actions/noticia-action-state";
import { editarNoticiaSchema } from "../schemas/editar-noticia.schema";

const initialState: NoticiaActionState = { success: false };

interface NoticiaData {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoriaId: string;
  imagen: string | null;
}

export function useEditarNoticiaForm(noticia: NoticiaData) {
  const [state, formAction, isPending] = useActionState(
    editarNoticiaAction,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(noticia.imagen);
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>(
    {},
  );

  const validateField = (
    name: keyof typeof editarNoticiaSchema.shape,
    value: string,
  ) => {
    const fieldSchema = editarNoticiaSchema.shape[name];
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
      setPreviewUrl(noticia.imagen);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = {
      id: formData.get("id") as string,
      titulo: formData.get("titulo") as string,
      resumen: formData.get("resumen") as string,
      contenido: formData.get("contenido") as string,
      categoriaId: formData.get("categoriaId") as string,
      imagen: previewUrl, // Para pasar validación Zod
    };

    const result = editarNoticiaSchema.safeParse(data);
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
    handleSubmit,
    getFieldError,
  };
}
