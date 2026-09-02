import { Sparkles } from "lucide-react";
import { FormularioVoluntariado } from "@/features/voluntarios/components/formulario-voluntariado";

export const VoluntariadoSection = () => {
  return (
    <section id="voluntariado" className="relative space-y-10 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-tertiary/20 bg-tertiary/5 px-3 py-1 text-xs font-label uppercase tracking-widest text-tertiary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Participación Ciudadana</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background">
          Red de Voluntariado + Insectos
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant font-body leading-relaxed">
          Buscamos personas apasionadas por la ciencia, la educación, el derecho
          y el territorio. No importa tu área de formación: cada disciplina
          aporta a la protección de los invertebrados.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <FormularioVoluntariado />
      </div>
    </section>
  );
};
