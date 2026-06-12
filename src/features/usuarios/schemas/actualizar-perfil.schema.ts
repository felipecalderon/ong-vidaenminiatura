import { z } from "zod";

export const actualizarPerfilSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres." })
    .trim(),
  picture: z
    .string()
    .url({ message: "La URL de la imagen no es válida." })
    .optional()
    .or(z.literal("")),
});

export type ActualizarPerfilInput = z.infer<typeof actualizarPerfilSchema>;
