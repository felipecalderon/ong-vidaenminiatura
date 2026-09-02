import { Bug, Fish, Leaf, Rabbit, Worm } from "lucide-react";
import type { Metadata } from "next";
import { Revelar } from "@/components/compartido/revelar";
import { CTASection } from "./components/call-to-action";
import { EjesAccionSection } from "./components/ejes-accion";
import { FundadoresSection } from "./components/fundadores";
import { MarcoEstatutarioSection } from "./components/marco-estatutario";
import { MisionSection } from "./components/mision";
import { PerspectivasSection } from "./components/perspectivas-realidad";
import { QuoteSection } from "./components/quote";
import { ResponsabilidadSection } from "./components/responsabilidad-cosmica";
import { ValoresSection } from "./components/valores";
import { VisionSection } from "./components/vision";
import { VoluntariadoSection } from "./components/voluntariado-section";

export const metadata: Metadata = {
  title: "Nosotros | Fundación Más Insectos",
  description:
    "Conoce a la Fundación Más Insectos (+ Insectos): institución de derecho privado sin fines de lucro en Temuco, dedicada a la investigación, educación, defensa legal y conservación de los invertebrados y la biodiversidad.",
};

export default function NosotrosPage() {
  return (
    <div className="min-h-screen text-on-background overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-20 space-y-24 md:space-y-36">
        {/* ── Misión y Visión ──────────────────────────────── */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background">
            Quienes somos
          </h2>
        </div>
        <Revelar>
          <section id="mision-vision" className="relative">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <MisionSection />
              <VisionSection />
            </div>

            {/* Decorative connecting dots */}
            <div
              aria-hidden
              className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2"
            >
              <div className="h-2 w-2 rounded-full bg-primary/30" />
              <div className="h-2 w-2 rounded-full bg-primary/20" />
              <div className="h-2 w-2 rounded-full bg-primary/30" />
            </div>
          </section>
        </Revelar>

        {/* ── Marco Estatutario y Objeto Legal ──────────────── */}
        <Revelar delay={0.1}>
          <MarcoEstatutarioSection />
        </Revelar>

        {/* ── Los 6 Ejes de Acción Estratégica ──────────────── */}
        <Revelar delay={0.1}>
          <EjesAccionSection />
        </Revelar>

        {/* ── Perspectivas de la Realidad ──────────────────── */}
        <Revelar delay={0.1}>
          <PerspectivasSection />
        </Revelar>

        {/* ── Fundadores ───────────────────────────────────── */}
        <Revelar delay={0.1}>
          <FundadoresSection />
        </Revelar>

        {/* ── Valores Institucionales ──────────────────────── */}
        <Revelar delay={0.1}>
          <ValoresSection />
        </Revelar>

        {/* ── Red Oficial de Voluntariado (Formulario) ─────── */}
        <Revelar delay={0.1}>
          <VoluntariadoSection />
        </Revelar>

        {/* ── Llamado a la Acción ──────────────────────────── */}
        <Revelar delay={0.1}>
          <CTASection />
        </Revelar>
      </div>
    </div>
  );
}
