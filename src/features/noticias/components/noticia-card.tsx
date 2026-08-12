import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface NoticiaCardNoticia {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  imagen: string | null;
  fecha_publicacion: Date | null;
  categoria: { nombre: string; color: string | null } | null;
  autor: { nombre: string } | null;
}

interface NoticiaCardProps {
  noticia: NoticiaCardNoticia;
  featured?: boolean;
}

export function NoticiaCard({ noticia, featured = false }: NoticiaCardProps) {
  const formattedDate = noticia.fecha_publicacion
    ? new Date(noticia.fecha_publicacion).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block h-full">
      <div
        className={`h-full overflow-hidden rounded-2xl border border-outline-variant/80 bg-surface-container/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-container-high hover:shadow-[0_20px_45px_-24px_var(--primary)] focus-ring ${featured ? "md:flex md:flex-row" : "flex flex-col"}`}
      >
        <div
          className={`relative overflow-hidden ${featured ? "md:w-1/2 aspect-4/3 md:aspect-auto" : "aspect-video w-full"}`}
        >
          <Image
            src={
              noticia.imagen ??
              "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=400&fit=crop"
            }
            alt={noticia.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-80 transition-[transform,opacity] duration-500 group-hover:scale-105 group-hover:opacity-100 ultraviolet-image"
          />
          {noticia.categoria && (
            <Badge
              className="absolute top-4 left-4 bg-surface-container-highest/80 backdrop-blur-md font-label text-xs uppercase tracking-widest text-on-surface"
              style={{
                borderColor: noticia.categoria.color ?? undefined,
                borderWidth: "1.5px",
                borderStyle: "solid",
              }}
            >
              {noticia.categoria.nombre}
            </Badge>
          )}
        </div>

        <div
          className={`p-6 flex flex-col flex-1 ${featured ? "md:w-1/2 md:justify-center" : ""}`}
        >
          <div className="flex flex-wrap items-center gap-4 text-xs font-label uppercase tracking-widest text-on-surface-variant mb-4">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            {noticia.autor && (
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {noticia.autor.nombre}
              </span>
            )}
          </div>

          <h3
            className={`font-headline font-black tracking-tight text-on-background line-clamp-2 mb-3 group-hover:text-primary transition-colors ${featured ? "text-2xl lg:text-3xl" : "text-lg"}`}
          >
            {noticia.titulo}
          </h3>

          <p
            className={`text-on-surface-variant font-body line-clamp-3 mb-6 ${featured ? "text-base lg:text-lg" : "text-sm"}`}
          >
            {noticia.resumen}
          </p>

          <span className="mt-auto flex items-center gap-2 text-sm font-label uppercase tracking-widest font-bold text-on-background group-hover:text-primary transition-colors">
            Leer más
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
