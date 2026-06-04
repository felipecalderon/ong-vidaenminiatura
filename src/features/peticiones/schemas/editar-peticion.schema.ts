import { z } from "zod";

export const editarPeticionSchema = z.object({
  id: z.string().uuid("ID de petición inválido"),
  titulo: z
    .string()
    .min(10, "El título debe tener al menos 10 caracteres")
    .max(200, "El título no puede exceder los 200 caracteres"),
  resumen: z
    .string()
    .min(50, "El resumen debe tener al menos 50 caracteres")
    .max(500, "El resumen no puede exceder los 500 caracteres"),
  contenido: z
    .string()
    .min(100, "El contenido detallado debe tener al menos 100 caracteres"),
  imagen: z
    .string()
    .url("Debe ser una URL válida para la imagen")
    .or(
      z
        .string()
        .regex(
          /^\/[a-zA-Z0-9_-]+.*\.(jpg|jpeg|png|webp|gif|svg)$/,
          "Debe ser una ruta de imagen local válida",
        ),
    )
    .optional()
    .nullable(),
  meta_firmas: z
    .number()
    .int()
    .min(10, "La meta debe ser de al menos 10 firmas"),
  categoriaId: z.string().uuid("La categoría seleccionada no es válida"),
});

export type EditarPeticionInput = z.infer<typeof editarPeticionSchema>;
