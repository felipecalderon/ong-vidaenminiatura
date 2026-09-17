import { ArrowLeft, Calendar, User } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonCompartirFacebook } from "@/components/compartido/boton-compartir-facebook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BotonPublicarNoticia } from "@/features/noticias/components/boton-publicar-noticia";
import { NoticiaGaleria } from "@/features/noticias/components/noticia-galeria";
import { NoticiaMarkdownContent } from "@/features/noticias/components/noticia-markdown-content";
import { obtenerNoticiaDetallePorSlug } from "@/features/noticias/queries/obtener-noticia-detalle-por-slug";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { EstadoNoticia, Rol } from "@/generated/prisma/enums";

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

  if (noticia.estado !== EstadoNoticia.PUBLICADA) {
    const usuario = await obtenerUsuarioAutenticado();

    if (
      !usuario ||
      (usuario.id !== noticia.autor_id && usuario.rol !== Rol.ADMINISTRADOR)
    ) {
      return { title: "Noticia no encontrada" };
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://masinsectos.org";

  return {
    title: noticia.titulo,
    description: noticia.resumen,
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumen ?? undefined,
      url: `${appUrl}/noticias/${slug}`,
      type: "article",
      ...(noticia.imagen && {
        images: [
          {
            url: noticia.imagen,
            alt: noticia.titulo,
          },
        ],
      }),
    },
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

  const estaPublicada = noticia.estado === EstadoNoticia.PUBLICADA;
  const usuario = estaPublicada ? null : await obtenerUsuarioAutenticado();
  const esPropia = usuario?.id === noticia.autor_id;
  const esAdmin = usuario?.rol === Rol.ADMINISTRADOR;

  // Una noticia sin publicar solo es visible para su autor o un administrador
  if (!estaPublicada && !esPropia && !esAdmin) {
    notFound();
  }

  // Solo puede publicar el administrador, o el autor cuando está en borrador
  const estadoPublicable =
    noticia.estado === EstadoNoticia.BORRADOR ||
    noticia.estado === EstadoNoticia.REVISION;

  const puedePublicar =
    estadoPublicable &&
    usuario?.acceso.puedeCrearContenido === true &&
    (esAdmin || (esPropia && noticia.estado === EstadoNoticia.BORRADOR));

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
        className="mb-8 border border-outline-variant font-semibold dark: hover: dark:hover:"
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
            className="border border-outline-variant font-bold"
            style={{
              borderColor: noticia.categoria.color ?? undefined,
            }}
          >
            {noticia.categoria.nombre}
          </Badge>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight flex flex-wrap items-center gap-3">
          <span>{noticia.titulo}</span>
        </h1>

        <p className="text-lg font-semibold text-muted-foreground leading-relaxed">
          {noticia.resumen}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2 border-t border-outline-variant">
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

      {puedePublicar && (
        <div className="mb-8 flex flex-col gap-3 border border-amber-300 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-amber-900 dark:bg-amber-950/30">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            {noticia.estado === EstadoNoticia.BORRADOR
              ? "Esta noticia está en borrador y todavía no es visible para el público."
              : "Esta noticia está en revisión y puedes publicarla para el público."}
          </p>
          <BotonPublicarNoticia noticiaId={noticia.id} />
        </div>
      )}

      <BotonCompartirFacebook slug={slug} tipo="noticia" />

      {/* Image */}
      {noticia.imagen && (
        <div className="relative aspect-video w-full mb-10 border border-outline-variant overflow-hidden">
          <Image
            src={noticia.imagen}
            alt={noticia.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <NoticiaMarkdownContent content={noticia.contenido} />

      <NoticiaGaleria
        imagenes={noticia.imagenes ?? []}
        titulo={noticia.titulo}
      />
    </div>
  );
}
