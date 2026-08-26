"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generarExtractoAction } from "@/actions/generar-extracto";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { subirImagenACloudinary } from "@/lib/cloudinary";
import { crearPublicacionSchema } from "../schemas/crear-publicacion.schema";
import { crearNuevaPublicacion } from "../services/crear-nueva-publicacion";
import type { PublicacionActionState } from "./publicacion-action-state";

export async function crearPublicacionAction(
  _prevState: PublicacionActionState,
  formData: FormData,
): Promise<PublicacionActionState> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return {
      success: false,
      error:
        "No autorizado. Tu usuario no tiene permisos para crear contenido o se encuentra suspendido.",
    };
  }

  const rawData = {
    titulo: formData.get("titulo") as string,
    tipo: formData.get("tipo") as string,
    contenido: formData.get("contenido") as string,
    autores: formData.get("autores") as string,
    anio: formData.get("anio") as string,
    enlace: formData.get("enlace") as string,
    lugar: formData.get("lugar") as string,
    fechaEvento: formData.get("fechaEvento") as string,
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
  const parseResult = crearPublicacionSchema.safeParse({
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
    const publicacion = await crearNuevaPublicacion(
      usuario.id,
      {
        ...parseResult.data,
        resumen: extractoResult.extracto,
      },
      usuario.acceso.omitirRevision,
    );
    revalidatePath("/");
    revalidatePath("/investigacion");
    revalidatePath("/investigacion/mis-publicaciones");
    if (usuario.acceso.omitirRevision) {
      redirectPath = `/investigacion/${publicacion.slug}`;
    } else {
      redirectPath = "/investigacion/mis-publicaciones";
    }
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al crear la publicación.";
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
