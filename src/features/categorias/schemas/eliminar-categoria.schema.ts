import { z } from "zod";

export const eliminarCategoriaSchema = z.object({
  categoriaId: z.string().uuid(),
  categoriaReemplazoId: z.string().uuid().optional(),
});

export const obtenerConteosCategoriaSchema = z.object({
  categoriaId: z.string().uuid(),
});
