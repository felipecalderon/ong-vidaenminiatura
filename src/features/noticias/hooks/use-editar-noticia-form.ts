"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  formatearPeso,
  MAX_IMAGENES_GALERIA,
  prepararImagenParaSubir,
  sumarPesoArchivos,
  TAMANO_MAXIMO_ENVIO_BYTES,
  TAMANO_MAXIMO_IMAGEN_BYTES,
} from "@/lib/preparar-imagen";
import type { ItemGaleria } from "@/types/galeria";
import { editarNoticiaAction } from "../actions/editar-noticia";
import type { NoticiaActionState } from "../actions/noticia-action-state";
import { serializarOrdenGaleria } from "../lib/galeria-orden";
import { editarNoticiaSchema } from "../schemas/editar-noticia.schema";

const initialState: NoticiaActionState = { success: false };

const FORMATOS_IMAGEN_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

interface NoticiaData {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoriaId: string;
  imagen: string | null;
  imagenes: string[];
}

export function useEditarNoticiaForm(noticia: NoticiaData) {
  const [state, formAction, isPending] = useActionState(
    editarNoticiaAction,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(noticia.imagen);
  const [itemsGaleria, setItemsGaleria] = useState<ItemGaleria[]>(() =>
    noticia.imagenes.map((url, indice) => ({
      id: `guardada-${indice}`,
      url,
    })),
  );
  const [comprimiendoGaleria, setComprimiendoGaleria] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>(
    {},
  );
  const previewUrlRef = useRef<string | null>(null);
  const itemsGaleriaRef = useRef<ItemGaleria[]>([]);
  const contadorIdRef = useRef(0);

  useEffect(() => {
    itemsGaleriaRef.current = itemsGaleria;
  }, [itemsGaleria]);

  // Liberar los object URLs creados para las previsualizaciones nuevas
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      for (const item of itemsGaleriaRef.current) {
        if (item.file) {
          URL.revokeObjectURL(item.url);
        }
      }
    };
  }, []);

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

  const actualizarPreviewPortada = (file: File | undefined) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreviewUrl(url);
  };

  const processImageFile = (file: File | undefined) => {
    if (!file) {
      actualizarPreviewPortada(undefined);
      return;
    }

    // Validar tipo de formato de imagen
    if (!FORMATOS_IMAGEN_PERMITIDOS.includes(file.type)) {
      toast.error(
        "Formato de imagen no permitido. Usa JPG, PNG, WEBP, GIF o SVG.",
      );
      actualizarPreviewPortada(undefined);
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > TAMANO_MAXIMO_IMAGEN_BYTES) {
      toast.error("La imagen es demasiado grande. El límite máximo es de 5MB.");
      actualizarPreviewPortada(undefined);
      return;
    }

    actualizarPreviewPortada(file);
    setClientErrors((prev) => {
      const next = { ...prev };
      delete next.imagen;
      return next;
    });
  };

  const agregarImagenesGaleria = async (files: File[]) => {
    const disponibles = MAX_IMAGENES_GALERIA - itemsGaleria.length;

    if (disponibles <= 0) {
      toast.error(
        `Puedes subir hasta ${MAX_IMAGENES_GALERIA} imágenes por noticia.`,
      );
      return;
    }

    if (files.length > disponibles) {
      toast.error(
        `Sólo se agregaron ${disponibles} imágenes: el máximo es ${MAX_IMAGENES_GALERIA}.`,
      );
    }

    setComprimiendoGaleria(true);

    const nuevos: ItemGaleria[] = [];
    const errores = new Set<string>();

    for (const file of files.slice(0, disponibles)) {
      const resultado = await prepararImagenParaSubir(file);

      if (!resultado.ok) {
        errores.add(resultado.mensaje);
        continue;
      }

      contadorIdRef.current += 1;
      nuevos.push({
        id: `galeria-${contadorIdRef.current}`,
        url: URL.createObjectURL(resultado.file),
        file: resultado.file,
      });
    }

    setComprimiendoGaleria(false);

    for (const error of errores) {
      toast.error(error);
    }

    if (nuevos.length > 0) {
      setItemsGaleria((prev) => [...prev, ...nuevos]);
    }
  };

  const moverImagenGaleria = (id: string, direccion: -1 | 1) => {
    setItemsGaleria((prev) => {
      const indice = prev.findIndex((item) => item.id === id);
      const destino = indice + direccion;

      if (indice === -1 || destino < 0 || destino >= prev.length) {
        return prev;
      }

      const copia = [...prev];
      [copia[indice], copia[destino]] = [copia[destino], copia[indice]];
      return copia;
    });
  };

  const eliminarImagenGaleria = (id: string) => {
    const item = itemsGaleria.find((actual) => actual.id === id);

    if (item?.file) {
      URL.revokeObjectURL(item.url);
    }

    setItemsGaleria((prev) => prev.filter((actual) => actual.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    const portada = formData.get("imagen");
    const pesoTotal = sumarPesoArchivos([
      portada instanceof File ? portada : null,
      ...itemsGaleria.map((item) => item.file ?? null),
    ]);

    if (pesoTotal > TAMANO_MAXIMO_ENVIO_BYTES) {
      e.preventDefault();
      toast.error(
        `Las imágenes suman ${formatearPeso(pesoTotal)} y el máximo por envío es ${formatearPeso(TAMANO_MAXIMO_ENVIO_BYTES)}. Quita algunas o vuelve a agregarlas.`,
      );
      return;
    }

    const data = {
      id: formData.get("id") as string,
      titulo: formData.get("titulo") as string,
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
    itemsGaleria,
    ordenGaleria: serializarOrdenGaleria(itemsGaleria),
    comprimiendoGaleria,
    validateField,
    processImageFile,
    agregarImagenesGaleria,
    moverImagenGaleria,
    eliminarImagenGaleria,
    handleSubmit,
    getFieldError,
  };
}
