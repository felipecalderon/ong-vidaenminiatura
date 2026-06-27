import { Target } from "lucide-react";

export const MisionSection = () => {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-linear-to-br from-primary/10 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative rounded-2xl border border-outline-variant/60 bg-surface p-8 md:p-10 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/15">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div className="h-px flex-1 bg-linear-to-r from-primary/20 to-transparent" />
        </div>
        <h2 className="text-xs font-label uppercase tracking-[0.15em] text-primary mb-2">
          Nuestra Misión
        </h2>
        <p className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background leading-[1.1] mb-4">
          Educar, proteger
          <br />y restaurar
        </p>
        <p className="text-on-surface-variant font-body leading-relaxed text-sm md:text-base">
          Promovemos la educación ambiental y el bienestar animal con foco en
          los insectos, trabajando con comunidades, escuelas e instituciones
          para generar un cambio cultural que reconozca el valor irremplazable
          de estos seres en todos los ecosistemas.
        </p>
      </div>
    </div>
  );
};
