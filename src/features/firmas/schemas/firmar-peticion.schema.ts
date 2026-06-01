import { z } from "zod";

export const firmarPeticionSchema = z.object({
  peticionId: z.string().uuid(),
  usuarioId: z.string().uuid(),
});
