import { ArrowRight, Bug, Edit, Leaf, Shield, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NoticiaCard } from "@/features/noticias/components/noticia-card";
import { obtenerListaNoticiasPublicadas } from "@/features/noticias/queries/obtener-lista-noticias-publicadas";
import { PeticionCard } from "@/features/peticiones/components/peticion-card";
import { obtenerListaPeticionesActivas } from "@/features/peticiones/queries/obtener-lista-peticiones-activas";

export default async function HomePage() {
  const { data: peticiones } = await obtenerListaPeticionesActivas({
    limit: "4",
  });
  const { data: noticias } = await obtenerListaNoticiasPublicadas({
    limit: "3",
  });
  const featuredPeticion = peticiones[0];
  const otherPeticiones = peticiones.slice(1);

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Hero Section */}
      {featuredPeticion && (
        <section className="mb-16 relative overflow-hidden bg-surface-container group">
          <div className="absolute inset-0 z-0">
            <Image
              src={featuredPeticion.imagen || "none.jpg"}
              alt={featuredPeticion.titulo}
              fill
              sizes="100vw"
              className="object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700 ultraviolet-image"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 items-end justify-between min-h-150">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/60 border border-tertiary/20 text-white text-xs font-label uppercase tracking-widest mb-6">
                {featuredPeticion.categoria.nombre}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tighter mb-4 text-on-background leading-tight">
                {featuredPeticion.titulo}
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl font-body mb-8 max-w-xl">
                {featuredPeticion.resumen}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/peticiones/${featuredPeticion.slug}`}>
                  <button
                    type="button"
                    className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-lg font-label uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100"
                  >
                    Ver Petición
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/nosotros">
                  <button
                    type="button"
                    className="w-full sm:w-auto bg-transparent border border-outline-variant text-on-background px-8 py-4 rounded-lg font-label uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100"
                  >
                    Quienes somos
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-surface-container-highest/80 backdrop-blur-md border border-outline-variant rounded-lg p-6 w-full md:w-80 shadow-2xl">
              <div className="text-sm font-label text-on-surface-variant uppercase tracking-widest mb-2 line-clamp-1">
                Destacado: {featuredPeticion.titulo}
              </div>
              <div className="text-3xl font-headline font-black tracking-tighter text-on-background mb-4">
                {featuredPeticion.cantidad_firmas.toLocaleString()}
                <span className="text-sm font-body text-secondary font-normal tracking-normal">
                  {""}/ {featuredPeticion.meta_firmas.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden mb-4 border border-outline-variant">
                <div
                  className="h-full bg-tertiary rounded-full relative transition-all duration-1000 ease-out"
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

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, value: "50k+", label: "Firmas recogidas" },
            { icon: Shield, value: "25+", label: "Peticiones activas" },
            { icon: Bug, value: "12", label: "Victorias logradas" },
            { icon: Leaf, value: "100+", label: "Especies protegidas" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-surface-container border border-outline-variant rounded-lg text-center flex flex-col items-center justify-center hover:bg-surface-container-high transition-colors dark:neon-border-cyan dark:hover:neon-border-yellow duration-300"
            >
              <stat.icon className="h-6 w-6 mb-4 text-primary" />
              <div className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Active Petitions */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background">
                Peticiones activas
              </h2>
              <p className="text-on-surface-variant font-body mt-2">
                Firma y haz la diferencia. Cada apoyo cuenta.
              </p>
            </div>
            <Link href="/peticiones">
              <button
                type="button"
                className="bg-transparent border border-outline-variant text-on-background px-4 py-2 rounded-lg font-label text-sm uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPeticiones.map((peticion) => (
              <PeticionCard key={peticion.id} peticion={peticion} />
            ))}
          </div>
        </section>

        {/* News Section */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background">
                Últimas noticias
              </h2>
              <p className="text-on-surface-variant font-body mt-2">
                Mantente informado sobre conservación e impacto.
              </p>
            </div>
            <Link href="/noticias">
              <button
                type="button"
                className="bg-transparent border border-outline-variant text-on-background px-4 py-2 rounded-lg font-label text-sm uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((noticia) => (
              <NoticiaCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden border border-outline-variant rounded-xl bg-surface-container group">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500"></div>
          <div className="relative z-10 p-8 md:p-16 text-center max-w-3xl mx-auto flex flex-col items-center">
            <Edit className="w-12 h-12 text-primary mb-6" />
            <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-background mb-4">
              ¿Tienes una causa que defender?
            </h2>
            <p className="text-lg text-on-surface-variant font-body mb-8">
              Crea tu propia petición y moviliza a miles de personas para
              proteger a los insectos y arácnidos que más lo necesitan.
            </p>
            <Link href="/peticiones/crear">
              <button
                type="button"
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100"
              >
                Crear mi petición
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
