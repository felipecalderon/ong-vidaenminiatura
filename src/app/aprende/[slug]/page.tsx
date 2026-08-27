import { ArrowLeft, Calendar, FolderOpen, User } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonCompartirFacebook } from "@/components/compartido/boton-compartir-facebook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NoticiaMarkdownContent } from "@/features/noticias/components/noticia-markdown-content";
import { VideoYoutubeFacade } from "@/features/recursos-educativos/components/video-youtube-facade";
import {
  formatearFecha,
  formatearTipo,
} from "@/features/recursos-educativos/lib/formateadores";
import { obtenerRecursoEducativoDetallePorSlug } from "@/features/recursos-educativos/queries/obtener-recurso-educativo-detalle-por-slug";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoRecursoEducativo } from "@/generated/prisma/enums";

interface RecursoEducativoDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: RecursoEducativoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const recurso = await obtenerRecursoEducativoDetallePorSlug(slug);

  if (!recurso) {
    return { title: "Recurso educativo no encontrado" };
  }

  if (recurso.estado !== EstadoRecursoEducativo.PUBLICADA) {
    const usuario = await obtenerUsuarioAutenticado();
    if (!usuario || usuario.id !== recurso.autor_id) {
      return { title: "Recurso educativo no encontrado" };
    }
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://masinsectos.vercel.app";

  return {
    title: recurso.titulo,
    description: recurso.resumen,
    openGraph: {
      title: recurso.titulo,
      description: recurso.resumen ?? undefined,
      url: `${appUrl}/aprende/${slug}`,
      type: "article",
      ...(recurso.imagen && {
        images: [
          {
            url: recurso.imagen,
            alt: recurso.titulo,
          },
        ],
      }),
    },
  };
}

export default async function RecursoEducativoDetailPage({
  params,
}: RecursoEducativoDetailPageProps) {
  const { slug } = await params;
  const recurso = await obtenerRecursoEducativoDetallePorSlug(slug);

  if (!recurso) {
    notFound();
  }

  if (recurso.estado !== EstadoRecursoEducativo.PUBLICADA) {
    const usuario = await obtenerUsuarioAutenticado();
    if (!usuario || usuario.id !== recurso.autor_id) {
      notFound();
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button
        variant="outline"
        asChild
        className="mb-8 border border-outline-variant font-semibold"
      >
        <Link href="/aprende">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Aprende
        </Link>
      </Button>

      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            className="border border-outline-variant font-bold"
            variant="secondary"
          >
            {formatearTipo(recurso.tipo)}
          </Badge>
          {recurso.categoria && (
            <Badge
              className="border border-outline-variant font-bold"
              variant="outline"
            >
              <FolderOpen className="mr-1.5 h-3.5 w-3.5" />
              {recurso.categoria.nombre}
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {recurso.titulo}
        </h1>

        <p className="text-lg font-semibold text-muted-foreground leading-relaxed">
          {recurso.resumen}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2 border-t border-outline-variant">
          {recurso.autor && (
            <span className="flex items-center gap-2 font-medium">
              <User className="h-4 w-4" />
              Publicado por {recurso.autor.nombre}
            </span>
          )}
          {recurso.fecha_publicacion && (
            <span className="flex items-center gap-2 font-medium">
              <Calendar className="h-4 w-4" />
              {formatearFecha(recurso.fecha_publicacion)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <BotonCompartirFacebook slug={slug} tipo="recurso" />
      </div>

      {recurso.imagen ? (
        <div className="relative aspect-video w-full mb-10 border border-outline-variant overflow-hidden">
          <Image
            src={recurso.imagen}
            alt={recurso.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover"
            priority
          />
        </div>
      ) : recurso.video_youtube ? (
        <div className="mb-10">
          <VideoYoutubeFacade
            url={recurso.video_youtube}
            titulo={recurso.titulo}
          />
        </div>
      ) : null}

      <NoticiaMarkdownContent content={recurso.contenido} />

      {recurso.imagen && recurso.video_youtube && (
        <div className="my-10">
          <VideoYoutubeFacade
            url={recurso.video_youtube}
            titulo={recurso.titulo}
          />
        </div>
      )}

      {/* CTA final */}
      <section className="mt-16 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center md:p-12">
        <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-background mb-4">
          El conocimiento se completa con la acción
        </h2>
        <p className="text-lg text-on-surface-variant font-body mb-8 max-w-2xl mx-auto">
          Comparte este recurso, firma una petición o súmate como voluntario/a
          para proteger a los invertebrados.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row justify-center items-center">
          <Link href="/peticiones">
            <span className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-primary transition-colors hover:bg-primary-fixed-dim sm:w-auto">
              Firmar una petición
            </span>
          </Link>
          <Link href="/peticiones/crear">
            <span className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high sm:w-auto">
              Crear una petición
            </span>
          </Link>
          <span className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background sm:w-auto">
            Compartir
            <BotonCompartirFacebook
              slug={slug}
              tipo="recurso"
              className="h-7 w-7"
            />
          </span>
          <a
            href="mailto:hola@masinsectos.org?subject=Voluntariado"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high sm:w-auto"
          >
            Ser voluntario/a
          </a>
        </div>
      </section>
    </div>
  );
}
