import type { Metadata } from "next";
import { BarraFiltros } from "@/components/compartido/barra-filtros";
import { Paginacion } from "@/components/compartido/paginacion";
import { obtenerCategoriasActivas } from "@/features/categorias/queries/obtener-categorias-activas";
import { NoticiaCard } from "@/features/noticias/components/noticia-card";
import { obtenerListaNoticiasPublicadas } from "@/features/noticias/queries/obtener-lista-noticias-publicadas";
import type { QueryParams } from "@/types/paginacion";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Mantente informado sobre conservación de insectos y arácnidos. Artículos y novedades de la Fundación InsectosVivos.",
};

interface PageProps {
  searchParams: Promise<QueryParams>;
}

export default async function NoticiasPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const [paginatedResult, categorias] = await Promise.all([
    obtenerListaNoticiasPublicadas(resolvedParams),
    obtenerCategoriasActivas(),
  ]);

  const { data: noticias, meta } = paginatedResult;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4 mb-12">
        <div className="inline-block bg-primary text-on-primary px-4 py-2 border border-outline-variant dark:font-bold">
          📰 Últimas Noticias
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Actualidad en conservación
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Artículos, victorias y descubrimientos sobre el mundo de los insectos
          y arácnidos que merecen ser conocidos.
        </p>
      </div>

      <BarraFiltros categorias={categorias} placeholder="Buscar noticias..." />

      {noticias.length === 0 ? (
        <div className="p-12 text-center border border-outline-variant bg-card">
          <p className="text-xl font-semibold">
            No se encontraron noticias con los filtros aplicados.
          </p>
          <p className="text-muted-foreground mt-2">
            Intenta cambiar los términos de búsqueda o selecciona otra
            categoría.
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia) => (
              <NoticiaCard
                key={noticia.id}
                noticia={{
                  id: noticia.id,
                  slug: noticia.slug,
                  titulo: noticia.titulo,
                  resumen: noticia.resumen,
                  imagen: noticia.imagen,
                  fecha_publicacion: noticia.fecha_publicacion,
                  categoria: noticia.categoria
                    ? {
                        nombre: noticia.categoria.nombre,
                        color: noticia.categoria.color ?? null,
                      }
                    : null,
                  autor: noticia.autor
                    ? { nombre: noticia.autor.nombre }
                    : null,
                }}
              />
            ))}
          </div>

          <Paginacion
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
          />
        </>
      )}
    </div>
  );
}
