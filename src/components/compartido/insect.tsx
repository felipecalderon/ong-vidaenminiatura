"use client";

import { useId } from "react";

type InsectProps = {
  /** Base color of the body/glow */
  hue: number;
  /** Wing flap speed in seconds (lower = faster) */
  flap: number;
  /** Overall scale of the creature */
  scale: number;
};

/**
 * A custom-drawn flying insect (damselfly silhouette).
 * All parts are hand-built SVG: slender segmented abdomen with a soft
 * localized tail glow, compact thorax, small head, fine antennae and
 * legs, and four narrow flapping wings with a subtle central vein.
 * The whole thing is drawn pointing to the right (+x) so the parent
 * can rotate it toward its velocity vector.
 */
export function Insect({ hue, flap, scale }: InsectProps) {
  const glowId = useId().replace(/:/g, "");
  const body = `hsl(${hue} 65% 48%)`;
  const bodyDark = `hsl(${hue} 55% 34%)`;
  const glow = `hsl(${hue} 95% 70%)`;
  const wing = `hsl(${(hue + 40) % 360} 65% 82%)`;

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
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.75" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---- Wings (narrow blades behind the body) ---- */}
      <g style={{ transformOrigin: "30px 22px" }}>
        {/* forewing upper */}
        <g
          style={{
            transformOrigin: "30px 22px",
            animation: `wingUp ${flap}s ease-in-out infinite`,
          }}
        >
          <path
            d="M30 21 C23 8.5, 12 6.8, 6 9.5 C12 13.2, 22 17.5, 30 20.4 Z"
            fill={wing}
            fillOpacity="0.22"
            stroke={wing}
            strokeOpacity="0.5"
            strokeWidth="0.5"
          />
          <path
            d="M28.5 20.4 C21 12.5, 13 10.5, 7.5 10.4"
            stroke={wing}
            strokeOpacity="0.35"
            strokeWidth="0.45"
            fill="none"
          />
        </g>

        {/* hindwing upper */}
        <g
          style={{
            transformOrigin: "30px 22px",
            animation: `wingUp ${flap * 1.15}s ease-in-out infinite`,
          }}
        >
          <path
            d="M29.5 20.8 C24 12, 16 10.6, 11 11.5 C16 15.2, 23.5 18.5, 29.5 20.2 Z"
            fill={wing}
            fillOpacity="0.2"
            stroke={wing}
            strokeOpacity="0.45"
            strokeWidth="0.5"
          />
          <path
            d="M28 20.6 C23 14.8, 17.5 13.2, 12.5 12.7"
            stroke={wing}
            strokeOpacity="0.32"
            strokeWidth="0.45"
            fill="none"
          />
        </g>

        {/* forewing lower */}
        <g
          style={{
            transformOrigin: "30px 22px",
            animation: `wingDown ${flap}s ease-in-out infinite`,
          }}
        >
          <path
            d="M30 23 C23 35.5, 12 37.2, 6 34.5 C12 30.8, 22 26.5, 30 23.6 Z"
            fill={wing}
            fillOpacity="0.22"
            stroke={wing}
            strokeOpacity="0.5"
            strokeWidth="0.5"
          />
          <path
            d="M28.5 23.6 C21 31.5, 13 33.5, 7.5 33.6"
            stroke={wing}
            strokeOpacity="0.35"
            strokeWidth="0.45"
            fill="none"
          />
        </g>

        {/* hindwing lower */}
        <g
          style={{
            transformOrigin: "30px 22px",
            animation: `wingDown ${flap * 1.15}s ease-in-out infinite`,
          }}
        >
          <path
            d="M29.5 23.2 C24 32, 16 33.4, 11 32.5 C16 28.8, 23.5 25.5, 29.5 23.8 Z"
            fill={wing}
            fillOpacity="0.2"
            stroke={wing}
            strokeOpacity="0.45"
            strokeWidth="0.5"
          />
          <path
            d="M28 23.4 C23 29.2, 17.5 30.8, 12.5 31.3"
            stroke={wing}
            strokeOpacity="0.32"
            strokeWidth="0.45"
            fill="none"
          />
        </g>
      </g>

      {/* ---- Soft tail glow (localized, no halo around the insect) ---- */}
      <circle
        cx="9.5"
        cy="22"
        r="3.5"
        fill={`url(#${glowId})`}
        opacity="0.55"
      />
      <circle cx="9" cy="22" r="1.5" fill={glow} />

      {/* ---- Abdomen (slender, segmented) ---- */}
      <path
        d="M10.5 21.2 C14 19.8, 21 19.9, 27 20.5 L27 23.5 C21 24.1, 14 24.2, 10.5 22.8 Z"
        fill={body}
      />
      <path
        d="M14 20.5 L14 23.5"
        stroke={bodyDark}
        strokeOpacity="0.5"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M18 20.4 L18 23.6"
        stroke={bodyDark}
        strokeOpacity="0.5"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M22 20.5 L22 23.4"
        stroke={bodyDark}
        strokeOpacity="0.5"
        strokeWidth="0.5"
        strokeLinecap="round"
      />

      {/* ---- Thorax ---- */}
      <ellipse cx="30" cy="22" rx="3.4" ry="2.5" fill={bodyDark} />
      <ellipse
        cx="30"
        cy="21.3"
        rx="2.1"
        ry="1.35"
        fill={body}
        fillOpacity="0.65"
      />

      {/* ---- Head + tiny eye ---- */}
      <circle cx="35.2" cy="22" r="1.8" fill={bodyDark} />
      <circle cx="35.9" cy="21.1" r="0.55" fill={glow} fillOpacity="0.85" />

      {/* ---- Antennae ---- */}
      <path
        d="M36.6 20.7 Q40 17.5 42.3 18.8"
        stroke={body}
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M36.6 23.3 Q40 26.5 42.3 25.2"
        stroke={body}
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
      />

      {/* ---- Legs ---- */}
      <path
        d="M27.7 24.3 L26 26.7 L23.8 28.7"
        stroke={bodyDark}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <path
        d="M30 24.5 L30 27 L30 29.3"
        stroke={bodyDark}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <path
        d="M32.3 24.3 L34 26.7 L36.2 28.7"
        stroke={bodyDark}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
