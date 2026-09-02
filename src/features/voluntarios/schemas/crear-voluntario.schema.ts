import { z } from "zod";

export const AREAS_VOLUNTARIADO = [
  "Educación y Talleres",
  "Investigación y Ciencia Ciudadana",
  "Diseño y Comunicación Audiovisual",
  "Incidencia Legal y Políticas Públicas",
  "Acción Comunitaria y Territorial",
  "Logística y Organización de Eventos",
] as const;

export const crearVoluntarioSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(100, "El nombre no puede exceder los 100 caracteres."),
  correo: z
    .string()
    .email("Ingresa un correo electrónico válido.")
    .max(150, "El correo no puede exceder los 150 caracteres."),
  telefono: z
    .string()
    .max(30, "El teléfono no puede exceder los 30 caracteres.")
    .optional()
    .or(z.literal("")),
  ciudad: z
    .string()
    .max(100, "La ciudad no puede exceder los 100 caracteres.")
    .optional()
    .or(z.literal("")),
  profesion_ocupacion: z
    .string()
    .max(120, "La profesión u ocupación no puede exceder los 120 caracteres.")
    .optional()
    .or(z.literal("")),
  areas_interes: z
    .array(z.string())
    .min(1, "Selecciona al menos un área de interés."),
  disponibilidad: z
    .string()
    .max(100, "La disponibilidad no puede exceder los 100 caracteres.")
    .optional()
    .or(z.literal("")),
  motivacion: z
    .string()
    .min(15, "Cuéntanos brevemente tu motivación (mínimo 15 caracteres).")
    .max(1000, "La motivación no puede exceder los 1000 caracteres."),
});

export type CrearVoluntarioInput = z.infer<typeof crearVoluntarioSchema>;
