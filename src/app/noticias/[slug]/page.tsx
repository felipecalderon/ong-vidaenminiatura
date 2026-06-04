import { ArrowLeft, Calendar, User } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerNoticiaDetallePorSlug } from "@/features/noticias/queries";

interface NoticiaDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: NoticiaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await obtenerNoticiaDetallePorSlug(slug);

  if (!noticia) {
    return { title: "Noticia no encontrada" };
  }

  return {
    title: noticia.titulo,
    description: noticia.resumen,
  };
}

export default async function NoticiaDetailPage({
  params,
}: NoticiaDetailPageProps) {
  const { slug } = await params;
  const noticia = await obtenerNoticiaDetallePorSlug(slug);

  if (!noticia) {
    notFound();
  }

  const formattedDate = noticia.fecha_publicacion
    ? new Date(noticia.fecha_publicacion).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back */}
      <Button
        variant="outline"
        asChild
        className="mb-8 border-2 border-black dark:border-white font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all"
      >
        <Link href="/noticias">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Noticias
        </Link>
      </Button>

      {/* Header */}
      <div className="space-y-4 mb-8">
        {noticia.categoria && (
          <Badge
            className="border-2 border-black dark:border-white font-bold"
            style={{
              backgroundColor: noticia.categoria.color ?? undefined,
            }}
          >
            {noticia.categoria.nombre}
          </Badge>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {noticia.titulo}
        </h1>

        <p className="text-lg font-semibold text-muted-foreground leading-relaxed">
          {noticia.resumen}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2 border-t-2 border-black dark:border-white">
          {formattedDate && (
            <span className="flex items-center gap-2 font-medium">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
          )}
          {noticia.autor && (
            <span className="flex items-center gap-2 font-medium">
              <User className="h-4 w-4" />
              {noticia.autor.nombre}
            </span>
          )}
        </div>
      </div>

      {/* Image */}
      {noticia.imagen && (
        <div className="relative aspect-video w-full mb-10 border-4 border-black dark:border-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          <Image
            src={noticia.imagen}
            alt={noticia.titulo}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article content */}
      <article className="prose dark:prose-invert max-w-none whitespace-pre-line text-base leading-relaxed">
        {noticia.contenido}
      </article>
    </div>
  );
}
