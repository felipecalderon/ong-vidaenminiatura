"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duracion?: number;
  desde?: "abajo" | "izquierda" | "derecha" | "arriba";
}

export function Revelar({
  children,
  className = "",
  delay = 0,
  duracion = 0.7,
  desde = "abajo",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const distancias: Record<string, string> = {
    abajo: "translate-y-8",
    arriba: "-translate-y-8",
    izquierda: "-translate-x-8",
    derecha: "translate-x-8",
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : distancias[desde],
        transitionDuration: `${duracion}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
