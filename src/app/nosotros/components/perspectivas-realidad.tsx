import { Eye, Flower2, Waves } from "lucide-react";

export const PerspectivasSection = () => {
  return (
    <section id="ventanas" className="relative">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-outline-variant" />
          <span className="text-xs font-label uppercase tracking-[0.15em] text-on-surface-variant">
            Perspectivas de la realidad
          </span>
          <div className="h-px w-8 bg-outline-variant" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background">
          Ventanas de percepción
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-on-surface-variant font-body leading-relaxed">
          El universo no se limita a nuestra experiencia humana. Cada especie
          abre un portal único a la existencia a través de sus propios sentidos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Humanos */}
        <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
          <div className="absolute top-0 right-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 rounded-full bg-linear-to-br from-primary/5 to-transparent group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-headline font-bold text-on-background mb-3">
              La Mirada Humana
            </h3>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">
              Los humanos interpretamos el universo a través de la vista de luz
              visible, el lenguaje y la narrativa.
            </p>
          </div>
        </div>

        {/* Abejas */}
        <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
          <div className="absolute top-0 right-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 rounded-full bg-linear-to-br from-tertiary/5 to-transparent group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-tertiary/10 to-tertiary/5 border border-tertiary/10">
              <Flower2 className="h-5 w-5 text-tertiary" />
            </div>
            <h3 className="text-lg font-headline font-bold text-on-background mb-3">
              La Visión Ultravioleta
            </h3>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">
              Las abejas lo ven mediante luz ultravioleta, descubriendo patrones
              ocultos en las flores que nosotros jamás notaríamos a simple
              vista.
            </p>
          </div>
        </div>

        {/* Cetáceos */}
        <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
          <div className="absolute top-0 right-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 rounded-full bg-linear-to-br from-primary/5 to-transparent group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/10">
              <Waves className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-headline font-bold text-on-background mb-3">
              El Eco de los Cantos
            </h3>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">
              Los cetáceos &ldquo;dibujan&rdquo; el océano en su mente a través
              del mapa tridimensional del eco de sus cantos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
