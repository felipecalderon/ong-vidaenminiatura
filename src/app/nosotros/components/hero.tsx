import { Bug, MapPin, Snail, Worm } from "lucide-react";
import Image from "next/image";

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

        {/* Decorative floating animal/bug icons */}
        <Bug className="absolute rotate-12 top-20 right-[13%] h-32 w-32 text-primary dark:text-primary opacity-10 stroke-1" />
        <Snail className="absolute bottom-40 left-[5%] h-40 w-40 text-tertiary dark:text-tertiary opacity-10 stroke-1" />
        <Worm className="absolute top-30 left-[13%] h-20 w-20 text-primary dark:text-primary opacity-10 stroke-1" />

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
              Somos una organización de derecho animal nacida en el corazón de
              La Araucanía. Bajo la firme convicción de que los insectos y todos
              los animales no humanos sostienen la vida en la Tierra, trabajamos
              para garantizar su protección, entendiendo que educar sobre ellos
              es el primer paso para preservarla.
            </p>
          </div>

          {/* Stats as floating badges */}
          <div className="md:col-span-2 animate-[fadeIn_1s_ease-out]">
            <Image
              width={500}
              height={600}
              alt="Felipe"
              src={"/assets/bee-eye.jpg"}
              className="rounded-full"
            />
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
