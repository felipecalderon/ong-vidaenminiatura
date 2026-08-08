import type { CSSProperties } from "react";

type InsectTint = "primary" | "tertiary";

const maskStyle = (src: string): CSSProperties => ({
  maskImage: `url(${src})`,
  WebkitMaskImage: `url(${src})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
});

const Insect = ({
  src,
  tint,
  className,
}: {
  src: string;
  tint: InsectTint;
  className?: string;
}) => (
  <div
    aria-hidden
    className={`absolute ${
      tint === "primary" ? "bg-primary" : "bg-tertiary"
    } opacity-[0.06] dark:opacity-[0.09] ${className}`}
    style={maskStyle(src)}
  />
);

export const SiteBackground = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background ultraviolet-canvas"
    >
      {/* Halos tonales */}
      <div className="absolute -top-22 -left-40 h-125 w-125 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 h-100 w-100 rounded-full bg-tertiary/5 blur-[100px]" />

      {/* Insectos decorativos: los PNG se usan como máscara sobre el color de marca,
          apenas visibles, en lugar de íconos de librería */}
      <Insect
        src="/assets/png/mariposa.png"
        tint="primary"
        className="left-[5%] top-[9%] aspect-500/495 w-36 -rotate-12 sm:w-52 lg:w-72"
      />
      <Insect
        src="/assets/png/libelula.png"
        tint="tertiary"
        className="right-[8%] top-[15%] aspect-500/422 w-40 rotate-6 sm:w-56 lg:w-80"
      />
      <Insect
        src="/assets/png/grillo.png"
        tint="tertiary"
        className="bottom-[4%] left-[4%] aspect-500/700 w-32 -rotate-6 sm:w-44 lg:w-60"
      />
      <Insect
        src="/assets/png/hormiga.png"
        tint="primary"
        className="bottom-[12%] right-[5%] aspect-500/650 w-20 rotate-12 sm:w-28 lg:w-36"
      />
      <Insect
        src="/assets/png/cucaracha.png"
        tint="primary"
        className="left-[24%] top-[44%] aspect-500/557 w-24 rotate-12 sm:w-32 lg:w-44"
      />

      {/* Dots pattern */}
      <div className="absolute top-50 right-[8%] grid grid-cols-3 gap-2 opacity-[0.1] dark:opacity-[0.08]">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary" />
        ))}
      </div>
    </div>
  );
};
