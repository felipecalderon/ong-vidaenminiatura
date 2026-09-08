import Link from "next/link";

export function FooterLinks() {
  return (
    <div>
      <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4 pb-2 border-b border-outline-variant">
        Enlaces Rápidos
      </h3>
      <ul className="space-y-3 text-sm font-body">
        <li>
          <Link
            href="/aprende"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Aprende
          </Link>
        </li>
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
            href="/investigacion"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Investigación y Ciencia
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
          <Link
            href="/voluntarios"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Voluntariado
          </Link>
        </li>
        <li>
          <Link
            href="/recursos-digitales"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Recursos Digitales
          </Link>
        </li>
      </ul>
    </div>
  );
}
