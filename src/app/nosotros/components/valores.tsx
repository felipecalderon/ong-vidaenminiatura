import { valores } from "../nosotros-data";

export const ValoresSection = () => {
  return (
    <section id="valores">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-outline-variant" />
          <span className="text-xs font-label uppercase tracking-[0.15em] text-on-surface-variant">
            Lo que nos guía
          </span>
          <div className="h-px w-8 bg-outline-variant" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background">
          Nuestros valores
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
        {valores.map((v, i) => (
          <div
            key={v.titulo}
            className="group relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface p-7 md:p-8 hover:shadow-sm transition-all duration-300"
          >
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary/4 to-transparent group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 flex gap-5">
              <div className="shrink-0 mt-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/10 group-hover:border-primary/20 group-hover:shadow-sm transition-all duration-300">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-headline font-bold tracking-tight text-on-background mb-2">
                  {v.titulo}
                </h3>
                <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                  {v.descripcion}
                </p>
              </div>
            </div>

            {/* Corner decorative dash */}
            <div aria-hidden className="absolute bottom-3 right-3 h-8 w-8">
              <svg
                role="img"
                aria-label="Formas decorativas"
                viewBox="0 0 32 32"
                fill="none"
                className="h-full w-full text-primary/6"
              >
                <path
                  d="M2 30 L30 2"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M10 30 L30 10"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
