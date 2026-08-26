import {
  ArrowRight,
  BookOpen,
  Megaphone,
  PenLine,
  Share2,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BotonCompartirFacebook } from "@/components/compartido/boton-compartir-facebook";
import { Paginacion } from "@/components/compartido/paginacion";
import { obtenerCategoriasActivas } from "@/features/categorias/queries/obtener-categorias-activas";
import { NoticiaCard } from "@/features/noticias/components/noticia-card";
import { obtenerListaNoticiasPublicadas } from "@/features/noticias/queries/obtener-lista-noticias-publicadas";
import { RecursoEducativoCard } from "@/features/recursos-educativos/components/recurso-educativo-card";
import { obtenerRecursosEducativosPublicados } from "@/features/recursos-educativos/queries/obtener-recursos-educativos-publicados";
import { cn } from "@/lib/utils";
import type { QueryParams } from "@/types/paginacion";

export const metadata: Metadata = {
  title: "Aprende",
  description:
    "Conceptos clave, guías de identificación, mitos y preguntas frecuentes, y cómo actuar para proteger a los insectos, arácnidos y otros invertebrados.",
};

interface AprendePageProps {
  searchParams: Promise<QueryParams>;
}

const filtros = [
  { href: "/aprende", label: "Todos", tipo: undefined },
  {
    href: "/aprende?tipo=CONCEPTO",
    label: "Conceptos clave",
    tipo: "CONCEPTO",
  },
  {
    href: "/aprende?tipo=GUIA",
    label: "Guías de identificación",
    tipo: "GUIA",
  },
  {
    href: "/aprende?tipo=PREGUNTA",
    label: "Mitos y preguntas",
    tipo: "PREGUNTA",
  },
  {
    href: "/aprende?tipo=ACCION",
    label: "Cómo actuar",
    tipo: "ACCION",
  },
] as const;

export default async function AprendePage({ searchParams }: AprendePageProps) {
  const resolvedParams = await searchParams;
  const categorias = await obtenerCategoriasActivas();
  const categoriaEducacion = categorias.find(
    (categoria) => categoria.slug === "educacion-divulgacion",
  );

  const [recursosResult, noticiasResult] = await Promise.all([
    obtenerRecursosEducativosPublicados(resolvedParams),
    categoriaEducacion
      ? obtenerListaNoticiasPublicadas({
          categoriaId: categoriaEducacion.id,
          limit: "6",
        })
      : Promise.resolve({ data: [] as never[] }),
  ]);

  const { data: recursos, meta } = recursosResult;
  const noticias = noticiasResult.data;
  const tipoActivo = resolvedParams.tipo;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 border border-outline-variant">
          <BookOpen className="h-4 w-4" />
          <span className="font-label text-xs uppercase tracking-widest">
            Educación y Concientización
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Aprende para entender y proteger lo pequeño
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Ejecutamos intervenciones informativas, firmamos convenios con
          instituciones educativas y desarrollamos estrategias comunicacionales
          y de voluntariado para proteger a los insectos, arácnidos y otros
          invertebrados.
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

      {recursos.length === 0 ? (
        <div className="p-12 text-center border border-outline-variant bg-card mb-16">
          <BookOpen className="mx-auto h-10 w-10 text-primary mb-4" />
          <p className="text-xl font-semibold">
            Aún no hay recursos educativos con los filtros aplicados.
          </p>
          <p className="text-muted-foreground mt-2">
            Pronto compartiremos conceptos, guías, mitos y formas de actuar para
            sumarte a la conservación de los invertebrados.
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
            {recursos.map((recurso) => (
              <RecursoEducativoCard key={recurso.id} recurso={recurso} />
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
                Artículos de Educación y Divulgación
              </h2>
              <p className="text-on-surface-variant font-body mt-2">
                Contenido pedagógico, mitos y guías publicados en la categoría
                Educación y Divulgación.
              </p>
            </div>
            {categoriaEducacion && (
              <Link
                href={`/noticias?categoriaId=${categoriaEducacion.id}`}
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
      <section className="mt-20 rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-background mb-4">
            Cómo puedes actuar
          </h2>
          <p className="text-lg text-on-surface-variant font-body max-w-2xl mx-auto">
            Aprender es el primer paso; el siguiente es participar. Elige una
            causa, crea una petición, comparte este material o súmate como
            voluntario/a.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/peticiones"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-primary transition-colors hover:bg-primary-fixed-dim"
          >
            <Megaphone className="h-5 w-5" />
            Firmar una petición
          </Link>
          <Link
            href="/peticiones/crear"
            className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high"
          >
            <PenLine className="h-5 w-5" />
            Crear una petición
          </Link>
          <div className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background">
            <Share2 className="h-5 w-5" />
            Compartir hub
            <BotonCompartirFacebook
              slug=""
              tipo="recurso"
              className="h-7 w-7"
            />
          </div>
          <a
            href="mailto:hola@masinsectos.org?subject=Voluntariado"
            className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high"
          >
            <Users className="h-5 w-5" />
            Ser voluntario/a
          </a>
        </div>
      </section>
    </div>
  );
}
