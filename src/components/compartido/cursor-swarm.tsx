"use client";

import { useEffect, useRef, useState } from "react";
import { Insect } from "./insect";

type Trait = { hue: number; flap: number; scale: number };

type Bug = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  orbit: number; // preferred distance from cursor
  spin: number; // orbit direction (+1 / -1)
  phase: number; // wander offset
  wander: number; // wander frequency
  angle: number; // smoothed facing angle (rad)
};

const COUNT = 6;

// Behaviour tuning
const FLEE_RADIUS = 90; // strong push when cursor is this close
const DAMPING = 0.9;
const MAX_SPEED = 5.2;
const ORBIT_PULL = 0.012; // how strongly they settle onto their ring
const TANGENT = 0.09; // orbiting force
const FLEE_FORCE = 26; // repulsion strength

export function CursorSwarm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bugsRef = useRef<Bug[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  // Per-insect visual traits generated on the client only (avoids SSR/client
  // hydration mismatch from Math.random()).
  const [traits, setTraits] = useState<Trait[]>([]);

  useEffect(() => {
    setTraits(
      Array.from({ length: COUNT }, (_, i) => ({
        hue:
          [150, 165, 190, 45, 265][i % 5] +
          Math.round((Math.random() - 0.5) * 20),
        flap: 0.09 + Math.random() * 0.07,
        scale: 0.4 + Math.random() * 0.25,
      })),
    );
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    mouseRef.current = { x: w / 2, y: h / 2, active: false };

    // Seed the swarm around the centre
    bugsRef.current = Array.from({ length: COUNT }, (_, i) => {
      const a = (i / COUNT) * Math.PI * 2;
      const r = 120 + Math.random() * 120;
      return {
        x: w / 2 + Math.cos(a) * r,
        y: h / 2 + Math.sin(a) * r,
        vx: 0,
        vy: 0,
        orbit: 70 + Math.random() * 130,
        spin: Math.random() > 0.5 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
        wander: 0.6 + Math.random() * 1.4,
        angle: a,
      };
    });

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseout", onLeave);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.6667, 2); // frames elapsed, capped
      last = now;
      const t = now / 1000;
      const m = mouseRef.current;

      // Idle target drifts gently if the pointer isn't active
      const targetX = m.active
        ? m.x
        : window.innerWidth / 2 + Math.cos(t * 0.3) * 120;
      const targetY = m.active
        ? m.y
        : window.innerHeight / 2 + Math.sin(t * 0.4) * 90;

      for (let i = 0; i < bugsRef.current.length; i++) {
        const b = bugsRef.current[i];

        const dx = targetX - b.x;
        const dy = targetY - b.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        const nx = dx / dist;
        const ny = dy / dist;

        // Radial force: settle onto the preferred orbit ring
        const radial = (dist - b.orbit) * ORBIT_PULL;
        let ax = nx * radial;
        let ay = ny * radial;

        // Tangential force: circle around the cursor
        ax += -ny * TANGENT * b.spin;
        ay += nx * TANGENT * b.spin;

        // Flee: sharp, smooth repulsion when the cursor gets close
        if (dist < FLEE_RADIUS) {
          const push = (1 - dist / FLEE_RADIUS) ** 2 * FLEE_FORCE;
          ax -= nx * push * 0.05;
          ay -= ny * push * 0.05;
        }

        // Organic wander so flight never looks robotic
        ax += Math.cos(t * b.wander + b.phase) * 0.06;
        ay += Math.sin(t * b.wander * 1.3 + b.phase) * 0.06;

        b.vx = (b.vx + ax * dt) * DAMPING;
        b.vy = (b.vy + ay * dt) * DAMPING;

        // Clamp speed
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > MAX_SPEED) {
          b.vx = (b.vx / sp) * MAX_SPEED;
          b.vy = (b.vy / sp) * MAX_SPEED;
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // Smoothly rotate toward direction of travel
        if (sp > 0.15) {
          const target = Math.atan2(b.vy, b.vx);
          let diff = target - b.angle;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          b.angle += diff * 0.15;
        }

        const node = nodesRef.current[i];
        if (node) {
          const deg = (b.angle * 180) / Math.PI;
          // Flip vertically when facing left so the insect never appears upside-down
          const flip = Math.abs(deg) > 90 ? -1 : 1;
          node.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) translate(-50%, -50%) rotate(${deg}deg) scaleY(${flip})`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {traits.map((tr, i) => (
        <div
          key={i}
          ref={(el) => {
            nodesRef.current[i] = el;
          }}
          className="absolute left-0 top-0 will-change-transform"
        >
          <Insect hue={tr.hue} flap={tr.flap} scale={tr.scale} />
        </div>
      ))}
    </div>
  );
}
