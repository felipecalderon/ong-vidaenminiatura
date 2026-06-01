import { z } from "zod";
import { Rol } from "@/generated/prisma/enums";

export const actualizarRolUsuarioSchema = z.object({
  usuarioId: z.string().uuid(),
  rol: z.enum([Rol.USUARIO, Rol.AUTOR, Rol.ADMINISTRADOR]),
});
