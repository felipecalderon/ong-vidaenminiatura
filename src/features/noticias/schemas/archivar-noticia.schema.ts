import { z } from "zod";

export const archivarNoticiaSchema = z.object({
  noticiaId: z.string().uuid(),
});
