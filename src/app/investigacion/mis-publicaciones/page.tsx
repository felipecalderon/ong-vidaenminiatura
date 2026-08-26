import { redirect } from "next/navigation";
import { MisPublicacionesTable } from "@/features/publicaciones/components/mis-publicaciones-table";
import { obtenerPublicacionesParaGestion } from "@/features/publicaciones/queries/obtener-publicaciones-para-gestion";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export const metadata = {
  title: "Mis Publicaciones | Más Insectos",
  description: "Gestiona tus publicaciones creadas",
};

export default async function MisPublicacionesPage() {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect("/auth/login?returnTo=/investigacion/mis-publicaciones");
  }

  const publicaciones = await obtenerPublicacionesParaGestion();

  if (!publicaciones) {
    redirect("/auth/login?returnTo=/investigacion/mis-publicaciones");
  }

  const esAdmin = usuario.rol === "ADMINISTRADOR";

  return (
    <div className="min-h-screen bg-background container mx-auto px-4 py-12 md:py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-black uppercase md:text-5xl lg:text-6xl">
            {esAdmin ? "Gestión de Publicaciones" : "Mis Publicaciones"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {esAdmin
              ? "Administra todas las publicaciones de la plataforma"
              : "Gestiona las publicaciones que has creado"}
          </p>
        </div>
      </div>

      <MisPublicacionesTable publicaciones={publicaciones} esAdmin={esAdmin} />
    </div>
  );
}
