"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { subirImagenACloudinary } from "@/lib/cloudinary";
import { editarPeticionSchema } from "../schemas/editar-peticion.schema";
import { editarPeticionExistente } from "../services/editar-peticion-existente";
import type { ActionState } from "./action-state";

export async function editarPeticionAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
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
    meta_firmas: Number(formData.get("meta_firmas")),
    categoriaId: formData.get("categoriaId") as string,
    destacado:
      formData.get("destacado") === "on" ||
      formData.get("destacado") === "true",
  };

  if (imagenFile && imagenFile.size > 0) {
    try {
      imagenUrl = await subirImagenACloudinary(imagenFile);
    } catch (_e) {
      return {
        success: false,
        error: "Error al subir la nueva imagen a la nube.",
        fields: rawData,
      };
    }
  }

  const parseResult = editarPeticionSchema.safeParse({
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

  let redirectPath: string | undefined;

  try {
    const peticion = await editarPeticionExistente(
      usuario.id,
      usuario.rol,
      parseResult.data,
    );
    revalidatePath("/");
    revalidatePath("/peticiones");
    revalidatePath(`/peticiones/${peticion.slug}`);
    redirectPath = `/peticiones/${peticion.slug}`;
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al actualizar la petición.";
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
