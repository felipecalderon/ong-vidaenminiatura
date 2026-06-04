import { redirect } from "next/navigation";
import { AdministracionDashboard } from "@/features/categorias/components/administracion-dashboard";
import { obtenerTodasLasCategorias } from "@/features/categorias/queries";
import {
  obtenerTodosLosUsuarios,
  obtenerUsuarioAutenticado,
} from "@/features/usuarios/queries";

export const metadata = {
  title: "Administración | InsectosVivos",
  description: "Panel de administración para configurar categorías y usuarios.",
};

export default async function AdministracionPage() {
  const usuarioAutenticado = await obtenerUsuarioAutenticado();

  if (!usuarioAutenticado || !usuarioAutenticado.acceso.esAdministrador) {
    redirect("/");
  }

  const [usuarios, categorias] = await Promise.all([
    obtenerTodosLosUsuarios(),
    obtenerTodasLasCategorias(),
  ]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 border-4 border-black bg-primary/10 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-primary-foreground/10 dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <h1 className="text-3xl font-extrabold text-foreground uppercase tracking-wider">
          Panel de Administración
        </h1>
        <p className="mt-2 text-lg font-semibold text-muted-foreground">
          Configura y gestiona las categorías del sistema y los roles/estados de
          los usuarios registrados.
        </p>
      </div>

      <AdministracionDashboard
        initialUsuarios={usuarios}
        initialCategorias={categorias}
        currentUser={usuarioAutenticado}
      />
    </div>
  );
}
