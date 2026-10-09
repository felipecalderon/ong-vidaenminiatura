"use client";

import { useId } from "react";

type BeeProps = {
  /** Color base/hue (35-45 ideal para tonos amarillos/dorados) */
  hue?: number;
  /** Velocidad del aleteo en segundos (ej. 0.1s para aleteo rápido) */
  flap?: number;
  /** Escala general de la abeja */
  scale?: number;
};

/**
 * Componente Bee (Abeja) en vista superior con proporciones anatómicas mejoradas,
 * alas reclinadas naturalmente hacia el abdomen, nervaduras transparentes y cuerpo 3D.
 */
export function Bee({ hue = 40, flap = 0.1, scale = 1 }: BeeProps) {
  const rawId = useId().replace(/:/g, "");
  const shadowId = `bee-shadow-${rawId}`;
  const wingGradId = `bee-wing-grad-${rawId}`;

  const yellow = `hsl(${hue} 95% 55%)`;
  const darkStripes = `hsl(20 30% 12%)`;
  const wingColor = `hsl(200 60% 92%)`;

  return (
    <svg
      width={64 * scale}
      height={44 * scale}
      viewBox="0 0 64 44"
      fill="none"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        {/* Sombra paralela suave para efecto 3D sobre el lienzo */}
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="1.2"
            floodColor="#000"
            floodOpacity="0.25"
          />
        </filter>

        {/* Degradado cristalino para la membrana de las alas */}
        <linearGradient id={wingGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="50%" stopColor={wingColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={wingColor} stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <g filter={`url(#${shadowId})`}>
        {/* ========================================================= */}
        {/* 1. PATAS DE LA ABEJA (Ancladas al tórax)                   */}
        {/* ========================================================= */}
        <g
          stroke={darkStripes}
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        >
          {/* Patas lado superior */}
          <path d="M 31 18 Q 34 14 36 12" />
          <path d="M 28 18 Q 28 13 27 10" />
          <path d="M 25 18 Q 22 14 18 13" />
          {/* Patas lado inferior */}
          <path d="M 31 26 Q 34 30 36 32" />
          <path d="M 28 26 Q 28 31 27 34" />
          <path d="M 25 26 Q 22 30 18 31" />
        </g>

        {/* ========================================================= */}
        {/* 2. PAR DE ALAS SUPERIORES (Y < 22 - Reclinadas hacia atrás)*/}
        {/* ========================================================= */}
        <g>
          {/* Ala Trasera Superior (Secundaria) */}
          <g
            className="insect-wing"
            style={{
              transformOrigin: "28px 19.5px",
              transformBox: "fill-box",
              animation: `insect-wing-upper ${flap * 1.05}s ease-in-out infinite`,
              animationDelay: "-0.03s",
            }}
          >
            <path
              d="M 28 19.5 C 25 16, 21 12, 23 11 C 26 10, 27 16, 28 19.5 Z"
              fill={`url(#${wingGradId})`}
              stroke={wingColor}
              strokeOpacity="0.7"
              strokeWidth="0.5"
            />
          </g>

          {/* Ala Delantera Superior (Principal) */}
          <g
            className="insect-wing"
            style={{
              transformOrigin: "28px 19px",
              transformBox: "fill-box",
              animation: `insect-wing-upper ${flap}s ease-in-out infinite`,
              animationDelay: "-0.01s",
            }}
          >
            <path
              d="M 28 19 C 26 13, 23 7, 19 8 C 16 11, 23 16.5, 28 19 Z"
              fill={`url(#${wingGradId})`}
              stroke={wingColor}
              strokeOpacity="0.85"
              strokeWidth="0.6"
            />
            {/* Nervaduras internas reorientadas */}
            <path
              d="M 28 19 Q 23 10 20 8.5 M 28 19 Q 24 13 22 12"
              stroke="white"
              strokeOpacity="0.65"
              strokeWidth="0.4"
              fill="none"
            />
          </g>
        </g>

        {/* ========================================================= */}
        {/* 3. PAR DE ALAS INFERIORES (Y > 22 - Reclinadas hacia atrás)*/}
        {/* ========================================================= */}
        <g>
          {/* Ala Trasera Inferior (Secundaria) */}
          <g
            className="insect-wing"
            style={{
              transformOrigin: "28px 24.5px",
              transformBox: "fill-box",
              animation: `insect-wing-lower ${flap * 1.05}s ease-in-out infinite`,
              animationDelay: "-0.03s",
            }}
          >
            <path
              d="M 28 24.5 C 25 28, 21 32, 23 33 C 26 34, 27 28, 28 24.5 Z"
              fill={`url(#${wingGradId})`}
              stroke={wingColor}
              strokeOpacity="0.7"
              strokeWidth="0.5"
            />
          </g>

          {/* Ala Delantera Inferior (Principal) */}
          <g
            className="insect-wing"
            style={{
              transformOrigin: "28px 25px",
              transformBox: "fill-box",
              animation: `insect-wing-lower ${flap}s ease-in-out infinite`,
              animationDelay: "-0.01s",
            }}
          >
            <path
              d="M 28 25 C 26 31, 23 37, 19 36 C 16 33, 23 27.5, 28 25 Z"
              fill={`url(#${wingGradId})`}
              stroke={wingColor}
              strokeOpacity="0.85"
              strokeWidth="0.6"
            />
            {/* Nervaduras internas reorientadas */}
            <path
              d="M 28 25 Q 23 34 20 35.5 M 28 25 Q 24 31 22 32"
              stroke="white"
              strokeOpacity="0.65"
              strokeWidth="0.4"
              fill="none"
            />
          </g>
        </g>

        {/* ========================================================= */}
        {/* 4. CUERPO DE LA ABEJA (Eje Central Y = 22)                 */}
        {/* ========================================================= */}
        <g
          className="insect-hover"
          style={{
            transformOrigin: "30px 22px",
            transformBox: "fill-box",
            animation: "insect-hover 1.4s ease-in-out infinite",
          }}
        >
          {/* Aguijón */}
          <path d="M 8 22 L 4 22 L 8 21.3 Z" fill={darkStripes} />

          {/* Abdomen */}
          <g>
            <ellipse cx="17.5" cy="22" rx="9.5" ry="6.2" fill={yellow} />
            {/* Franjas oscuras arqueadas con volumen 3D */}
            <path
              d="M 12 16.5 C 14 19.5, 14 24.5, 12 27.5 L 14.5 27.8 C 16.5 24.5, 16.5 19.5, 14.5 16.2 Z"
              fill={darkStripes}
            />
            <path
              d="M 17 15.8 C 19.2 19, 19.2 25, 17 28.2 L 19.5 27.8 C 21.7 24.5, 21.7 19.5, 19.5 16.2 Z"
              fill={darkStripes}
            />
            <path
              d="M 22 16.5 C 24 19, 24 25, 22 27.5 L 24 26.5 C 25.8 24, 25.8 20, 24 17.5 Z"
              fill={darkStripes}
            />
          </g>

          {/* Tórax y textura peluda */}
          <ellipse cx="29" cy="22" rx="5" ry="5.2" fill={darkStripes} />
          <ellipse
            cx="28.5"
            cy="20.5"
            rx="3"
            ry="2.8"
            fill={yellow}
            opacity="0.35"
          />

          {/* Cabeza y Ojos Compuestos */}
          <circle cx="34.8" cy="22" r="3.2" fill={darkStripes} />
          <ellipse cx="35.8" cy="20.2" rx="1.2" ry="1.6" fill="#111" />
          <circle cx="36.2" cy="19.8" r="0.4" fill="#FFF" opacity="0.85" />
          <ellipse cx="35.8" cy="23.8" rx="1.2" ry="1.6" fill="#111" />
          <circle cx="36.2" cy="24.2" r="0.4" fill="#FFF" opacity="0.85" />

          {/* Antenas */}
          <path
            d="M 36.5 19.5 Q 39.5 16 42 16.5"
            stroke={darkStripes}
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 36.5 24.5 Q 39.5 28 42 27.5"
            stroke={darkStripes}
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
