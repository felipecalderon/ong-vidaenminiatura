import Image from "next/image";
import { fundadores } from "../nosotros-data";

export const FundadoresSection = () => {
  return (
    <section id="fundadores">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-outline-variant" />
          <span className="text-xs font-label uppercase tracking-[0.15em] text-on-surface-variant">
            Las personas detrás de la misión
          </span>
          <div className="h-px w-8 bg-outline-variant" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background">
          Quiénes somos
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {fundadores.map((f) => (
          <div
            key={f.nombre}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-outline-variant/60 bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 w-full transition-transform duration-500 group-hover:scale-103">
              <Image
                src={f.foto}
                alt={f.nombre}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="overflow-hidden object-cover transition-transform duration-500 will-change-transform transform-gpu group-hover:scale-103 backface-hidden"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent duration-500 group-hover:scale-105" />

              {/* Floating emoji/icon */}
              <div
                className={`absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-md shadow-md ${
                  f.tema === "primary"
                    ? "border-primary/20 bg-primary/10 text-primary"
                    : "border-tertiary/20 bg-tertiary/10 text-tertiary"
                }`}
              >
                <span className="text-2xl">{f.emoji}</span>
              </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 p-6 md:p-8 flex flex-col justify-between">
              {/* Decorative background blob */}
              <div
                aria-hidden
                className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full ${
                  f.tema === "primary" ? "bg-primary/3" : "bg-tertiary/3"
                } blur-3xl`}
              />

              <div className="relative z-10">
                <div className="mb-2">
                  <span
                    className={`text-xs font-label uppercase tracking-[0.15em] font-semibold ${
                      f.tema === "primary" ? "text-primary" : "text-tertiary"
                    }`}
                  >
                    {f.rol}
                  </span>
                </div>

                <h3 className="text-2xl font-headline font-black tracking-tighter text-on-background mb-4">
                  {f.nombre}
                </h3>

                <p className="text-on-surface-variant font-body leading-relaxed text-sm md:text-base">
                  {f.descripcion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
