import { z } from "zod";

export const crearCategoriaSchema = z.object({
  nombre: z.string().trim().min(3).max(120),
  descripcion: z.string().trim().max(500).optional(),
  color: z.string().trim().max(32).optional(),
});
