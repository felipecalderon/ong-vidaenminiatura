import { ArrowUpRight, Compass } from "lucide-react";
import Link from "next/link";
import { ejesEstrategicos } from "../nosotros-data";

export const EjesAccionSection = () => {
  return (
    <section id="ejes-estrategicos" className="relative space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-label uppercase tracking-widest text-primary">
          <Compass className="h-3.5 w-3.5" />
          <span>Marco Estatutario de Acción</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background">
          Nuestros 6 Ejes de Acción
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ejesEstrategicos.map((eje) => {
          const Icon = eje.icon;
          const esActivo = eje.estado === "activo";

          const CardContent = (
            <div className="relative z-10 flex flex-col h-full">
              {/* Header de la tarjeta */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors duration-300 ${
                    esActivo
                      ? "bg-primary/10 border-primary/20 text-primary group-hover:bg-primary group-hover:text-on-primary"
                      : "bg-surface-container border-outline-variant/60 text-on-surface-variant"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-label font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      esActivo
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-surface-container text-on-surface-variant/80 border-outline-variant/40"
                    }`}
                  >
                    {esActivo ? "Operativo" : "Línea Declarada"}
                  </span>
                  {eje.ruta && (
                    <div className="h-7 w-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Títulos y descripción */}
              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-headline font-bold text-on-background group-hover:text-primary transition-colors">
                  {eje.nombre}
                </h3>
                <p className="text-xs font-label uppercase tracking-wider text-primary/80 font-medium">
                  {eje.subtitulo}
                </p>
                <p className="text-xs md:text-sm text-on-surface-variant font-body leading-relaxed pt-1">
                  {eje.descripcion}
                </p>
              </div>
            </div>
          );

          if (eje.ruta) {
            return (
              <Link
                key={eje.id}
                href={eje.ruta}
                className="group relative flex flex-col justify-between rounded-2xl border border-outline-variant/60 bg-surface p-6 md:p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md cursor-pointer backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full bg-linear-to-br from-primary/5 to-transparent group-hover:scale-150 transition-transform duration-700" />
                {CardContent}
              </Link>
            );
          }

          return (
            <div
              key={eje.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-outline-variant/60 bg-surface p-6 md:p-8 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full bg-linear-to-br from-tertiary/5 to-transparent group-hover:scale-150 transition-transform duration-700" />
              {CardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
};
