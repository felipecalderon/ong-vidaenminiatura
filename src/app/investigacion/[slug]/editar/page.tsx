import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { EditarPublicacionForm } from "@/features/publicaciones/components/editar-publicacion-form";
import { obtenerPublicacionDetallePorSlug } from "@/features/publicaciones/queries/obtener-publicacion-detalle-por-slug";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

interface EditarPublicacionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Editar Publicación",
  description: "Edita una publicación existente.",
};

export default async function EditarPublicacionPage({
  params,
}: EditarPublicacionPageProps) {
  const [{ slug }, usuario] = await Promise.all([
    params,
    obtenerUsuarioAutenticado(),
  ]);

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect(`/auth/login?returnTo=/investigacion/${slug}/editar`);
  }

  const publicacion = await obtenerPublicacionDetallePorSlug(slug);

  if (!publicacion) {
    notFound();
  }

  if (publicacion.autor_id !== usuario.id && usuario.rol !== "ADMINISTRADOR") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background container mx-auto px-4 py-12">
      <EditarPublicacionForm
        publicacion={{
          id: publicacion.id,
          titulo: publicacion.titulo,
          resumen: publicacion.resumen,
          contenido: publicacion.contenido,
          tipo: publicacion.tipo,
          autores: publicacion.autores,
          anio: publicacion.anio,
          enlace: publicacion.enlace,
          lugar: publicacion.lugar,
          fecha_evento: publicacion.fecha_evento,
          imagen: publicacion.imagen,
        }}
      />
    </div>
  );
}
