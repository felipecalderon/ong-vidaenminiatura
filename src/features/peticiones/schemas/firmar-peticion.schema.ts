import { z } from "zod";

export const firmarPeticionSchema = z.object({
  peticionId: z.string().uuid("ID de petición inválido"),
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  correo: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido")
    .toLowerCase(),
});

export type FirmarPeticionInput = z.infer<typeof firmarPeticionSchema>;
