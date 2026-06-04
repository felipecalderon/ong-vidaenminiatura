import { ArrowRight, Bug, Leaf, Shield, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoticiaCard } from "@/features/noticias/components/noticia-card";
import { PeticionCard } from "@/features/peticiones/components/peticion-card";
import {
  getNoticiasPublicadas,
  getPeticionesPublicadas,
} from "@/lib/mock-data";

export default function HomePage() {
  const peticiones = getPeticionesPublicadas().slice(0, 4);
  const noticias = getNoticiasPublicadas().slice(0, 3);
  const featuredPeticion = peticiones[0];
  const otherPeticiones = peticiones.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-4 border-black dark:border-white">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary opacity-50" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-primary text-primary-foreground px-4 py-2 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-bold">
                🐝 Fundación InsectosVivos
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Protegiendo a los{" "}
                <span className="text-primary">pequeños héroes</span> de nuestro
                planeta
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Los insectos y arácnidos son esenciales para la vida en la
                Tierra. Únete a nuestra misión de protegerlos firmando
                peticiones y difundiendo conciencia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/peticiones">
                  <Button
                    size="lg"
                    className="font-bold text-lg border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
                  >
                    Ver peticiones
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/nosotros">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-bold text-lg border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
                  >
                    Conocer más
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-secondary border-4 border-black dark:border-white transform rotate-3" />
                <div className="absolute inset-0 bg-primary border-4 border-black dark:border-white transform -rotate-3" />
                <div className="relative border-4 border-black dark:border-white overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=600&fit=crop"
                    alt="Abeja polinizando una flor"
                    width={600}
                    height={600}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b-4 border-black dark:border-white bg-secondary">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, value: "50,000+", label: "Firmas recogidas" },
              { icon: Shield, value: "25+", label: "Peticiones activas" },
              { icon: Bug, value: "12", label: "Victorias logradas" },
              { icon: Leaf, value: "100+", label: "Especies protegidas" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 bg-card border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl md:text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Petition */}
      <section className="border-b-4 border-black dark:border-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Petición destacada
              </h2>
              <p className="text-muted-foreground mt-2">
                Esta petición necesita tu apoyo urgente
              </p>
            </div>
          </div>
          {featuredPeticion && (
            <PeticionCard peticion={featuredPeticion} featured />
          )}
        </div>
      </section>

      {/* More Petitions */}
      <section className="border-b-4 border-black dark:border-white bg-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Peticiones activas
              </h2>
              <p className="text-muted-foreground mt-2">
                Firma y haz la diferencia
              </p>
            </div>
            <Link href="/peticiones">
              <Button
                variant="outline"
                className="font-bold border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all"
              >
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPeticiones.map((peticion) => (
              <PeticionCard key={peticion.id} peticion={peticion} />
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="border-b-4 border-black dark:border-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Últimas noticias
              </h2>
              <p className="text-muted-foreground mt-2">
                Mantente informado sobre conservación
              </p>
            </div>
            <Link href="/noticias">
              <Button
                variant="outline"
                className="font-bold border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all"
              >
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((noticia) => (
              <NoticiaCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary border-b-4 border-black dark:border-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            ¿Tienes una causa que defender?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Crea tu propia petición y moviliza a miles de personas para proteger
            a los insectos y arácnidos que más lo necesitan.
          </p>
          <Link href="/peticiones/crear">
            <Button
              size="lg"
              variant="secondary"
              className="font-bold text-lg border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
            >
              Crear mi petición
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="border-b-4 border-black dark:border-white bg-muted">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Conoce a nuestros amigos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop",
                alt: "Abeja en flor",
              },
              {
                src: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=300&h=300&fit=crop",
                alt: "Mariposa monarca",
              },
              {
                src: "https://images.unsplash.com/photo-1568667256549-094345857637?w=300&h=300&fit=crop",
                alt: "Tarántula",
              },
              {
                src: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=300&h=300&fit=crop",
                alt: "Mariquita",
              },
            ].map((img) => (
              <div
                key={img.alt}
                className="aspect-square relative border-4 border-black dark:border-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
