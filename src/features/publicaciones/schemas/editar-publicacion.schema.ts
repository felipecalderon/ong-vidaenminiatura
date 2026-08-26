import { z } from "zod";
import { TipoPublicacion } from "@/generated/prisma/enums";

export const editarPublicacionSchema = z.object({
  id: z.string().uuid("ID de publicación inválido"),
  titulo: z
    .string()
    .min(10, "El título debe tener al menos 10 caracteres")
    .max(200, "El título no puede exceder los 200 caracteres"),
  resumen: z
    .string()
    .min(30, "El resumen debe tener al menos 30 caracteres")
    .max(500, "El resumen no puede exceder los 500 caracteres")
    .optional()
    .default(""),
  contenido: z
    .string()
    .min(100, "El contenido debe tener al menos 100 caracteres"),
  tipo: z.nativeEnum(TipoPublicacion, "El tipo de publicación no es válido"),
  autores: z
    .string()
    .optional()
    .default("")
    .transform((value) =>
      value
        .split(",")
        .map((autor) => autor.trim())
        .filter(Boolean),
    ),
  anio: z
    .union([
      z.literal(""),
      z.coerce
        .number()
        .int()
        .min(1900, "El año no puede ser anterior a 1900")
        .max(2100),
    ])
    .optional()
    .default("")
    .transform((value) => (value === "" ? null : Number(value))),
  enlace: z
    .union([z.literal(""), z.string().url("El enlace debe ser una URL válida")])
    .optional()
    .default("")
    .transform((value) => (value === "" ? null : value)),
  lugar: z
    .string()
    .max(200, "El lugar no puede exceder los 200 caracteres")
    .optional()
    .default("")
    .transform((value) => (value.trim() === "" ? null : value.trim())),
  fechaEvento: z
    .string()
    .optional()
    .default("")
    .transform((value) =>
      value && !Number.isNaN(Date.parse(value)) ? new Date(value) : null,
    ),
  imagen: z.string().optional().nullable(),
});

export type EditarPublicacionInput = z.infer<typeof editarPublicacionSchema>;
