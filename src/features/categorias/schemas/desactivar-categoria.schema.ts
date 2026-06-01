import { z } from "zod";

export const desactivarCategoriaSchema = z.object({
  categoriaId: z.string().uuid(),
});
