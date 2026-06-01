import { z } from "zod";

export const cerrarPeticionSchema = z.object({
  peticionId: z.string().uuid(),
});
