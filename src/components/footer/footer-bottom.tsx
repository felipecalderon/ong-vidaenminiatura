import { Heart } from "lucide-react";
import Link from "next/link";

export function FooterBottom() {
  return (
    <div className="mt-12 pt-6 border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <p className="text-xs text-on-surface-variant font-body">
          &copy; {new Date().getFullYear()} Más Insectos. Todos los derechos
          reservados.
        </p>
        <span className="hidden sm:inline text-outline-variant text-xs">
          &bull;
        </span>
        <Link
          href="/terminos-de-uso"
          className="text-xs text-on-surface-variant hover:text-primary transition-colors font-body underline decoration-transparent hover:decoration-primary underline-offset-4"
        >
          Términos de Uso
        </Link>
        <span className="hidden sm:inline text-outline-variant text-xs">
          &bull;
        </span>
        <Link
          href="/privacidad"
          className="text-xs text-on-surface-variant hover:text-primary transition-colors font-body underline decoration-transparent hover:decoration-primary underline-offset-4"
        >
          Política de Privacidad
        </Link>
      </div>
      <p className="text-xs text-on-surface-variant flex items-center justify-center gap-1 font-body">
        Hecho con <Heart className="h-3 w-3 text-tertiary fill-tertiary mx-1" />{" "}
        para los insectos
      </p>
    </div>
  );
}
