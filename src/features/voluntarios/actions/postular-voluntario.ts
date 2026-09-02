"use server";

import {
  type CrearVoluntarioInput,
  crearVoluntarioSchema,
} from "../schemas/crear-voluntario.schema";
import { postularVoluntarioService } from "../services/crear-voluntario.service";

export interface PostularVoluntarioResponse {
  success: boolean;
  isDuplicate?: boolean;
  message?: string;
  error?: string;
  voluntario?: {
    id: string;
    nombre: string;
    correo: string;
    areas_interes: string[];
  };
}

export async function postularVoluntarioAction(
  data: CrearVoluntarioInput,
): Promise<PostularVoluntarioResponse> {
  const validacion = crearVoluntarioSchema.safeParse(data);
  if (!validacion.success) {
    const errorMsg =
      validacion.error.issues[0]?.message || "Datos de postulación inválidos.";
    return {
      success: false,
      error: errorMsg,
    };
  }

  try {
    const resultado = await postularVoluntarioService(validacion.data);

    if (resultado.status === "duplicado") {
      return {
        success: true,
        isDuplicate: true,
        message: resultado.mensaje,
      };
    }

    return {
      success: true,
      isDuplicate: false,
      message: resultado.mensaje,
      voluntario: resultado.voluntario,
    };
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Ocurrió un problema al procesar tu postulación. Intenta nuevamente.";
    return {
      success: false,
      error: errorMsg,
    };
  }
}
