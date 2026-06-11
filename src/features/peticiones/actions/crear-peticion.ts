"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { subirImagenACloudinary } from "@/lib/cloudinary";
import { crearPeticionSchema } from "../schemas/crear-peticion.schema";
import { crearNuevaPeticion } from "../services/crear-nueva-peticion";
import type { ActionState } from "./action-state";

export async function crearPeticionAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return {
      success: false,
      error: "No autorizado. Se requiere rol de Autor o Administrador.",
    };
  }

  const fields = {
    titulo: formData.get("titulo") as string,
    resumen: formData.get("resumen") as string,
    contenido: formData.get("contenido") as string,
    meta_firmas: Number(formData.get("meta_firmas")),
    categoriaId: formData.get("categoriaId") as string,
    destacado:
      formData.get("destacado") === "on" ||
      formData.get("destacado") === "true",
  };

  const parseResult = crearPeticionSchema.safeParse({
    ...fields,
    imagen: null,
  });

  if (!parseResult.success) {
    return {
      success: false,
      error: "Datos de formulario inválidos.",
      fieldErrors: parseResult.error.flatten().fieldErrors,
      fields,
    };
  }

  const imagenFile = formData.get("imagen") as File | null;
  let imagenUrl: string | undefined;

  if (!imagenFile || imagenFile.size === 0) {
    return {
      success: false,
      error: "La imagen destacada es requerida.",
      fieldErrors: {
        imagen: ["La imagen destacada es requerida."],
      },
      fields,
    };
  }

  try {
    imagenUrl = await subirImagenACloudinary(imagenFile);
  } catch (_e) {
    return {
      success: false,
      error: "Error al subir la imagen a la nube.",
      fields,
    };
  }

  let redirectPath: string | undefined;

  try {
    const peticion = await crearNuevaPeticion(usuario.id, {
      ...parseResult.data,
      imagen: imagenUrl,
    });
    revalidatePath("/");
    revalidatePath("/peticiones");
    redirectPath = `/peticiones/${peticion.slug}`;
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al crear la petición.";
    return {
      success: false,
      error: errorMsg,
      fields,
    };
  }

  if (redirectPath) {
    redirect(redirectPath);
  }
  return { success: true };
}
