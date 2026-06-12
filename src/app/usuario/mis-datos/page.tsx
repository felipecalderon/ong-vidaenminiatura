import { redirect } from "next/navigation";
import { EditarPerfilForm } from "@/features/usuarios/components/editar-perfil-form";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export const metadata = {
  title: "Mis Datos | InsectosVivos",
  description: "Actualiza tu información personal y foto de perfil",
};

export default async function MisDatosPage() {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-10 text-center max-w-xl mx-auto">
        <h1 className="mb-3 text-4xl font-black uppercase md:text-5xl">
          Mis Datos
        </h1>
        <p className="text-lg text-muted-foreground">
          Modifica tu nombre público y tu imagen de perfil
        </p>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-card p-6 md:p-10 shadow-sm max-w-2xl mx-auto">
        <EditarPerfilForm usuario={usuario} />
      </div>
    </div>
  );
}
