import { ArrowRight, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NoticiaCard } from "@/features/noticias/components/noticia-card";
import { obtenerListaNoticiasPublicadas } from "@/features/noticias/queries/obtener-lista-noticias-publicadas";
import { obtenerListaPeticionesActivas } from "@/features/peticiones/queries/obtener-lista-peticiones-activas";
import { PublicacionCard } from "@/features/publicaciones/components/publicacion-card";
import { obtenerPublicacionesRecientes } from "@/features/publicaciones/queries/obtener-publicaciones-recientes";
import { RecursoEducativoCard } from "@/features/recursos-educativos/components/recurso-educativo-card";
import { obtenerRecursosEducativosRecientes } from "@/features/recursos-educativos/queries/obtener-recursos-educativos-recientes";
import { HeroSection } from "./nosotros/components/hero";

export default async function HomePage() {
  const [
    { data: peticiones },
    { data: noticias },
    publicaciones,
    recursosEducativos,
  ] = await Promise.all([
    obtenerListaPeticionesActivas({ limit: "4" }),
    obtenerListaNoticiasPublicadas({ limit: "3" }),
    obtenerPublicacionesRecientes("3"),
    obtenerRecursosEducativosRecientes("3"),
  ]);
  const featuredPeticion = peticiones[0];
  const _otherPeticiones = peticiones.slice(1);

  return (
    /*
     * THESIS: La portada es una ventana de observación ultravioleta, no un mosaico de tarjetas.
     * OWN-WORLD: superficies violetas profundas, bordes precisos, cian para vida y tipografía compacta.
     * STORY: comprender por qué importan los insectos, descubrir una causa y participar.
     * FIRST VIEWPORT: declaración + ojo de abeja arriba; la petición activa aparece como acción inmediata.
     * FORM: Persuade / editorial de campo, con composición asimétrica y paneles de lectura corta.
     */
    <div className="min-h-screen text-on-background">
      {/* Hero Section */}
      <HeroSection />
      {featuredPeticion && (
        <section className="group relative overflow-hidden border-y border-outline-variant/70 bg-surface-container-low">
          <div className="absolute inset-0 z-0 opacity-70">
            <Image
              src={featuredPeticion.imagen || "none.jpg"}
              alt={featuredPeticion.titulo}
              fill
              sizes="100vw"
              className="object-cover ultraviolet-image"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-background/20"></div>
          </div>
          <div className="relative z-10 mx-auto flex min-h-136 max-w-7xl flex-col items-start justify-end gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between md:py-16 lg:min-h-156">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-tertiary/30 bg-tertiary/10 px-3 py-2 text-xs font-label uppercase tracking-widest text-tertiary">
                {featuredPeticion.categoria.nombre}
              </div>
              <h1 className="mb-5 text-4xl font-headline font-black leading-[0.95] tracking-[-0.045em] text-on-background md:text-6xl lg:text-7xl">
                {featuredPeticion.titulo}
              </h1>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
                {featuredPeticion.resumen}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`/peticiones/${featuredPeticion.slug}`}>
                  <span className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-primary shadow-[0_12px_30px_-14px_var(--primary)] transition-colors hover:bg-primary-fixed-dim sm:w-auto">
                    Ver Petición
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
                <Link href="/peticiones">
                  <span className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high sm:w-auto">
                    Todas las peticiones
                  </span>
                </Link>
              </div>
            </div>

            <div className="w-full rounded-2xl border border-outline-variant/80 bg-background/75 p-5 backdrop-blur-md md:w-80">
              <div className="mb-3 text-[0.68rem] font-label uppercase tracking-widest text-on-surface-variant line-clamp-1">
                Destacado: {featuredPeticion.titulo}
              </div>
              <div className="mb-4 text-4xl font-headline font-black tracking-[-0.04em] text-on-background">
                {featuredPeticion.cantidad_firmas.toLocaleString()}
                <span className="text-sm font-body text-secondary font-normal tracking-normal">
                  {""}/ {featuredPeticion.meta_firmas.toLocaleString()}
                </span>
              </div>
              <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-surface-container-lowest">
                <div
                  className="h-full bg-tertiary rounded-full relative transition-[width] duration-1000 ease-out"
                  style={{
                    width: `${Math.min((featuredPeticion.cantidad_firmas / featuredPeticion.meta_firmas) * 100, 100)}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-xs text-on-surface-variant font-body flex justify-between items-center">
                <span>Progreso actual</span>
                <Link
                  href={`/peticiones/${featuredPeticion.slug}`}
                  className="text-primary hover:underline font-bold transition-colors"
                >
                  Firmar →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="group relative mb-12 overflow-hidden rounded-2xl border border-primary/30 bg-violet-100">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center p-8 text-center md:p-16">
          <Edit className="mb-6 h-10 w-10 text-primary" />
          <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-background mb-4 dark:text-violet-900">
            ¿Tienes una causa que defender?
          </h2>
          <p className="text-lg text-on-surface-variant font-body mb-8">
            Crea tu propia petición y moviliza a miles de personas para proteger
            a los insectos y arácnidos que más lo necesitan.
          </p>
          <Link href="/peticiones/crear">
            <span className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100">
              Crear una petición
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Link>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Educación Section */}
        {recursosEducativos.length > 0 && (
          <section className="mb-20">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-headline font-black tracking-[-0.04em] text-on-background md:text-4xl">
                  Educación y Concientización
                </h2>
                <p className="text-on-surface-variant font-body mt-2">
                  Conceptos clave, guías de identificación, mitos y preguntas
                  frecuentes, y cómo actuar por los invertebrados.
                </p>
              </div>
              <Link href="/aprende">
                <span className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant px-4 py-2.5 font-label text-xs font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high">
                  Ver todo
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {recursosEducativos.map((recurso) => (
                <RecursoEducativoCard key={recurso.id} recurso={recurso} />
              ))}
            </div>
          </section>
        )}

        {/* Research Section */}
        {publicaciones.length > 0 && (
          <section className="mb-20">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-headline font-black tracking-[-0.04em] text-on-background md:text-4xl">
                  Investigación y Difusión Científica
                </h2>
                <p className="text-on-surface-variant font-body mt-2">
                  Estudios, publicaciones, seminarios y talleres sobre insectos,
                  arácnidos y otros invertebrados.
                </p>
              </div>
              <Link href="/investigacion">
                <span className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant px-4 py-2.5 font-label text-xs font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high">
                  Ver todo
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {publicaciones.map((publicacion) => (
                <PublicacionCard
                  key={publicacion.id}
                  publicacion={publicacion}
                />
              ))}
            </div>
          </section>
        )}

        {/* News Section */}
        <section className="mb-20">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-headline font-black tracking-[-0.04em] text-on-background md:text-4xl">
                Artículos de interés
              </h2>
              <p className="text-on-surface-variant font-body mt-2">
                Publicaciones, investigación, ciencia, noticias y más...
              </p>
            </div>
            <Link href="/noticias">
              <span className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant px-4 py-2.5 font-label text-xs font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high">
                Ver todo
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {noticias.map((noticia) => (
              <NoticiaCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
