import { z } from "zod";
import { TipoRecursoEducativo } from "@/generated/prisma/enums";
import { esUrlYoutubeValida } from "../lib/youtube";

export const crearRecursoEducativoSchema = z.object({
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
  tipo: z.nativeEnum(
    TipoRecursoEducativo,
    "El tipo de recurso educativo no es válido",
  ),
  categoriaId: z
    .union([
      z.literal(""),
      z.string().uuid("La categoría seleccionada no es válida"),
    ])
    .optional()
    .default("")
    .transform((value) => (value === "" ? null : value)),
  imagen: z.string().optional().nullable(),
  videoYoutube: z
    .string()
    .optional()
    .nullable()
    .transform((value) =>
      typeof value === "string" ? value.trim() : value,
    )
    .refine(
      (value) =>
        value === null ||
        value === undefined ||
        value === "" ||
        esUrlYoutubeValida(value),
      "Debe ser un enlace de YouTube válido (watch, youtu.be, embed o shorts)",
    )
    .transform((value) => (value ? value : null)),
});

export type CrearRecursoEducativoInput = z.infer<
  typeof crearRecursoEducativoSchema
>;
