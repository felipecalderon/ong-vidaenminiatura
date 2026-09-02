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
          Proteger los animales no humanos, con enfoque prioritario en la
          defensa y conservación de los insectos, arácnidos y otros
          invertebrados, instaurando cambios legislativos, institucionales,
          culturales, sociales y medioambientales en relación a ellos. Desde el
          corazón de La Araucanía, promovemos una convivencia multiespecie justa
          a través de la educación, la investigación y la incidencia,
          transformando la relación de la humanidad con los habitantes más
          vulnerables, pero más presentes en el planeta.
        </p>
      </div>
    </div>
  );
};
