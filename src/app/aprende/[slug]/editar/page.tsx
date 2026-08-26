import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { obtenerCategoriasActivas } from "@/features/categorias/queries/obtener-categorias-activas";
import { EditarRecursoEducativoForm } from "@/features/recursos-educativos/components/editar-recurso-educativo-form";
import { obtenerRecursoEducativoDetallePorSlug } from "@/features/recursos-educativos/queries/obtener-recurso-educativo-detalle-por-slug";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

interface EditarRecursoEducativoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Editar Recurso Educativo",
  description: "Edita un recurso educativo existente.",
};

export default async function EditarRecursoEducativoPage({
  params,
}: EditarRecursoEducativoPageProps) {
  const [{ slug }, usuario, categorias] = await Promise.all([
    params,
    obtenerUsuarioAutenticado(),
    obtenerCategoriasActivas(),
  ]);

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect(`/auth/login?returnTo=/aprende/${slug}/editar`);
  }

  const recurso = await obtenerRecursoEducativoDetallePorSlug(slug);

  if (!recurso) {
    notFound();
  }

  if (recurso.autor_id !== usuario.id && usuario.rol !== "ADMINISTRADOR") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background container mx-auto px-4 py-12">
      <EditarRecursoEducativoForm
        recurso={{
          id: recurso.id,
          titulo: recurso.titulo,
          resumen: recurso.resumen,
          contenido: recurso.contenido,
          tipo: recurso.tipo,
          categoriaId: recurso.categoria_id,
          imagen: recurso.imagen,
        }}
        categorias={categorias.map((categoria) => ({
          id: categoria.id,
          nombre: categoria.nombre,
        }))}
      />
    </div>
  );
}
