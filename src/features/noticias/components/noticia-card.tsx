import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Noticia } from "@/lib/mock-data";

interface NoticiaCardProps {
  noticia: Noticia;
  featured?: boolean;
}

export function NoticiaCard({ noticia, featured = false }: NoticiaCardProps) {
  const formattedDate = noticia.fecha_publicacion
    ? new Date(noticia.fecha_publicacion).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block h-full">
      <Card
        className={`h-full border-4 border-black dark:border-white bg-card overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-[4px] group-hover:translate-y-[4px] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all ${featured ? "md:flex md:flex-row" : ""}`}
      >
        <div
          className={`relative overflow-hidden ${featured ? "md:w-1/2 aspect-[4/3] md:aspect-auto" : "aspect-video"}`}
        >
          <Image
            src={noticia.imagen}
            alt={noticia.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {noticia.categoria && (
            <Badge
              className="absolute top-4 left-4 border-2 border-black dark:border-white font-bold"
              style={{ backgroundColor: noticia.categoria.color }}
            >
              {noticia.categoria.nombre}
            </Badge>
          )}
        </div>

        <CardContent
          className={`p-6 flex flex-col ${featured ? "md:w-1/2 md:justify-center" : ""}`}
        >
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            {noticia.autor && (
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {noticia.autor.nombre}
              </span>
            )}
          </div>

          <h3
            className={`font-bold line-clamp-2 mb-3 group-hover:text-primary transition-colors ${featured ? "text-2xl lg:text-3xl" : "text-lg"}`}
          >
            {noticia.titulo}
          </h3>

          <p
            className={`text-muted-foreground line-clamp-3 mb-4 ${featured ? "text-base lg:text-lg" : "text-sm"}`}
          >
            {noticia.resumen}
          </p>

          <span className="mt-auto flex items-center gap-1 text-sm font-semibold group-hover:text-primary transition-colors">
            Leer más
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
