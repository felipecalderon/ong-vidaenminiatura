import { Bug, Globe, Heart, Mail, MessageCircle, Rss } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
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
              Organización sin fines de lucro comprometida en la protección de
              los animales no humanos, con enfoque prioritario en la defensa,
              conservación y reconocimiento de los insectos, arácnidos y otros
              invertebrados.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4 pb-2 border-b border-outline-variant">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3 text-sm font-body">
              <li>
                <Link
                  href="/peticiones"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  Peticiones Activas
                </Link>
              </li>
              <li>
                <Link
                  href="/noticias"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  Blog y Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <a
                  href="/peticiones/crear"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  Crear Petición
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4 pb-2 border-b border-outline-variant">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm font-body">
              <li className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@insectosvivos.org">hola@masinsectos.org</a>
              </li>
              <li className="mt-4">
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Organización sin fines de lucro.
                  <br />
                  De la vida, para la vida.
                </p>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4 pb-2 border-b border-outline-variant">
              Canales
            </h3>
            <div className="flex gap-3">
              <a
                href="/noticias"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-all active:scale-95"
                aria-label="Noticias"
              >
                <Rss className="h-4 w-4" />
              </a>
              <a
                href="/peticiones"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-all active:scale-95"
                aria-label="Peticiones"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="/nosotros"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-all active:scale-95"
                aria-label="Nosotros"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-on-surface-variant font-body">
              © {new Date().getFullYear()} InsectosVivos. Todos los derechos
              reservados.
            </p>
            <span className="hidden sm:inline text-outline-variant text-xs">
              •
            </span>
            <Link
              href="/terminos-de-uso"
              className="text-xs text-on-surface-variant hover:text-primary transition-colors font-body underline decoration-transparent hover:decoration-primary underline-offset-4"
            >
              Términos de Uso
            </Link>
            <span className="hidden sm:inline text-outline-variant text-xs">
              •
            </span>
            <Link
              href="/privacidad"
              className="text-xs text-on-surface-variant hover:text-primary transition-colors font-body underline decoration-transparent hover:decoration-primary underline-offset-4"
            >
              Política de Privacidad
            </Link>
          </div>
          <p className="text-xs text-on-surface-variant flex items-center justify-center gap-1 font-body">
            Hecho con{" "}
            <Heart className="h-3 w-3 text-tertiary fill-tertiary mx-1" /> para
            los insectos
          </p>
        </div>
      </div>
    </footer>
  );
}
