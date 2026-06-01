import { z } from "zod";

export const publicarPeticionSchema = z.object({
  peticionId: z.string().uuid(),
});
