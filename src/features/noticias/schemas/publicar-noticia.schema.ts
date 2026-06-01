import { z } from "zod";

export const publicarNoticiaSchema = z.object({
  noticiaId: z.string().uuid(),
});
