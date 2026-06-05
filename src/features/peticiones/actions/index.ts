"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { subirImagenACloudinary } from "@/lib/cloudinary";
import { actualizarEstadoPeticion } from "../repositories";
import { crearPeticionSchema } from "../schemas/crear-peticion.schema";
import { editarPeticionSchema } from "../schemas/editar-peticion.schema";
import { crearNuevaPeticion, editarPeticionExistente } from "../services";

export type ActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  fields?: {
    titulo?: string;
    resumen?: string;
    contenido?: string;
    meta_firmas?: number;
    categoriaId?: string;
    destacado?: boolean;
  };
};

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

  // Validar campos primero (sin imagen) para evitar subir la imagen a Cloudinary si hay errores de validación
  const parseResult = crearPeticionSchema.safeParse({
    ...fields,
    imagen: null, // temporalmente null para validación inicial
  });

  if (!parseResult.success) {
    return {
      success: false,
      error: "Datos de formulario inválidos.",
      fieldErrors: parseResult.error.flatten().fieldErrors,
      fields,
    };
  }

  // Obtener el archivo de imagen
  const imagenFile = formData.get("imagen") as File | null;
  let imagenUrl: string | undefined;

  // Como la imagen destaca es obligatoria en la creación, validamos que exista
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

    // Asignamos la ruta para redirigir fuera del bloque try-catch
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
    imagen: imagenUrl,
    meta_firmas: Number(formData.get("meta_firmas")),
    categoriaId: formData.get("categoriaId") as string,
    destacado:
      formData.get("destacado") === "on" ||
      formData.get("destacado") === "true",
  };

  const parseResult = editarPeticionSchema.safeParse(rawData);

  if (!parseResult.success) {
    return {
      success: false,
      error: "Datos de formulario inválidos.",
      fieldErrors: parseResult.error.flatten().fieldErrors,
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
    };
  }

  if (redirectPath) {
    redirect(redirectPath);
  }
  return { success: true };
}

export async function publicarPeticionAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    // Si es admin o creador, puede publicar
    // Primero, obtener la petición
    const { obtenerPeticionPorId } = await import("../repositories");
    const peticion = await obtenerPeticionPorId(id);

    if (!peticion) {
      return { success: false, error: "La petición no existe." };
    }

    if (peticion.usuario_id !== usuario.id && usuario.rol !== "ADMINISTRADOR") {
      return {
        success: false,
        error: "No tienes permisos para publicar esta petición.",
      };
    }

    await actualizarEstadoPeticion(id, EstadoPeticion.PUBLICADA, new Date());

    revalidatePath("/");
    revalidatePath("/peticiones");
    revalidatePath(`/peticiones/${peticion.slug}`);

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al publicar.";
    return { success: false, error: errorMsg };
  }
}

export async function eliminarPeticionAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeCrearContenido) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const { eliminarPeticionExistente } = await import("../services");
    await eliminarPeticionExistente(id, usuario.id, usuario.rol);

    revalidatePath("/");
    revalidatePath("/peticiones");
    revalidatePath("/peticiones/mis-peticiones");

    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error al eliminar.";
    return { success: false, error: errorMsg };
  }
}
