import { redirect } from "next/navigation";
import { MisPeticionesTable } from "@/features/peticiones/components/mis-peticiones-table";
import { obtenerPeticionesParaGestion } from "@/features/peticiones/queries";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries";
import { obtenerCategoriasActivas } from "@/features/categorias/queries";

export const metadata = {
  title: "Mis Peticiones | InsectosVivos",
  description: "Gestiona tus peticiones creadas",
};

export default async function MisPeticionesPage() {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect("/auth/login");
  }

  const peticiones = await obtenerPeticionesParaGestion();

  if (!peticiones) {
    redirect("/auth/login");
  }

  const categorias = await obtenerCategoriasActivas();
  const esAdmin = usuario.rol === "ADMINISTRADOR";

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-black uppercase md:text-5xl lg:text-6xl">
            {esAdmin ? "Gestión de Peticiones" : "Mis Peticiones"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {esAdmin
              ? "Administra todas las peticiones de la plataforma"
              : "Gestiona las peticiones que has creado"}
          </p>
        </div>
      </div>

      <MisPeticionesTable 
        peticiones={peticiones} 
        esAdmin={esAdmin} 
        categorias={categorias} 
      />
    </div>
  );
}
