import { FileText, Home, MapPinX, Newspaper } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalNotFound() {
  return (
    <div className="container mx-auto px-4 py-28 max-w-2xl text-center">
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Decorative Graphic Element */}
        <div className="relative p-8 bg-primary/5 dark:bg-primary/10 border border-outline-variant rounded-full animate-bounce">
          <MapPinX className="h-20 w-20 text-primary" />
        </div>

        {/* Messaging */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Página no encontrada
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            Ups! Parece que te has perdido. La página que estás buscando no
            existe o ha sido movida a otra ubicación.
          </p>
        </div>

        {/* Section Quicklinks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-6 max-w-lg">
          <Button
            variant="default"
            asChild
            className="font-semibold py-6 h-auto"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Inicio
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="font-semibold py-6 h-auto border border-outline-variant"
          >
            <Link href="/noticias">
              <Newspaper className="mr-2 h-5 w-5" />
              Noticias
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="font-semibold py-6 h-auto border border-outline-variant"
          >
            <Link href="/peticiones">
              <FileText className="mr-2 h-5 w-5" />
              Peticiones
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
