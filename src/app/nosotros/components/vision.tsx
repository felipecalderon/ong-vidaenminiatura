import { Sparkles } from "lucide-react";

export const VisionSection = () => {
  return (
    <div className="group relative md:pt-16">
      <div className="absolute -inset-1 bg-linear-to-br from-tertiary/10 to-tertiary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative rounded-2xl border border-outline-variant/60 bg-surface p-8 md:p-10 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-tertiary/10 to-tertiary/5 border border-tertiary/15">
            <Sparkles className="h-6 w-6 text-tertiary" />
          </div>
          <div className="h-px flex-1 bg-linear-to-r from-tertiary/20 to-transparent" />
        </div>
        <h2 className="text-xs font-label uppercase tracking-[0.15em] text-tertiary mb-2">
          Nuestra Visión
        </h2>
        <p className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background leading-[1.1] mb-4">
          Un mundo que cuida
          <br />
          lo pequeño
        </p>
        <p className="text-on-surface-variant font-body leading-relaxed text-sm md:text-base">
          Imaginamos una sociedad multiespecie donde todos los seres vivos —sin
          importar su forma, tamaño o especie— sean protegidos legalmente.
          Aspiramos a un futuro donde la educación y la empatía generen
          protección hacia los invertebrados, asegurando la vida de todos y
          todas de manera antiespecista.
        </p>
      </div>
    </div>
  );
};
