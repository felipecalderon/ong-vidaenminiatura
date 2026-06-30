"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generarExtractoAction } from "@/actions/generar-extracto";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { subirImagenACloudinary } from "@/lib/cloudinary";
import { crearNoticiaSchema } from "../schemas/crear-noticia.schema";
import { crearNuevaNoticia } from "../services/crear-nueva-noticia";
import type { NoticiaActionState } from "./noticia-action-state";

export async function crearNoticiaAction(
  _prevState: NoticiaActionState,
  formData: FormData,
): Promise<NoticiaActionState> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return {
      success: false,
      error: "No autorizado. Se requiere rol de Autor o Administrador.",
    };
  }

  const rawData = {
    titulo: formData.get("titulo") as string,
    contenido: formData.get("contenido") as string,
    categoriaId: formData.get("categoriaId") as string,
  };

  const imagenFile = formData.get("imagen") as File | null;
  let imagenUrl: string | undefined;

  if (imagenFile && imagenFile.size > 0) {
    try {
      imagenUrl = await subirImagenACloudinary(imagenFile);
    } catch (_e) {
      return {
        success: false,
        error: "Error al subir la imagen a la nube.",
        fields: rawData,
      };
    }
  }

  // Pre-validar campos básicos antes de llamar a la IA
  const parseResult = crearNoticiaSchema.safeParse({
    ...rawData,
    imagen: imagenUrl,
  });

  if (!parseResult.success) {
    return {
      success: false,
      error: "Datos de formulario inválidos.",
      fieldErrors: parseResult.error.flatten().fieldErrors,
      fields: rawData,
    };
  }

  // Generar el extracto SEO con IA
  const extractoResult = await generarExtractoAction({
    titulo: rawData.titulo,
    contenido: rawData.contenido,
  });

  if (!extractoResult.success) {
    return {
      success: false,
      error: `No se pudo generar el extracto automático: ${extractoResult.error}`,
      fields: rawData,
    };
  }

  let redirectPath: string | undefined;

  try {
    const noticia = await crearNuevaNoticia(
      usuario.id,
      {
        ...parseResult.data,
        resumen: extractoResult.extracto,
      },
      usuario.acceso.omitirRevision,
    );
    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath("/noticias/mis-noticias");
    if (usuario.acceso.omitirRevision) {
      redirectPath = `/noticias/${noticia.slug}`;
    } else {
      redirectPath = "/usuario/mis-datos?tab=noticias&status=revision";
    }
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al crear la noticia.";
    return {
      success: false,
      error: errorMsg,
      fields: rawData,
    };
  }

  if (redirectPath) {
    redirect(redirectPath);
  }

  return { success: true };
}
