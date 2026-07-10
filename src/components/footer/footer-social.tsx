import { Globe, MessageCircle, Rss } from "lucide-react";

export function FooterSocial() {
  return (
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
  );
}
