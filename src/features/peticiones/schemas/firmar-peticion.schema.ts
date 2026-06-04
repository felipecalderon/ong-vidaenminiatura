import { z } from "zod";

export const firmarPeticionSchema = z.object({
  peticionId: z.string().uuid("ID de petición inválido"),
});

export type FirmarPeticionInput = z.infer<typeof firmarPeticionSchema>;
