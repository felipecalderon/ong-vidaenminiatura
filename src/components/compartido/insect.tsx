"use client";

type InsectProps = {
  /** Base color of the body/glow */
  hue: number;
  /** Wing flap speed in seconds (lower = faster) */
  flap: number;
  /** Overall scale of the creature */
  scale: number;
};

/**
 * A custom-drawn flying insect (damselfly / firefly hybrid).
 * All parts are hand-built SVG: segmented glowing abdomen, thorax,
 * two pairs of translucent flapping wings, head and antennae.
 * The whole thing is drawn pointing to the right (+x) so the parent
 * can rotate it toward its velocity vector.
 */
export function Insect({ hue, flap, scale }: InsectProps) {
  const body = `hsl(${hue} 85% 62%)`;
  const bodyDark = `hsl(${hue} 70% 42%)`;
  const glow = `hsl(${hue} 95% 68%)`;
  const wing = `hsl(${(hue + 40) % 360} 90% 88%)`;

  return (
    <svg
      width={64 * scale}
      height={44 * scale}
      viewBox="0 0 64 44"
      fill="none"
      style={{ overflow: "visible", filter: `drop-shadow(0 0 6px ${glow})` }}
      aria-hidden="true"
    >
      {/* ---- Wings (behind body) ---- */}
      <g style={{ transformOrigin: "26px 22px" }}>
        {/* upper-left wing */}
        <ellipse
          cx="20"
          cy="12"
          rx="16"
          ry="7"
          fill={wing}
          fillOpacity="0.45"
          stroke={wing}
          strokeOpacity="0.7"
          strokeWidth="0.6"
          style={{
            transformOrigin: "26px 22px",
            animation: `wingUp ${flap}s ease-in-out infinite`,
          }}
        />
        {/* upper-right (rear) wing */}
        <ellipse
          cx="16"
          cy="14"
          rx="13"
          ry="6"
          fill={wing}
          fillOpacity="0.35"
          stroke={wing}
          strokeOpacity="0.6"
          strokeWidth="0.6"
          style={{
            transformOrigin: "26px 22px",
            animation: `wingUp ${flap * 1.15}s ease-in-out infinite`,
          }}
        />
        {/* lower-left wing */}
        <ellipse
          cx="20"
          cy="32"
          rx="16"
          ry="7"
          fill={wing}
          fillOpacity="0.45"
          stroke={wing}
          strokeOpacity="0.7"
          strokeWidth="0.6"
          style={{
            transformOrigin: "26px 22px",
            animation: `wingDown ${flap}s ease-in-out infinite`,
          }}
        />
        {/* lower-right (rear) wing */}
        <ellipse
          cx="16"
          cy="30"
          rx="13"
          ry="6"
          fill={wing}
          fillOpacity="0.35"
          stroke={wing}
          strokeOpacity="0.6"
          strokeWidth="0.6"
          style={{
            transformOrigin: "26px 22px",
            animation: `wingDown ${flap * 1.15}s ease-in-out infinite`,
          }}
        />
      </g>

      {/* ---- Abdomen (segmented, glowing tail) ---- */}
      <g>
        <ellipse
          cx="10"
          cy="22"
          rx="4"
          ry="2.4"
          fill={glow}
          fillOpacity="0.9"
        />
        <ellipse cx="15" cy="22" rx="3.4" ry="2.6" fill={bodyDark} />
        <ellipse cx="20" cy="22" rx="3.6" ry="2.9" fill={body} />
      </g>

      {/* ---- Thorax ---- */}
      <ellipse cx="27" cy="22" rx="5.5" ry="4.4" fill={bodyDark} />
      <ellipse cx="27" cy="21" rx="4.2" ry="3" fill={body} fillOpacity="0.7" />

      {/* ---- Head + eyes ---- */}
      <circle cx="35" cy="22" r="3.4" fill={bodyDark} />
      <circle cx="36.5" cy="20.5" r="1.3" fill={glow} />
      <circle cx="36.5" cy="23.5" r="1.3" fill={glow} />

      {/* ---- Antennae ---- */}
      <path
        d="M37 20 Q43 15 45 17"
        stroke={body}
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M37 24 Q43 29 45 27"
        stroke={body}
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* ---- Legs ---- */}
      <path
        d="M26 26 L23 31"
        stroke={bodyDark}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <path
        d="M29 26 L30 31"
        stroke={bodyDark}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
