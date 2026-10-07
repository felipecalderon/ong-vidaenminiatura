import { redirect } from "next/navigation";
import { GestionUsuarios } from "@/features/usuarios/components/gestion-usuarios";
import { obtenerTodosLosUsuarios } from "@/features/usuarios/queries/obtener-todos-los-usuarios";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export default async function AdministracionUsuariosPage() {
  const usuarioAutenticado = await obtenerUsuarioAutenticado();

  if (!usuarioAutenticado || !usuarioAutenticado.acceso.esAdministrador) {
    redirect("/");
  }

  const usuarios = await obtenerTodosLosUsuarios();

  return (
    <GestionUsuarios
      initialUsuarios={usuarios}
      currentUser={usuarioAutenticado}
    />
  );
}
