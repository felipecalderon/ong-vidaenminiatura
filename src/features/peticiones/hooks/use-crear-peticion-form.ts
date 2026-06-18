"use client";

import { type ChangeEvent, useActionState, useState } from "react";
import type { ActionState } from "../actions/action-state";
import { crearPeticionAction } from "../actions/crear-peticion";
import { crearPeticionSchema } from "../schemas/crear-peticion.schema";

const initialState: ActionState = {
  success: false,
};

export function useCrearPeticionForm() {
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
      contenido: formData.get("contenido") as string,
      meta_firmas: Number(formData.get("meta_firmas")),
      categoriaId: formData.get("categoriaId") as string,
      destacado: formData.get("destacado") === "on",
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
