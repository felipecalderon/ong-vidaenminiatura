import { Heart, MapPin, Sparkles, Users } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-surface-container via-surface-container/50 to-background">
      {/* Decorative floating elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-tertiary/5 blur-[100px]" />

        {/* Wing-like decorative shapes */}
        <svg
          role="img"
          aria-label="Formas decorativas"
          className="absolute top-20 right-[10%] h-32 w-32 text-primary/4 dark:text-primary/[0.07]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <ellipse cx="50" cy="50" rx="45" ry="25" fill="currentColor" />
          <ellipse cx="50" cy="50" rx="25" ry="45" fill="currentColor" />
        </svg>
        <svg
          role="img"
          aria-label="Formas decorativas"
          className="absolute bottom-40 left-[5%] h-40 w-40 text-tertiary/4 dark:text-tertiary/[0.07]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <ellipse cx="50" cy="50" rx="45" ry="20" fill="currentColor" />
          <ellipse cx="50" cy="50" rx="20" ry="45" fill="currentColor" />
        </svg>
        <svg
          role="img"
          aria-label="Formas decorativas"
          className="absolute top-40 left-[15%] h-20 w-20 text-primary/3 dark:text-primary/5"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path d="M50 5 Q65 35 50 95 Q35 35 50 5Z" fill="currentColor" />
        </svg>

        {/* Dots pattern */}
        <div className="absolute top-32 right-[8%] grid grid-cols-3 gap-2 opacity-[0.04] dark:opacity-[0.08]">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-20 md:pb-40 md:pt-32">
        {/* Eyebrow */}
        <div className="mb-10 inline-flex animate-[fadeIn_0.6s_ease-out] items-center gap-2 rounded-full border border-primary/15 bg-linear-to-r from-primary/7 to-primary/3 px-4 py-1.5 text-xs font-label uppercase tracking-[0.15em] text-primary">
          <MapPin className="h-3 w-3" />
          Temuco, Chile · Fundada 2026
        </div>

        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-end">
          <div className="md:col-span-3 animate-[fadeIn_0.8s_ease-out]">
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-headline font-black tracking-[-0.03em] text-on-background leading-[0.92] mb-6">
              Cada insecto{" "}
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                importa.
              </span>
              <br />
              <span className="text-[0.6em] font-bold tracking-tight text-on-surface-variant">
                Esos pequeños seres te necesitan
              </span>
            </h1>

            <p className="max-w-xl text-base md:text-lg text-on-surface-variant font-body leading-relaxed">
              Somos una fundación nacida en el corazón de La Araucanía con una
              convicción simple pero poderosa: los insectos y demás seres vivos
              sostienen la vida en la Tierra, y educar sobre ellos es el primer
              paso para preservarla.
            </p>
          </div>

          {/* Stats as floating badges */}
          <div className="md:col-span-2 flex flex-col gap-3 animate-[fadeIn_1s_ease-out]">
            {[
              {
                value: "5+",
                label: "años de labor",
                icon: Sparkles,
                color: "primary",
              },
              {
                value: "2",
                label: "fundadores",
                icon: Users,
                color: "tertiary",
              },
              {
                value: "10k+",
                label: "vidas impactadas",
                icon: Heart,
                color: "primary",
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className="group flex items-center gap-4 rounded-2xl border border-outline-variant/60 bg-surface/70 backdrop-blur-sm px-5 py-4 hover:bg-surface hover:border-primary/20 transition-all duration-300 hover:translate-x-1"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/8 to-primary/2 border border-primary/10">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-headline font-black tracking-tighter text-on-background leading-none mb-0.5">
                    {s.value}
                  </div>
                  <div className="text-[11px] font-label uppercase tracking-widest text-on-surface-variant">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organic bottom transition */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent"
      />
    </section>
  );
};
