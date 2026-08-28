import { ArrowLeft, Calendar, ExternalLink, MapPin, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonCompartirFacebook } from "@/components/compartido/boton-compartir-facebook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NoticiaMarkdownContent } from "@/features/noticias/components/noticia-markdown-content";
import {
  formatearAutores,
  formatearFecha,
  formatearTipo,
} from "@/features/publicaciones/lib/formateadores";
import { obtenerPublicacionDetallePorSlug } from "@/features/publicaciones/queries/obtener-publicacion-detalle-por-slug";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoPublicacion } from "@/generated/prisma/enums";

interface PublicacionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PublicacionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const publicacion = await obtenerPublicacionDetallePorSlug(slug);

  if (!publicacion) {
    return { title: "Publicación no encontrada" };
  }

  if (publicacion.estado !== EstadoPublicacion.PUBLICADA) {
    const usuario = await obtenerUsuarioAutenticado();
    if (!usuario || usuario.id !== publicacion.autor_id) {
      return { title: "Publicación no encontrada" };
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://masinsectos.org";

  return {
    title: publicacion.titulo,
    description: publicacion.resumen,
    openGraph: {
      title: publicacion.titulo,
      description: publicacion.resumen ?? undefined,
      url: `${appUrl}/investigacion/${slug}`,
      type: "article",
      ...(publicacion.imagen && {
        images: [
          {
            url: publicacion.imagen,
            alt: publicacion.titulo,
          },
        ],
      }),
    },
  };
}

export default async function PublicacionDetailPage({
  params,
}: PublicacionDetailPageProps) {
  const { slug } = await params;
  const publicacion = await obtenerPublicacionDetallePorSlug(slug);

  if (!publicacion) {
    notFound();
  }

  if (publicacion.estado !== EstadoPublicacion.PUBLICADA) {
    const usuario = await obtenerUsuarioAutenticado();
    if (!usuario || usuario.id !== publicacion.autor_id) {
      notFound();
    }
  }

  const autoresTexto = formatearAutores(publicacion.autores);
  const fechaEvento = publicacion.fecha_evento
    ? formatearFecha(publicacion.fecha_evento)
    : null;
  const fechaPublicacion = publicacion.fecha_publicacion
    ? formatearFecha(publicacion.fecha_publicacion)
    : null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button
        variant="outline"
        asChild
        className="mb-8 border border-outline-variant font-semibold"
      >
        <Link href="/investigacion">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Investigación
        </Link>
      </Button>

      <div className="space-y-4 mb-8">
        <Badge
          className="border border-outline-variant font-bold"
          variant="secondary"
        >
          {formatearTipo(publicacion.tipo)}
        </Badge>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {publicacion.titulo}
        </h1>

        <p className="text-lg font-semibold text-muted-foreground leading-relaxed">
          {publicacion.resumen}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2 border-t border-outline-variant">
          {autoresTexto && (
            <span className="flex items-center gap-2 font-medium">
              <Users className="h-4 w-4" />
              {autoresTexto}
            </span>
          )}
          {publicacion.anio && (
            <span className="flex items-center gap-2 font-medium">
              <Calendar className="h-4 w-4" />
              {publicacion.anio}
            </span>
          )}
          {publicacion.tipo === "EVENTO" && publicacion.lugar && (
            <span className="flex items-center gap-2 font-medium">
              <MapPin className="h-4 w-4" />
              {publicacion.lugar}
            </span>
          )}
          {publicacion.tipo === "EVENTO" && fechaEvento && (
            <span className="flex items-center gap-2 font-medium">
              <Calendar className="h-4 w-4" />
              {fechaEvento}
            </span>
          )}
          {publicacion.autor && (
            <span className="flex items-center gap-2 font-medium">
              Publicado por {publicacion.autor.nombre}
            </span>
          )}
          {!publicacion.anio && fechaPublicacion && (
            <span className="flex items-center gap-2 font-medium">
              <Calendar className="h-4 w-4" />
              {fechaPublicacion}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <BotonCompartirFacebook slug={slug} tipo="publicacion" />
        {publicacion.enlace && (
          <a
            href={publicacion.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-label text-sm font-bold uppercase tracking-widest text-on-primary transition-colors hover:bg-primary-fixed-dim"
          >
            Ver fuente original
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {publicacion.imagen && (
        <div className="relative aspect-video w-full mb-10 border border-outline-variant overflow-hidden">
          <Image
            src={publicacion.imagen}
            alt={publicacion.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <NoticiaMarkdownContent content={publicacion.contenido} />
    </div>
  );
}
