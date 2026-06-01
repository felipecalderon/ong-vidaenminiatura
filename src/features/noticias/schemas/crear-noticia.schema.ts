import { z } from "zod";

export const crearNoticiaSchema = z.object({
  titulo: z.string().trim().min(10).max(200),
  resumen: z.string().trim().min(50).max(500),
  contenido: z.string().min(100),
  categoriaId: z.string().uuid(),
});
