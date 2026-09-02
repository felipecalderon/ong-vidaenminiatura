import "server-only";
import { prisma } from "@/lib/prisma";
import type { CrearVoluntarioInput } from "../schemas/crear-voluntario.schema";

export async function registrarVoluntario(data: CrearVoluntarioInput) {
  return prisma.voluntario.create({
    data: {
      nombre: data.nombre.trim(),
      correo: data.correo.trim().toLowerCase(),
      telefono: data.telefono ? data.telefono.trim() : null,
      ciudad: data.ciudad ? data.ciudad.trim() : null,
      profesion_ocupacion: data.profesion_ocupacion
        ? data.profesion_ocupacion.trim()
        : null,
      areas_interes: data.areas_interes,
      disponibilidad: data.disponibilidad ? data.disponibilidad.trim() : null,
      motivacion: data.motivacion.trim(),
    },
  });
}
