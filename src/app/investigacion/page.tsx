import { ArrowRight, FlaskConical, Microscope } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Paginacion } from "@/components/compartido/paginacion";
import { Botones } from "@/components/compartido/seccion-botones";
import { obtenerCategoriasActivas } from "@/features/categorias/queries/obtener-categorias-activas";
import { NoticiaCard } from "@/features/noticias/components/noticia-card";
import { obtenerListaNoticiasPublicadas } from "@/features/noticias/queries/obtener-lista-noticias-publicadas";
import { PublicacionCard } from "@/features/publicaciones/components/publicacion-card";
import { obtenerPublicacionesPublicadas } from "@/features/publicaciones/queries/obtener-publicaciones-publicadas";
import { cn } from "@/lib/utils";
import type { QueryParams } from "@/types/paginacion";

export const metadata: Metadata = {
  title: "Investigación y Difusión Científica",
  description:
    "Estudios, publicaciones, seminarios y talleres de la Fundación Más Insectos sobre insectos, arácnidos y otros invertebrados.",
};

interface InvestigacionPageProps {
  searchParams: Promise<QueryParams>;
}

const filtros = [
  { href: "/investigacion", label: "Todos", tipo: undefined },
  { href: "/investigacion?tipo=ESTUDIO", label: "Estudios", tipo: "ESTUDIO" },
  {
    href: "/investigacion?tipo=PUBLICACION",
    label: "Publicaciones",
    tipo: "PUBLICACION",
  },
  {
    href: "/investigacion?tipo=EVENTO",
    label: "Seminarios y talleres",
    tipo: "EVENTO",
  },
] as const;

export default async function InvestigacionPage({
  searchParams,
}: InvestigacionPageProps) {
  const resolvedParams = await searchParams;
  const categorias = await obtenerCategoriasActivas();
  const categoriaInvestigacion = categorias.find(
    (categoria) => categoria.slug === "investigacion-ciencia",
  );

  const [publicacionesResult, noticiasResult] = await Promise.all([
    obtenerPublicacionesPublicadas(resolvedParams),
    categoriaInvestigacion
      ? obtenerListaNoticiasPublicadas({
          categoriaId: categoriaInvestigacion.id,
          limit: "6",
        })
      : Promise.resolve({ data: [] as never[] }),
  ]);

  const { data: publicaciones, meta } = publicacionesResult;
  const noticias = noticiasResult.data;
  const tipoActivo = resolvedParams.tipo;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 border border-outline-variant">
          <FlaskConical className="h-4 w-4" />
          <span className="font-label text-xs uppercase tracking-widest">
            Investigación y Difusión Científica
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Ciencia para entender y proteger lo pequeño
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Elaboramos, patrocinamos y publicamos estudios e investigaciones, y
          realizamos seminarios, talleres y actividades formativas sobre
          insectos, arácnidos y otros invertebrados.
        </p>
      </div>

      {/* Filtro por tipo */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filtros.map((filtro) => (
          <Link
            key={filtro.label}
            href={filtro.href}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-label uppercase tracking-widest transition-colors",
              tipoActivo === filtro.tipo
                ? "border-primary bg-primary/10 text-primary"
                : "border-outline-variant text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
            )}
          >
            {filtro.label}
          </Link>
        ))}
      </div>

      {publicaciones.length === 0 ? (
        <div className="p-12 text-center border border-outline-variant bg-card mb-16">
          <Microscope className="mx-auto h-10 w-10 text-primary mb-4" />
          <p className="text-xl font-semibold">
            Aún no hay publicaciones con los filtros aplicados.
          </p>
          <p className="text-muted-foreground mt-2">
            Pronto compartiremos estudios, publicaciones y actividades
            formativas de la fundación.
          </p>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 mt-6 rounded-lg border border-outline-variant px-5 py-3 font-label text-xs font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high"
          >
            Ver artículos en Noticias
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {publicaciones.map((publicacion) => (
              <PublicacionCard key={publicacion.id} publicacion={publicacion} />
            ))}
          </div>
          <Paginacion
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
          />
        </>
      )}

      {/* Contenido derivado de Noticias */}
      {noticias.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-headline font-black tracking-[-0.04em] text-on-background md:text-4xl">
                Artículos de investigación
              </h2>
              <p className="text-on-surface-variant font-body mt-2">
                Noticias y hallazgos publicados en la categoría Investigación y
                Ciencia.
              </p>
            </div>
            {categoriaInvestigacion && (
              <Link
                href={`/noticias?categoriaId=${categoriaInvestigacion.id}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant px-4 py-2.5 font-label text-xs font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high"
              >
                Ver todo
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {noticias.map((noticia) => (
              <NoticiaCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        </section>
      )}

      {/* Cómo puedes actuar */}
      <Botones />
    </div>
  );
}
