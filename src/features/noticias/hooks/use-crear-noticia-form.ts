"use client";

import { type ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { crearNoticiaAction } from "../actions/crear-noticia";
import type { NoticiaActionState } from "../actions/noticia-action-state";
import { crearNoticiaSchema } from "../schemas/crear-noticia.schema";

const initialState: NoticiaActionState = { success: false };

export function useCrearNoticiaForm() {
  const [state, formAction, isPending] = useActionState(
    crearNoticiaAction,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>(
    {},
  );

  // Mostrar error general del servidor si ocurre
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  const validateField = (
    name: keyof typeof crearNoticiaSchema.shape,
    value: string,
  ) => {
    const fieldSchema = crearNoticiaSchema.shape[name];
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

    // Validar tipo de formato de imagen
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

    // Validar tamaño (máximo 5MB)
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
      titulo: formData.get("titulo") as string,
      contenido: formData.get("contenido") as string,
      categoriaId: formData.get("categoriaId") as string,
      imagen: null,
    };

    const result = crearNoticiaSchema.safeParse(data);
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
      toast.error("Por favor, corrige los errores en el formulario.");
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
