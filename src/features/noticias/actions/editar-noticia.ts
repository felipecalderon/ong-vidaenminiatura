"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generarExtractoAction } from "@/actions/generar-extracto";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import {
  subirImagenesACloudinary,
  subirImagenSiExiste,
} from "@/lib/cloudinary";
import { validarArchivosImagenServidor } from "@/lib/preparar-imagen";
import {
  extraerArchivosGaleria,
  resolverOrdenGaleria,
} from "../lib/galeria-orden";
import { editarNoticiaSchema } from "../schemas/editar-noticia.schema";
import { editarNoticiaExistente } from "../services/editar-noticia-existente";
import type { NoticiaActionState } from "./noticia-action-state";

export async function editarNoticiaAction(
  _prevState: NoticiaActionState,
  formData: FormData,
): Promise<NoticiaActionState> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  const rawData = {
    id: formData.get("id") as string,
    titulo: formData.get("titulo") as string,
    contenido: formData.get("contenido") as string,
    categoriaId: formData.get("categoriaId") as string,
  };

  const imagenFile = formData.get("imagen") as File | null;
  let imagenUrl: string | undefined =
    (formData.get("imagenExistente") as string) || undefined;

  try {
    const nuevaImagenUrl = await subirImagenSiExiste(imagenFile);
    if (nuevaImagenUrl) {
      imagenUrl = nuevaImagenUrl;
    }
  } catch (_e) {
    return {
      success: false,
      error: "Error al subir la nueva imagen a la nube.",
      fields: rawData,
    };
  }

  const archivosGaleria = extraerArchivosGaleria(formData);
  const errorGaleria = validarArchivosImagenServidor(archivosGaleria);

  if (errorGaleria) {
    return {
      success: false,
      error: errorGaleria,
      fields: rawData,
    };
  }

  let urlsNuevasGaleria: string[] = [];

  if (archivosGaleria.length > 0) {
    try {
      urlsNuevasGaleria = await subirImagenesACloudinary(archivosGaleria);
    } catch (_e) {
      return {
        success: false,
        error: "Error al subir las imágenes de la galería a la nube.",
        fields: rawData,
      };
    }
  }

  const ordenGaleriaRaw = formData.get("imagenesOrden");
  // Un cliente que no envía el orden (ni archivos nuevos) no debe borrar la
  // galería ya guardada.
  const imagenesGaleria =
    ordenGaleriaRaw === null && archivosGaleria.length === 0
      ? undefined
      : resolverOrdenGaleria(ordenGaleriaRaw, urlsNuevasGaleria);

  if (imagenesGaleria && !imagenesGaleria.ok) {
    return {
      success: false,
      error: imagenesGaleria.error,
      fields: rawData,
    };
  }

  // Generar el extracto SEO con IA automáticamente
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

  const parseResult = editarNoticiaSchema.safeParse({
    ...rawData,
    resumen: extractoResult.extracto,
    imagen: imagenUrl,
    imagenes: imagenesGaleria?.imagenes,
  });

  if (!parseResult.success) {
    return {
      success: false,
      error: "Datos de formulario inválidos.",
      fieldErrors: parseResult.error.flatten().fieldErrors,
      fields: rawData,
    };
  }

  let redirectPath: string | undefined;

  try {
    const noticia = await editarNoticiaExistente(
      usuario.id,
      usuario.rol,
      parseResult.data,
    );
    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath("/noticias/mis-noticias");
    revalidatePath(`/noticias/${noticia.slug}`);
    revalidatePath(`/noticias/${noticia.slug}/editar`);
    redirectPath = `/noticias/${noticia.slug}`;
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al editar la noticia.";
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
