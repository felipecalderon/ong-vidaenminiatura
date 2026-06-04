import { z } from "zod";

export const editarNoticiaSchema = z.object({
  id: z.string().uuid("ID de noticia inválido"),
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
    .min(100, "El contenido debe tener al menos 100 caracteres"),
  imagen: z.string().optional().nullable(),
  categoriaId: z.string().uuid("La categoría seleccionada no es válida"),
});

export type EditarNoticiaInput = z.infer<typeof editarNoticiaSchema>;
