import { Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BotonCompartirFacebook } from "@/components/compartido/boton-compartir-facebook";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usuarioYaFirmopeticion } from "@/features/firmas/queries/repositories/usuario-ya-firmo-peticion";
import { SignPetitionForm } from "@/features/peticiones/components/sign-petition-form";
import { obtenerPeticionDetallePorSlug } from "@/features/peticiones/queries/obtener-peticion-detalle-por-slug";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

interface PeticionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PeticionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const peticion = await obtenerPeticionDetallePorSlug(slug);

  if (!peticion) {
    return {
      title: "Petición no encontrada",
    };
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://vidaenminiatura.org";

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
  const peticion = await obtenerPeticionDetallePorSlug(slug);

  if (!peticion) {
    notFound();
  }

  const usuario = await obtenerUsuarioAutenticado();
  let yaFirmo = false;

  if (usuario) {
    yaFirmo = await usuarioYaFirmopeticion(usuario.id, peticion.id);
  }

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
                  backgroundColor: peticion.categoria.color ?? undefined,
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

          <SignPetitionForm
            peticionId={peticion.id}
            usuarioAutenticado={!!usuario}
            yaFirmoOriginal={yaFirmo}
          />

          <BotonCompartirFacebook
            slug={slug}
            tipo="peticion"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
