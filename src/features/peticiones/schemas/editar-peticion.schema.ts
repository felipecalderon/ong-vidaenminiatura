import { z } from "zod";

export const editarPeticionSchema = z.object({
  peticionId: z.string().uuid(),
  titulo: z.string().trim().min(10).max(200),
  resumen: z.string().trim().min(50).max(500),
  contenido: z.string().min(100),
  categoriaId: z.string().uuid(),
});
