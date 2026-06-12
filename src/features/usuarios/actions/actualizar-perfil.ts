"use server";

import { revalidatePath } from "next/cache";
import { subirImagenACloudinary } from "@/lib/cloudinary";
import { obtenerUsuarioAutenticado } from "../queries/obtener-usuario-autenticado";
import { actualizarPerfilSchema } from "../schemas/actualizar-perfil.schema";
import { actualizarPerfil } from "../services/actualizar-perfil";

export type PerfilActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  fields?: {
    nombre?: string;
  };
};

export async function actualizarPerfilAction(
  _prevState: PerfilActionState,
  formData: FormData,
): Promise<PerfilActionState> {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || usuario.estado === "SUSPENDIDO") {
    return { success: false, error: "No autorizado o usuario suspendido." };
  }

  const nombre = formData.get("nombre") as string;
  const imagenFile = formData.get("imagen") as File | null;
  let picture = (formData.get("imagenExistente") as string) || "";

  const rawFields = { nombre };

  // Validar esquema con Zod
  const parseResult = actualizarPerfilSchema.safeParse({
    nombre,
    picture: picture || undefined,
  });

  if (!parseResult.success) {
    return {
      success: false,
      fieldErrors: parseResult.error.flatten().fieldErrors,
      fields: rawFields,
    };
  }

  // Si se proporciona un nuevo archivo de imagen
  if (imagenFile && imagenFile.size > 0) {
    try {
      picture = await subirImagenACloudinary(imagenFile);
    } catch (_e) {
      return {
        success: false,
        error: "Error al subir la nueva imagen a la nube.",
        fields: rawFields,
      };
    }
  }

  try {
    await actualizarPerfil(usuario.auth0Id, {
      nombre: parseResult.data.nombre,
      picture: picture || undefined,
    });

    revalidatePath("/");
    revalidatePath("/usuario/mis-datos");

    return {
      success: true,
      fields: {
        nombre: parseResult.data.nombre,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        fields: rawFields,
      };
    }
    return {
      success: false,
      error: "Error al actualizar el perfil.",
      fields: rawFields,
    };
  }
}
