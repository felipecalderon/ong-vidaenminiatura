"use client";
export const LogoIcon = ({ size }: { size: number }) => {
  return (
    <svg
      suppressHydrationWarning
      className="motion-reduce:**:animate-none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Insecto animado moviendo sus patas y antenas"
    >
      <defs>
        {/* Degradado metálico del cuerpo */}
        <linearGradient id="beetleBody" x1="6" y1="5" x2="18" y2="20">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
      </defs>

      {/* Patas derechas */}
      <path
        className="origin-left animate-leg-r transform-fill"
        d="M21 5a4 4 0 0 1-3.55 3.97"
        stroke="#312E81"
      />
      <path
        className="origin-left animate-leg-r transform-fill [animation-delay:0.8s]"
        d="M22 13h-4"
        stroke="#312E81"
      />
      <path
        className="origin-left animate-leg-r transform-fill"
        d="M21 21a4 4 0 0 0-3.81-4"
        stroke="#312E81"
      />

      {/* Patas izquierdas */}
      <path
        className="origin-right animate-leg-l transform-fill [animation-delay:0.8s]"
        d="M3 5a4 4 0 0 0 3.55 3.97"
        stroke="#312E81"
      />
      <path
        className="origin-right animate-leg-l transform-fill"
        d="M6 13H2"
        stroke="#312E81"
      />
      <path
        className="origin-right animate-leg-l transform-fill [animation-delay:0.8s]"
        d="M3 21a4 4 0 0 1 3.81-4"
        stroke="#312E81"
      />

      {/* Cuerpo */}
      <g className="origin-center animate-sway transform-fill">
        {/* Cabeza */}
        <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" stroke="url(#beetleBody)" />

        {/* Torso */}
        <path
          d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"
          stroke="url(#beetleBody)"
          strokeWidth={2}
        />

        {/* Línea central */}
        <path d="M12 20v-9" stroke="#9333EA" />

        {/* Antena derecha */}
        <path
          className="origin-bottom-left animate-antenna transform-fill"
          d="M14.12 3.88 16 2"
          stroke="#047857"
        />

        {/* Antena izquierda */}
        <path
          className="origin-bottom-right animate-antenna transform-fill [animation-delay:0.6s]"
          d="m8 2 1.88 1.88"
          stroke="#047857"
        />
      </g>
    </svg>
  );
};
