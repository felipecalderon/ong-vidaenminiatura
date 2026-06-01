import Link from "next/link";
import Image from "next/image";
import { Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Peticion } from "@/lib/mock-data";

interface PeticionCardProps {
  peticion: Peticion;
  featured?: boolean;
}

export function PeticionCard({ peticion, featured = false }: PeticionCardProps) {
  const progress = Math.min((peticion.cantidad_firmas / peticion.meta_firmas) * 100, 100);
  
  return (
    <Link href={`/peticiones/${peticion.slug}`} className="group block h-full">
      <Card className={`h-full border-4 border-black dark:border-white bg-card overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-[4px] group-hover:translate-y-[4px] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all ${featured ? 'md:flex md:flex-row' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : 'aspect-video'}`}>
          <Image
            src={peticion.imagen}
            alt={peticion.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {peticion.categoria && (
            <Badge 
              className="absolute top-4 left-4 border-2 border-black dark:border-white font-bold"
              style={{ backgroundColor: peticion.categoria.color }}
            >
              {peticion.categoria.nombre}
            </Badge>
          )}
        </div>
        
        <CardContent className={`p-6 flex flex-col ${featured ? 'md:w-1/2 md:justify-center' : ''}`}>
          <h3 className={`font-bold line-clamp-2 mb-3 group-hover:text-primary transition-colors ${featured ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
            {peticion.titulo}
          </h3>
          
          <p className={`text-muted-foreground line-clamp-2 mb-4 ${featured ? 'text-base lg:text-lg' : 'text-sm'}`}>
            {peticion.resumen}
          </p>
          
          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between text-sm font-medium">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{peticion.cantidad_firmas.toLocaleString()} firmas</span>
              </div>
              <span className="text-muted-foreground">
                Meta: {peticion.meta_firmas.toLocaleString()}
              </span>
            </div>
            
            <Progress 
              value={progress} 
              className="h-3 border-2 border-black dark:border-white"
            />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-primary">
                {Math.round(progress)}% completado
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold group-hover:text-primary transition-colors">
                Firmar ahora
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
