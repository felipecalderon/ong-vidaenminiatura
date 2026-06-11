import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { obtenerCategoriasActivas } from "@/features/categorias/queries/obtener-categorias-activas";
import { CrearPeticionForm } from "@/features/peticiones/components/crear-peticion-form";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export const metadata: Metadata = {
  title: "Crear Petición",
  description:
    "Crea una nueva causa y junta firmas para proteger la vida silvestre.",
};

export default async function CrearPeticionPage() {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect("/auth/login?returnTo=/peticiones/crear");
  }

  const categorias = await obtenerCategoriasActivas();

  return (
    <div className="container mx-auto px-4 py-12">
      <CrearPeticionForm
        categorias={categorias.map((c) => ({
          id: c.id,
          nombre: c.nombre,
        }))}
      />
    </div>
  );
}
