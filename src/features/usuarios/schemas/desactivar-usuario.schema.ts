import { z } from "zod";

export const desactivarUsuarioSchema = z.object({
  usuarioId: z.string().uuid(),
});
