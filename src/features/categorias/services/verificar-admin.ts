import { obtenerUsuarioPorId } from "@/features/usuarios/repositories/obtener-usuario-por-id";
import { EstadoUsuario, Rol } from "@/generated/prisma/enums";

export async function verificarAdmin(operadorId: string) {
  const operador = await obtenerUsuarioPorId(operadorId);
  if (
    !operador ||
    operador.rol !== Rol.ADMINISTRADOR ||
    operador.estado !== EstadoUsuario.ACTIVO
  ) {
    throw new Error("No autorizado");
  }
}
