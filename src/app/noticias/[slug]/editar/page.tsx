import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { obtenerCategoriasActivas } from "@/features/categorias/queries/obtener-categorias-activas";
import { EditarNoticiaForm } from "@/features/noticias/components/editar-noticia-form";
import { obtenerNoticiaDetallePorSlug } from "@/features/noticias/queries/obtener-noticia-detalle-por-slug";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

interface EditarNoticiaPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Editar Noticia",
  description: "Edita una noticia existente.",
};

export default async function EditarNoticiaPage({
  params,
}: EditarNoticiaPageProps) {
  const { slug } = await params;
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect(`/auth/login?returnTo=/noticias/${slug}/editar`);
  }

  const [noticia, categorias] = await Promise.all([
    obtenerNoticiaDetallePorSlug(slug),
    obtenerCategoriasActivas(),
  ]);

  if (!noticia) {
    notFound();
  }

  if (noticia.autor_id !== usuario.id && usuario.rol !== "ADMINISTRADOR") {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <EditarNoticiaForm
        noticia={{
          id: noticia.id,
          titulo: noticia.titulo,
          resumen: noticia.resumen,
          contenido: noticia.contenido,
          categoriaId: noticia.categoria_id,
          imagen: noticia.imagen,
        }}
        categorias={categorias.map((categoria) => ({
          id: categoria.id,
          nombre: categoria.nombre,
        }))}
      />
    </div>
  );
}
