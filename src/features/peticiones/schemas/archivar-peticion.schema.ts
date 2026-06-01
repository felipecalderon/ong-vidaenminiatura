import { z } from "zod";

export const archivarPeticionSchema = z.object({
  peticionId: z.string().uuid(),
});
