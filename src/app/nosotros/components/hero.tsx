import { MapPin } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24">
        {/* Eyebrow */}
        <div className="mb-8 inline-flex animate-[fadeIn_0.6s_ease-out] items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-[0.68rem] font-label uppercase tracking-[0.18em] text-primary">
          <MapPin className="h-3 w-3" />
          Temuco, Chile · Fundada 2026
        </div>

        <div className="grid items-end gap-12 md:grid-cols-[1.3fr_0.7fr] md:gap-20">
          <div className="animate-[fadeIn_0.8s_ease-out]">
            <h1 className="mb-7 text-[clamp(3rem,8vw,6.5rem)] font-headline font-black leading-[0.8] tracking-tight text-on-background">
              Cada insecto <span className="text-primary">importa.</span>
              <br />
              <span className="mt-5 block max-w-md text-[0.27em] font-semibold leading-[1.2] tracking-[-0.02em] text-on-surface-variant">
                Esos pequeños seres te necesitan
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              Somos una organización de derecho animal nacida en el corazón de
              La Araucanía. Bajo la firme convicción de que los insectos y todos
              los animales no humanos sostienen la vida en la Tierra, trabajamos
              para garantizar su protección, entendiendo que educar sobre ellos
              es el primer paso para preservarla.
            </p>
          </div>

          {/* Stats as floating badges */}
          <div className="relative animate-[fadeIn_ease-out] md:justify-self-end">
            <Image
              width={500}
              height={600}
              loading="eager"
              alt="Vista ultravioleta del ojo de una abeja"
              src={"/assets/bee-eye.jpg"}
              className="relative aspect-square w-full max-w-md rounded-4xl border border-primary/30 object-cover p-2 ultraviolet-image shadow-[0_30px_90px_-30px_var(--primary)] md:rounded-[2.5rem]"
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
