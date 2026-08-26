import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { TipoRecursoEducativo } from "@/generated/prisma/enums";
import { formatearFecha, formatearTipo } from "../lib/formateadores";

const tipoColors: Record<TipoRecursoEducativo, string> = {
  CONCEPTO: "#7c3aed",
  GUIA: "#0ea5e9",
  PREGUNTA: "#eab308",
  ACCION: "#16a34a",
};

interface RecursoEducativoCardData {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  imagen: string | null;
  tipo: TipoRecursoEducativo;
  fecha_publicacion: Date | null;
  categoria: {
    nombre: string;
    color: string | null;
  } | null;
}

interface RecursoEducativoCardProps {
  recurso: RecursoEducativoCardData;
}

export function RecursoEducativoCard({ recurso }: RecursoEducativoCardProps) {
  return (
    <Link href={`/aprende/${recurso.slug}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/80 bg-surface-container/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-container-high hover:shadow-[0_20px_45px_-24px_var(--primary)] focus-ring">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={
              recurso.imagen ??
              "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=400&fit=crop"
            }
            alt={recurso.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-80 transition-[transform,opacity] duration-500 group-hover:scale-105 group-hover:opacity-100 ultraviolet-image"
          />
          <Badge
            className="absolute top-4 left-4 bg-surface-container-highest/80 backdrop-blur-md font-label text-xs uppercase tracking-widest text-on-surface"
            style={{
              borderColor: tipoColors[recurso.tipo],
              borderWidth: "1.5px",
              borderStyle: "solid",
            }}
          >
            {formatearTipo(recurso.tipo)}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-label uppercase tracking-widest text-on-surface-variant">
            {recurso.categoria && <span>{recurso.categoria.nombre}</span>}
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatearFecha(recurso.fecha_publicacion)}
            </span>
          </div>

          <h3 className="mb-3 line-clamp-2 font-headline text-lg font-black tracking-tight text-on-background transition-colors group-hover:text-primary">
            {recurso.titulo}
          </h3>

          <p className="mb-6 line-clamp-3 text-sm font-body text-on-surface-variant">
            {recurso.resumen}
          </p>

          <span className="mt-auto flex items-center gap-2 text-sm font-label font-bold uppercase tracking-widest text-on-background transition-colors group-hover:text-primary">
            Leer recurso
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
