import { Mail } from "lucide-react";

export function FooterContact() {
  return (
    <div>
      <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4 pb-2 border-b border-outline-variant">
        Contacto
      </h3>
      <ul className="space-y-3 text-sm font-body">
        <li className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
          <Mail className="h-4 w-4" />
          <a href="mailto:hola@masinsectos.org">hola@masinsectos.org</a>
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
  );
}
