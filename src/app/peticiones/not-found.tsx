import { FileQuestion, FileText, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PeticionesNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-xl text-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Animated Icon Container */}
        <div className="relative p-6 bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 rounded-2xl animate-pulse">
          <FileText className="h-16 w-16 text-teal-600 dark:text-teal-400" />
          <FileQuestion className="absolute -bottom-2 -right-2 h-8 w-8 text-teal-800 dark:text-teal-200 bg-background rounded-full border border-border p-1" />
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Petición no encontrada
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            Lo sentimos, no pudimos encontrar la petición que estás buscando. Es
            posible que haya sido cerrada, archivada, eliminada o la dirección
            sea incorrecta.
          </p>
        </div>

        {/* Buttons Action Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full pt-4 justify-center">
          <Button
            variant="default"
            asChild
            className="font-semibold px-6 py-5 h-auto transition-all"
          >
            <Link href="/peticiones">
              <FileText className="mr-2 h-5 w-5" />
              Ver todas las peticiones
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="font-semibold px-6 py-5 h-auto border border-outline-variant transition-all"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Ir al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
