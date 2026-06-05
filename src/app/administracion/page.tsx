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
      <div className="mb-8 border border-outline-variant bg-primary/10 p-6 dark:bg-primary-foreground/10 dark:">
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
