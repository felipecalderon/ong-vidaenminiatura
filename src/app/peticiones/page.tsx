import type { Metadata } from "next";
import { BarraFiltros } from "@/components/compartido/barra-filtros";
import { Paginacion } from "@/components/compartido/paginacion";
import { obtenerCategoriasActivas } from "@/features/categorias/queries/obtener-categorias-activas";
import { PeticionCard } from "@/features/peticiones/components/peticion-card";
import { obtenerListaPeticionesActivas } from "@/features/peticiones/queries/obtener-lista-peticiones-activas";
import type { QueryParams } from "@/types/paginacion";

export const metadata: Metadata = {
  title: "Peticiones",
  description:
    "Todas las peticiones activas de la Fundación InsectosVivos. Firma y marca la diferencia.",
};

interface PageProps {
  searchParams: Promise<QueryParams>;
}

export default async function PeticionesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const [paginatedResult, categorias] = await Promise.all([
    obtenerListaPeticionesActivas(resolvedParams),
    obtenerCategoriasActivas(),
  ]);

  const { data: peticiones, meta } = paginatedResult;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4 mb-12">
        <div className="inline-block bg-primary text-on-primary px-4 py-2 border border-outline-variant dark:font-bold">
          ✍️ Peticiones Activas
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Causas que necesitan tu apoyo
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explora las peticiones creadas por nuestra comunidad y suma tu firma
          para ayudarnos a impulsar cambios reales para los insectos y
          arácnidos.
        </p>
      </div>

      <BarraFiltros
        categorias={categorias}
        placeholder="Buscar peticiones..."
      />

      {peticiones.length === 0 ? (
        <div className="p-12 text-center border border-outline-variant bg-card">
          <p className="text-xl font-semibold">
            No se encontraron peticiones con los filtros aplicados.
          </p>
          <p className="text-muted-foreground mt-2">
            Intenta cambiar los términos de búsqueda o selecciona otra
            categoría.
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {peticiones.map((peticion: any) => (
              <PeticionCard
                key={peticion.id}
                peticion={{
                  ...peticion,
                  imagen: peticion.imagen ?? "",
                  meta_firmas: peticion.meta_firmas ?? 1000,
                  fecha_publicacion: peticion.fecha_publicacion ?? undefined,
                  categoria: peticion.categoria
                    ? {
                        ...peticion.categoria,
                        descripcion:
                          peticion.categoria.descripcion ?? undefined,
                        color: peticion.categoria.color ?? undefined,
                      }
                    : undefined,
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
