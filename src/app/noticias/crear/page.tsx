import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { obtenerCategoriasActivas } from "@/features/categorias/queries";
import { CrearNoticiaForm } from "@/features/noticias/components/crear-noticia-form";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries";

export const metadata: Metadata = {
  title: "Crear Noticia",
  description: "Crea una nueva noticia con contenido enriquecido en markdown.",
};

export default async function CrearNoticiaPage() {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect("/auth/login?returnTo=/noticias/crear");
  }

  const categorias = await obtenerCategoriasActivas();

  return (
    <div className="container mx-auto px-4 py-12">
      <CrearNoticiaForm
        categorias={categorias.map((categoria) => ({
          id: categoria.id,
          nombre: categoria.nombre,
        }))}
      />
    </div>
  );
}
