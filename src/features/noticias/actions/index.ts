"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries";
import { EstadoNoticia } from "@/generated/prisma/enums";
import { subirImagenACloudinary } from "@/lib/cloudinary";
import { actualizarEstadoNoticia, obtenerNoticiaPorId } from "../repositories";
import { crearNoticiaSchema } from "../schemas/crear-noticia.schema";
import { editarNoticiaSchema } from "../schemas/editar-noticia.schema";
import { crearNuevaNoticia, editarNoticiaExistente } from "../services";

export type NoticiaActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

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

  try {
    const noticia = await crearNuevaNoticia(usuario.id, parseResult.data);
    revalidatePath("/");
    revalidatePath("/noticias");
    redirect(`/noticias/${noticia.slug}`);
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al crear la noticia.";
    return { success: false, error: errorMsg };
  }
}

export async function editarNoticiaAction(
  _prevState: NoticiaActionState,
  formData: FormData,
): Promise<NoticiaActionState> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  const imagenFile = formData.get("imagen") as File | null;
  let imagenUrl: string | undefined =
    (formData.get("imagenExistente") as string) || undefined;

  if (imagenFile && imagenFile.size > 0) {
    try {
      imagenUrl = await subirImagenACloudinary(imagenFile);
    } catch (_e) {
      return {
        success: false,
        error: "Error al subir la nueva imagen a la nube.",
      };
    }
  }

  const rawData = {
    id: formData.get("id") as string,
    titulo: formData.get("titulo") as string,
    resumen: formData.get("resumen") as string,
    contenido: formData.get("contenido") as string,
    imagen: imagenUrl,
    categoriaId: formData.get("categoriaId") as string,
  };

  const parseResult = editarNoticiaSchema.safeParse(rawData);

  if (!parseResult.success) {
    return {
      success: false,
      error: "Datos de formulario inválidos.",
      fieldErrors: parseResult.error.flatten().fieldErrors,
    };
  }

  try {
    const noticia = await editarNoticiaExistente(
      usuario.id,
      usuario.rol,
      parseResult.data,
    );
    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath(`/noticias/${noticia.slug}`);
    redirect(`/noticias/${noticia.slug}`);
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al editar la noticia.";
    return { success: false, error: errorMsg };
  }
}

export async function publicarNoticiaAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const noticia = await obtenerNoticiaPorId(id);

    if (!noticia) {
      return { success: false, error: "La noticia no existe." };
    }

    if (noticia.autor_id !== usuario.id && usuario.rol !== "ADMINISTRADOR") {
      return {
        success: false,
        error: "No tienes permisos para publicar esta noticia.",
      };
    }

    await actualizarEstadoNoticia(id, EstadoNoticia.PUBLICADA, new Date());
    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath(`/noticias/${noticia.slug}`);

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al publicar.";
    return { success: false, error: errorMsg };
  }
}
