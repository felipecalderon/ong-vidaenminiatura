import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { obtenerCategoriasActivas } from "@/features/categorias/queries/obtener-categorias-activas";
import { CrearRecursoEducativoForm } from "@/features/recursos-educativos/components/crear-recurso-educativo-form";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export const metadata: Metadata = {
  title: "Crear Recurso Educativo",
  description:
    "Crea un nuevo recurso educativo para el hub Aprende de la Fundación Más Insectos.",
};

export default async function CrearRecursoEducativoPage() {
  const [usuario, categorias] = await Promise.all([
    obtenerUsuarioAutenticado(),
    obtenerCategoriasActivas(),
  ]);

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect("/auth/login?returnTo=/aprende/crear");
  }

  return (
    <div className="min-h-screen bg-background container mx-auto px-4 py-12">
      <CrearRecursoEducativoForm
        categorias={categorias.map((categoria) => ({
          id: categoria.id,
          nombre: categoria.nombre,
        }))}
      />
    </div>
  );
}
