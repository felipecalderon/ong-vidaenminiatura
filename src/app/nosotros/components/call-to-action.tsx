import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl">
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-br from-primary/4 via-primary/1 to-background"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,var(--tw-gradient-stops))] from-primary/6 via-transparent to-transparent"
      />

      {/* Decorative wing shapes */}
      <svg
        role="img"
        aria-label="Formas decorativas"
        aria-hidden
        className="absolute -top-16 -right-16 h-64 w-64 text-primary/3 dark:text-primary/5"
        viewBox="0 0 100 100"
        fill="none"
      >
        <ellipse cx="50" cy="50" rx="48" ry="22" fill="currentColor" />
        <ellipse cx="50" cy="50" rx="22" ry="48" fill="currentColor" />
      </svg>

      <div className="relative z-10 border border-primary/15 rounded-3xl p-10 md:p-16 text-center backdrop-blur-sm">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/15">
          <Leaf className="h-5 w-5 text-primary" />
        </div>

        <p className="text-xs font-label uppercase tracking-[0.15em] text-primary mb-4">
          Únete al movimiento
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background mb-4">
          ¿Compartes nuestra visión?
        </h2>
        <p className="text-on-surface-variant font-body max-w-lg mx-auto mb-10 leading-relaxed text-sm md:text-base">
          Hay muchas formas de sumarte: firmando peticiones, compartiendo
          noticias o simplemente hablando de insectos con las personas que
          quieres. Cada gesto cuenta.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/peticiones"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary px-8 py-4 font-label uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-all duration-300 active:scale-95"
          >
            Ver peticiones activas
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/noticias"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-transparent border border-outline-variant text-on-background px-8 py-4 font-label uppercase tracking-widest font-bold hover:bg-surface-container-high transition-all duration-300 active:scale-95"
          >
            Leer noticias
          </Link>
        </div>
      </div>
    </section>
  );
};
