import { redirect } from "next/navigation";
import { MisRecursosEducativosTable } from "@/features/recursos-educativos/components/mis-recursos-educativos-table";
import { obtenerRecursosEducativosParaGestion } from "@/features/recursos-educativos/queries/obtener-recursos-educativos-para-gestion";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export const metadata = {
  title: "Mis Recursos Educativos | Más Insectos",
  description: "Gestiona tus recursos educativos creados",
};

export default async function MisRecursosEducativosPage() {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect("/auth/login?returnTo=/aprende/mis-recursos");
  }

  const recursosEducativos = await obtenerRecursosEducativosParaGestion();

  if (!recursosEducativos) {
    redirect("/auth/login?returnTo=/aprende/mis-recursos");
  }

  const esAdmin = usuario.rol === "ADMINISTRADOR";

  return (
    <div className="min-h-screen bg-background container mx-auto px-4 py-12 md:py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-black uppercase md:text-5xl lg:text-6xl">
            {esAdmin ? "Gestión de Recursos Educativos" : "Mis Recursos"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {esAdmin
              ? "Administra todos los recursos educativos de la plataforma"
              : "Gestiona los recursos educativos que has creado"}
          </p>
        </div>
      </div>

      <MisRecursosEducativosTable
        recursosEducativos={recursosEducativos}
        esAdmin={esAdmin}
      />
    </div>
  );
}
