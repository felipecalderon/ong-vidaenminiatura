import { redirect } from "next/navigation";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export default async function AdministracionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const usuarioAutenticado = await obtenerUsuarioAutenticado();

  if (!usuarioAutenticado || !usuarioAutenticado.acceso.esAdministrador) {
    redirect("/");
  }

  return (
    <div className="mx-auto w-full max-w-360 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="grid min-w-0 gap-6 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-8">
        <AdminNavigation />
        <div className="min-w-0" id="contenido-administracion">
          {children}
        </div>
      </div>
    </div>
  );
}
