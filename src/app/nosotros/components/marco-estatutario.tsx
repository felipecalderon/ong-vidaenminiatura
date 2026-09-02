import { Landmark, ScrollText, ShieldCheck } from "lucide-react";
import { denominacionInstitucional, objetoPrincipal } from "../nosotros-data";

export const MarcoEstatutarioSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-outline-variant/60 bg-surface p-8 md:p-12 backdrop-blur-sm">
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-tertiary/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-primary font-bold">
            <ScrollText className="h-4 w-4" />
            <span>Marco Legal &amp; Estatutos</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-headline font-black tracking-tighter text-on-background">
            {objetoPrincipal.titulo}
          </h2>

          <p className="text-sm md:text-base font-body leading-relaxed text-on-surface-variant italic border-l-2 border-primary/50 pl-4 py-1">
            &ldquo;{objetoPrincipal.declaracion}&rdquo;
          </p>

          <p className="text-xs md:text-sm font-body text-on-surface-variant/90 leading-relaxed pt-2">
            La <strong>{denominacionInstitucional.nombreOficial}</strong> (
            <em>{denominacionInstitucional.nombreFantasia}</em>) es una{" "}
            {denominacionInstitucional.tipoEntidad.toLowerCase()} con sede en{" "}
            {denominacionInstitucional.domicilio}. Toda nuestra labor se
            organiza en torno a la rigurosidad científica, la educación y la
            defensa de los derechos de los animales no humanos.
          </p>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-outline-variant/50 bg-surface-container/40 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/15 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-semibold">
                Naturaleza Legal
              </p>
              <p className="text-sm font-headline font-bold text-on-background">
                Fundación Sin Fines de Lucro
              </p>
            </div>
          </div>

          <div className="h-px bg-outline-variant/40" />

          <div className="space-y-2 text-xs text-on-surface-variant font-body leading-relaxed">
            <p className="flex items-center gap-2">
              <Landmark className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>Sede: Temuco, La Araucanía</span>
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>Marco: Estatutos Fundacionales y Ley N° 19.885</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
