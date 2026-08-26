"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generarExtractoAction } from "@/actions/generar-extracto";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { subirImagenACloudinary } from "@/lib/cloudinary";
import { crearRecursoEducativoSchema } from "../schemas/crear-recurso-educativo.schema";
import { crearNuevoRecursoEducativo } from "../services/crear-nuevo-recurso-educativo";
import type { RecursoEducativoActionState } from "./recurso-educativo-action-state";

export async function crearRecursoEducativoAction(
  _prevState: RecursoEducativoActionState,
  formData: FormData,
): Promise<RecursoEducativoActionState> {
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
  const parseResult = crearRecursoEducativoSchema.safeParse({
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
    const recurso = await crearNuevoRecursoEducativo(
      usuario.id,
      {
        ...parseResult.data,
        resumen: extractoResult.extracto,
      },
      usuario.acceso.omitirRevision,
    );
    revalidatePath("/");
    revalidatePath("/aprende");
    revalidatePath("/aprende/mis-recursos");
    if (usuario.acceso.omitirRevision) {
      redirectPath = `/aprende/${recurso.slug}`;
    } else {
      redirectPath = "/aprende/mis-recursos";
    }
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Error al crear el recurso educativo.";
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
