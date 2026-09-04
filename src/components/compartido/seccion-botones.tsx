import { Megaphone, PenLine, Share2, Users } from "lucide-react";
import Link from "next/link";
import { BotonCompartirFacebook } from "./boton-compartir-facebook";

export function Botones() {
  return (
    <section className="mt-20 rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-background mb-4">
          Cómo puedes actuar
        </h2>
        <p className="text-lg text-on-surface-variant font-body max-w-2xl mx-auto">
          Aprender es el primer paso; el siguiente es participar. Elige una
          causa, crea una petición, comparte este material o súmate como
          voluntario/a.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/peticiones"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-primary transition-colors hover:bg-primary-fixed-dim"
        >
          <Megaphone className="h-5 w-5" />
          Firmar una petición
        </Link>
        <Link
          href="/peticiones/crear"
          className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high"
        >
          <PenLine className="h-5 w-5" />
          Crear una petición
        </Link>
        <div className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background">
          <Share2 className="h-5 w-5" />
          Compartir hub
          <BotonCompartirFacebook slug="" tipo="recurso" className="h-7 w-7" />
        </div>
        <a
          href="mailto:hola@masinsectos.org?subject=Voluntariado"
          className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-background/40 px-6 py-3.5 font-label text-sm font-bold uppercase tracking-widest text-on-background transition-colors hover:bg-surface-container-high"
        >
          <Users className="h-5 w-5" />
          Ser voluntario/a
        </a>
      </div>
    </section>
  );
}
