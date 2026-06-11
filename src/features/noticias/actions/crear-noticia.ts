"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

  const imagenFile = formData.get("imagen") as File | null;
  let imagenUrl: string | undefined;

  if (imagenFile && imagenFile.size > 0) {
    try {
      imagenUrl = await subirImagenACloudinary(imagenFile);
    } catch (_e) {
      return { success: false, error: "Error al subir la imagen a la nube." };
    }
  }

  const rawData = {
    titulo: formData.get("titulo") as string,
    resumen: formData.get("resumen") as string,
    contenido: formData.get("contenido") as string,
    imagen: imagenUrl,
    categoriaId: formData.get("categoriaId") as string,
  };

  const parseResult = crearNoticiaSchema.safeParse(rawData);

  if (!parseResult.success) {
    return {
      success: false,
      error: "Datos de formulario inválidos.",
      fieldErrors: parseResult.error.flatten().fieldErrors,
    };
  }

  let redirectPath: string | undefined;

  try {
    const noticia = await crearNuevaNoticia(usuario.id, parseResult.data);
    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath("/noticias/mis-noticias");
    redirectPath = `/noticias/${noticia.slug}`;
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al crear la noticia.";
    return { success: false, error: errorMsg };
  }

  if (redirectPath) {
    redirect(redirectPath);
  }

  return { success: true };
}
