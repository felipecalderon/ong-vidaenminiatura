import { Bug, Globe, Heart, Mail, MessageCircle, Rss } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-4 border-black dark:border-white bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 border-2 border-black dark:border-white">
                <Bug className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">InsectosVivos</span>
            </Link>
            <p className="text-muted-foreground">
              Fundación dedicada a la protección y conservación de insectos y
              arácnidos en todo el mundo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b-2 border-black dark:border-white pb-2">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/peticiones"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  Peticiones Activas
                </Link>
              </li>
              <li>
                <Link
                  href="/noticias"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  Blog y Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/peticiones/crear"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  Crear Petición
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b-2 border-black dark:border-white pb-2">
              Contacto
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:info@insectosvivos.org"
                  className="hover:text-primary hover:underline"
                >
                  info@insectosvivos.org
                </a>
              </li>
              <li className="mt-4">
                <p className="text-muted-foreground text-sm">
                  Av. de la Naturaleza 123
                  <br />
                  Ciudad Verde, CP 12345
                </p>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b-2 border-black dark:border-white pb-2">
              Canales
            </h3>
            <div className="flex gap-2">
              <a
                href="/noticias"
                className="p-2 border-2 border-black dark:border-white bg-card hover:bg-primary hover:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all"
                aria-label="Noticias"
              >
                <Rss className="h-5 w-5" />
              </a>
              <a
                href="/peticiones"
                className="p-2 border-2 border-black dark:border-white bg-card hover:bg-primary hover:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all"
                aria-label="Peticiones"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="/nosotros"
                className="p-2 border-2 border-black dark:border-white bg-card hover:bg-primary hover:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all"
                aria-label="Nosotros"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t-2 border-black dark:border-white flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InsectosVivos. Todos los derechos
            reservados.
          </p>
          <p className="text-sm flex items-center gap-1">
            Hecho con <Heart className="h-4 w-4 text-primary fill-primary" />{" "}
            para los insectos
          </p>
        </div>
      </div>
    </footer>
  );
}
