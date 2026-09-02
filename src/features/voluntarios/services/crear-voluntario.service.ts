import "server-only";
import { after } from "next/server";
import { buscarVoluntarioPorCorreo } from "../repositories/buscar-voluntario-por-correo.repository";
import { registrarVoluntario } from "../repositories/crear-voluntario.repository";
import {
  type CrearVoluntarioInput,
  crearVoluntarioSchema,
} from "../schemas/crear-voluntario.schema";
import { enviarEmailsVoluntarioService } from "./enviar-emails-voluntario.service";

export type ResultadoPostulacion =
  | {
      status: "creado";
      mensaje: string;
      voluntario: {
        id: string;
        nombre: string;
        correo: string;
        areas_interes: string[];
      };
    }
  | {
      status: "duplicado";
      mensaje: string;
    };

export async function postularVoluntarioService(
  data: CrearVoluntarioInput,
): Promise<ResultadoPostulacion> {
  const validacion = crearVoluntarioSchema.safeParse(data);
  if (!validacion.success) {
    const errorMsg =
      validacion.error.issues[0]?.message ||
      "Los datos enviados no son válidos.";
    throw new Error(errorMsg);
  }

  // 1. Verificar si ya existe una solicitud previa con este correo
  const existente = await buscarVoluntarioPorCorreo(validacion.data.correo);

  if (existente) {
    return {
      status: "duplicado",
      mensaje:
        "Ya has enviado una solicitud al voluntariado con este correo. Tu postulación está en revisión, te pedimos paciencia; pronto serás contactado.",
    };
  }

  // 2. Persistir el nuevo voluntario en la base de datos
  const nuevoVoluntario = await registrarVoluntario(validacion.data);

  // 3. Enviar correos en segundo plano con after() para no bloquear la respuesta al usuario
  after(async () => {
    try {
      await enviarEmailsVoluntarioService({
        nombre: nuevoVoluntario.nombre,
        correo: nuevoVoluntario.correo,
        telefono: nuevoVoluntario.telefono,
        ciudad: nuevoVoluntario.ciudad,
        profesion_ocupacion: nuevoVoluntario.profesion_ocupacion,
        disponibilidad: nuevoVoluntario.disponibilidad,
        areas_interes: nuevoVoluntario.areas_interes,
        motivacion: nuevoVoluntario.motivacion,
        fecha_creacion: nuevoVoluntario.fecha_creacion,
      });
    } catch (emailError) {
      console.error(
        "[Voluntariado Service] Error no fatal despachando correos en segundo plano:",
        emailError,
      );
    }
  });

  return {
    status: "creado",
    mensaje:
      "¡Gracias por tu postulación! Hemos recibido tus datos y te contactaremos a la brevedad.",
    voluntario: {
      id: nuevoVoluntario.id,
      nombre: nuevoVoluntario.nombre,
      correo: nuevoVoluntario.correo,
      areas_interes: nuevoVoluntario.areas_interes,
    },
  };
}
