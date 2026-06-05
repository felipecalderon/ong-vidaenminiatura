import { ArrowRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Peticion } from "@/lib/mock-data";

interface PeticionCardProps {
  peticion: Peticion;
  featured?: boolean;
}

export function PeticionCard({
  peticion,
  featured = false,
}: PeticionCardProps) {
  const progress = Math.min(
    (peticion.cantidad_firmas / peticion.meta_firmas) * 100,
    100,
  );

  return (
    <Link href={`/peticiones/${peticion.slug}`} className="group block h-full">
      <div
        className={`h-full border border-outline-variant bg-surface-container rounded-lg overflow-hidden transition-all duration-200 hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${featured ? "md:flex md:flex-row" : "flex flex-col"}`}
      >
        <div
          className={`relative overflow-hidden ${featured ? "md:w-1/2" : "aspect-video w-full"}`}
        >
          <Image
            src={peticion.imagen}
            alt={peticion.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-luminosity opacity-80 group-hover:opacity-100"
          />
          {peticion.categoria && (
            <Badge
              className="absolute top-4 left-4 bg-surface-container-highest/80 backdrop-blur-md border border-outline-variant font-label text-xs uppercase tracking-widest text-on-surface"
              style={{
                backgroundColor: peticion.categoria.color
                  ? `${peticion.categoria.color}80`
                  : undefined,
              }}
            >
              {peticion.categoria.nombre}
            </Badge>
          )}
        </div>

        <div
          className={`p-6 flex flex-col flex-1 ${featured ? "md:w-1/2 md:justify-center" : ""}`}
        >
          <h3
            className={`font-headline font-black tracking-tight text-on-background line-clamp-2 mb-3 group-hover:text-primary transition-colors ${featured ? "text-2xl lg:text-3xl" : "text-lg"}`}
          >
            {peticion.titulo}
          </h3>

          <p
            className={`text-on-surface-variant font-body line-clamp-2 mb-6 ${featured ? "text-base lg:text-lg" : "text-sm"}`}
          >
            {peticion.resumen}
          </p>

          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between text-xs font-label uppercase tracking-widest text-on-surface-variant">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{peticion.cantidad_firmas.toLocaleString()} firmas</span>
              </div>
              <span>Meta: {peticion.meta_firmas.toLocaleString()}</span>
            </div>

            <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant">
              <div
                className="h-full bg-tertiary rounded-full relative transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-label uppercase tracking-widest font-bold text-tertiary">
                {Math.round(progress)}% completado
              </span>
              <span className="flex items-center gap-2 text-sm font-label uppercase tracking-widest font-bold text-on-background group-hover:text-primary transition-colors">
                Firmar ahora
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
