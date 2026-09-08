import { z } from "zod";
import { Rol } from "@/generated/prisma/enums";

export const crearInvitacionSchema = z.object({
  correo: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Ingresa un correo electrónico válido" }),
  rol: z.enum([Rol.USUARIO, Rol.AUTOR, Rol.ADMINISTRADOR], {
    message: "Selecciona un rol válido",
  }),
});

export type CrearInvitacionSchemaInput = z.infer<typeof crearInvitacionSchema>;
