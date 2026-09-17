import { ArrowRight, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { BotonCompartirFacebook } from "@/components/compartido/boton-compartir-facebook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SignPetitionForm } from "@/features/firmas/components/sign-petition-form";
import { correoYaFirmoPeticion } from "@/features/firmas/repositories/usuario-ya-firmo-peticion";
import { BotonEnviarRevisionPeticion } from "@/features/peticiones/components/boton-enviar-revision-peticion";
import { BotonPublicarPeticion } from "@/features/peticiones/components/boton-publicar-peticion";
import { obtenerPeticionDetallePorSlug } from "@/features/peticiones/queries/obtener-peticion-detalle-por-slug";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoPeticion, Rol } from "@/generated/prisma/enums";

interface PeticionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const obtenerPeticionVisiblePorSlug = cache(async (slug: string) => {
  const peticion = await obtenerPeticionDetallePorSlug(slug);

  if (!peticion) {
    return null;
  }

  if (peticion.estado === EstadoPeticion.PUBLICADA) {
    return peticion;
  }

  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario) {
    return null;
  }

  const esPropia = usuario.id === peticion.usuario.id;
  const esAdmin = usuario.rol === Rol.ADMINISTRADOR;

  // Una petición sin publicar solo es visible para su creador o un administrador
  if (!esPropia && !esAdmin) {
    return null;
  }

  return peticion;
});

export async function generateMetadata({
  params,
}: PeticionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const peticion = await obtenerPeticionVisiblePorSlug(slug);

  if (!peticion) {
    return {
      title: "Petición no encontrada",
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://masinsectos.org";

  return {
    title: peticion.titulo,
    description: peticion.resumen,
    openGraph: {
      title: peticion.titulo,
      description: peticion.resumen ?? undefined,
      url: `${appUrl}/peticiones/${slug}`,
      type: "website",
      ...(peticion.imagen && {
        images: [
          {
            url: peticion.imagen,
            alt: peticion.titulo,
          },
        ],
      }),
    },
  };
}

export default async function PeticionDetailPage({
  params,
}: PeticionDetailPageProps) {
  const { slug } = await params;
  const peticion = await obtenerPeticionVisiblePorSlug(slug);

  if (!peticion) {
    notFound();
  }

  const usuario = await obtenerUsuarioAutenticado();
  let yaFirmo = false;

  if (usuario && peticion.estado === EstadoPeticion.PUBLICADA) {
    yaFirmo = await correoYaFirmoPeticion(usuario.correo, peticion.id);
  }

  const esPropia = usuario?.id === peticion.usuario.id;
  const esAdmin = usuario?.rol === Rol.ADMINISTRADOR;

  // Publicar una petición es una acción exclusiva del administrador
  const puedePublicar =
    esAdmin &&
    usuario?.acceso.puedeAcceder === true &&
    (peticion.estado === EstadoPeticion.BORRADOR ||
      peticion.estado === EstadoPeticion.REVISION);

  // El creador solo puede enviar su propio borrador a moderación
  const puedeEnviarARevision =
    !esAdmin &&
    esPropia &&
    peticion.estado === EstadoPeticion.BORRADOR &&
    usuario?.acceso.puedeGestionarContenidoPropio === true;

  const metaFirmas = peticion.meta_firmas ?? 1000;
  const progress = Math.min((peticion.cantidad_firmas / metaFirmas) * 100, 100);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                className="border border-outline-variant font-bold"
                style={{
                  borderColor: peticion.categoria.color ?? undefined,
                }}
              >
                {peticion.categoria.nombre}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Creado por{""}
                <span className="font-bold text-foreground">
                  {peticion.usuario.nombre}
                </span>
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {peticion.titulo}
            </h1>
            <p className="text-lg font-semibold text-muted-foreground leading-relaxed">
              {peticion.resumen}
            </p>
          </div>

          {(puedePublicar || puedeEnviarARevision) && (
            <div className="flex flex-col gap-3 border border-amber-300 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-amber-900 dark:bg-amber-950/30">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                {peticion.estado === EstadoPeticion.BORRADOR
                  ? "Esta petición está en borrador y todavía no es visible para el público."
                  : "Esta petición está en revisión y todavía no es visible para el público."}
              </p>
              {puedePublicar ? (
                <BotonPublicarPeticion peticionId={peticion.id} />
              ) : (
                <BotonEnviarRevisionPeticion peticionId={peticion.id} />
              )}
            </div>
          )}

          {peticion.imagen && (
            <div className="relative aspect-video border border-outline-variant overflow-hidden dark:">
              <Image
                src={peticion.imagen}
                alt={peticion.titulo}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}
          <BotonCompartirFacebook slug={slug} tipo="peticion" asChild>
            <Button className="w-full font-bold py-3 border border-outline-variant disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-sky-800 hover:bg-sky-950">
              Compartir en Facebook <ArrowRight />
            </Button>
          </BotonCompartirFacebook>

          <article className="prose dark:prose-invert max-w-none border-t border-outline-variant pt-8 whitespace-pre-line">
            {peticion.contenido}
          </article>
        </div>

        {/* Sidebar Info & Signature Form */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="p-6 border border-outline-variant bg-card space-y-4 dark:">
            <h2 className="text-2xl font-bold">Estado de firmas</h2>

            <div className="flex items-center justify-between text-lg font-semibold">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>
                  {peticion.cantidad_firmas.toLocaleString()} firmantes
                </span>
              </div>
              <span className="text-muted-foreground">
                Meta: {metaFirmas.toLocaleString()}
              </span>
            </div>

            <Progress
              value={progress}
              className="h-4 border border-outline-variant"
            />

            <div className="flex justify-between items-center text-sm font-bold text-primary">
              <span>{Math.round(progress)}% completado</span>
              <span>
                Faltan{" "}
                {(metaFirmas - peticion.cantidad_firmas > 0
                  ? metaFirmas - peticion.cantidad_firmas
                  : 0
                ).toLocaleString()}{" "}
                firmas
              </span>
            </div>
          </div>

          {peticion.estado === EstadoPeticion.PUBLICADA && (
            <SignPetitionForm
              peticionId={peticion.id}
              yaFirmoOriginal={yaFirmo}
              usuarioSesion={
                usuario
                  ? {
                      nombre: usuario.nombre,
                      correo: usuario.correo,
                    }
                  : null
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
