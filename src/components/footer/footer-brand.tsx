import { Bug } from "lucide-react";
import Link from "next/link";

export function FooterBrand() {
  return (
    <div className="space-y-4">
      <Link href="/" className="flex items-center gap-3">
        <div className="text-primary flex items-center justify-center">
          <Bug className="h-6 w-6" />
        </div>
        <span className="font-black text-xl tracking-tighter text-on-background">
          Más Insectos
        </span>
      </Link>
      <p className="text-on-surface-variant text-sm font-body">
        Organización sin fines de lucro comprometida en la protección de los
        animales no humanos, con enfoque prioritario en la defensa, conservación
        y reconocimiento de los insectos, arácnidos y otros invertebrados.
      </p>
    </div>
  );
}
