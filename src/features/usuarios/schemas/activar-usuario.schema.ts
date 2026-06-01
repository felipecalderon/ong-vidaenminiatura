import { z } from "zod";

export const activarUsuarioSchema = z.object({
  usuarioId: z.string().uuid({ version: "v4" }),
});
