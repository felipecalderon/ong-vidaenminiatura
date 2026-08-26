"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generarExtractoAction } from "@/actions/generar-extracto";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { subirImagenSiExiste } from "@/lib/cloudinary";
import { editarPublicacionSchema } from "../schemas/editar-publicacion.schema";
import { editarPublicacionExistente } from "../services/editar-publicacion-existente";
import type { PublicacionActionState } from "./publicacion-action-state";

export async function editarPublicacionAction(
  _prevState: PublicacionActionState,
  formData: FormData,
): Promise<PublicacionActionState> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  const rawData = {
    id: formData.get("id") as string,
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

  const parseResult = editarPublicacionSchema.safeParse({
    ...rawData,
    resumen: extractoResult.extracto,
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

  let redirectPath: string | undefined;

  try {
    const publicacion = await editarPublicacionExistente(
      usuario.id,
      usuario.rol,
      parseResult.data,
    );
    revalidatePath("/");
    revalidatePath("/investigacion");
    revalidatePath("/investigacion/mis-publicaciones");
    revalidatePath(`/investigacion/${publicacion.slug}`);
    revalidatePath(`/investigacion/${publicacion.slug}/editar`);
    redirectPath = `/investigacion/${publicacion.slug}`;
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Error al editar la publicación.";
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
