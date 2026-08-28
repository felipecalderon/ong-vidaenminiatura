"use client";
export const LogoIcon = ({
  size,
  animated = true,
}: {
  size: number;
  animated?: boolean;
}) => {
  const anim = (className: string) => (animated ? className : undefined);

  return (
    <svg
      suppressHydrationWarning
      className={animated ? "motion-reduce:**:animate-none" : undefined}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Logo Más Insectos"
    >
      {/* Patas derechas */}
      <path
        className={anim("origin-left animate-leg-r transform-fill")}
        d="M21 5a4 4 0 0 1-3.55 3.97"
        stroke="#312E81"
      />
      <path
        className={anim(
          "origin-left animate-leg-r transform-fill [animation-delay:0.8s]",
        )}
        d="M22 13h-4"
        stroke="#312E81"
      />
      <path
        className={anim("origin-left animate-leg-r transform-fill")}
        d="M21 21a4 4 0 0 0-3.81-4"
        stroke="#312E81"
      />

      {/* Patas izquierdas */}
      <path
        className={anim(
          "origin-right animate-leg-l transform-fill [animation-delay:0.8s]",
        )}
        d="M3 5a4 4 0 0 0 3.55 3.97"
        stroke="#312E81"
      />
      <path
        className={anim("origin-right animate-leg-l transform-fill")}
        d="M6 13H2"
        stroke="#312E81"
      />
      <path
        className={anim(
          "origin-right animate-leg-l transform-fill [animation-delay:0.8s]",
        )}
        d="M3 21a4 4 0 0 1 3.81-4"
        stroke="#312E81"
      />

      {/* Cuerpo */}
      <g className={anim("origin-center animate-sway transform-fill")}>
        {/* Cabeza */}
        <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" stroke="#312E81" />

        {/* Torso */}
        <path
          d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"
          stroke="#312E81"
          strokeWidth={2}
        />

        {/* Símbolo + */}
        <path
          d="M12 10v6M9 13h6"
          stroke="#312E81"
          strokeWidth={1.8}
          strokeLinecap="butt"
        />

        {/* Antena derecha */}
        <path
          className={anim("origin-bottom-left animate-antenna transform-fill")}
          d="M14.12 3.88 16 2"
          stroke="#312E81"
        />

        {/* Antena izquierda */}
        <path
          className={anim(
            "origin-bottom-right animate-antenna transform-fill [animation-delay:0.6s]",
          )}
          d="m8 2 1.88 1.88"
          stroke="#312E81"
        />
      </g>
    </svg>
  );
};
