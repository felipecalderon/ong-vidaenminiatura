import { Bug, Fish, Leaf, Rabbit, Worm } from "lucide-react";
import type { Metadata } from "next";
import { Revelar } from "@/components/compartido/revelar";
import { CTASection } from "./components/call-to-action";
import { FundadoresSection } from "./components/fundadores";
import { HeroSection } from "./components/hero";
import { MisionSection } from "./components/mision";
import { PerspectivasSection } from "./components/perspectivas-realidad";
import { QuoteSection } from "./components/quote";
import { ResponsabilidadSection } from "./components/responsabilidad-cosmica";
import { ValoresSection } from "./components/valores";
import { VisionSection } from "./components/vision";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a InsectosVivos: una fundación nacida en Temuco, Chile, dedicada a educar y preservar el bienestar animal con foco en el mundo de los insectos.",
};

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background text-on-background overflow-hidden">
      <HeroSection />

      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24 space-y-24 md:space-y-36">
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

        <Revelar delay={0.1}>
          <PerspectivasSection />
        </Revelar>

        <Revelar delay={0.1}>
          <FundadoresSection />
        </Revelar>

        {/* ── Quote 1 ──────────────────────────────────────── */}
        <Revelar delay={0.1}>
          <QuoteSection
            quote="Los insectos y demás seres vivos son la prueba de que el universo no buscó contemplarse de una sola manera. La evolución junto al universo crearon millones de ojos, cerebros y formas de percibir el mismo mundo. Y nosotros los humanos solo somos una pequeña parte de ellas."
            author="Bárbara Manquilef, cofundadora"
            Icon={Bug}
            color="primary"
            bgIconLeft={Worm}
            bgIconRight={Rabbit}
          />
        </Revelar>

        <Revelar delay={0.1}>
          <ValoresSection />
        </Revelar>

        {/* ── Quote 2 (Felipe) ──────────────────────────────── */}
        <Revelar delay={0.1} desde="izquierda">
          <QuoteSection
            quote='Nuestros sentidos son la manera en que el universo se observa a sí mismo, ya sean de seres humanos como seres no humanos, dichos sentidos no son más que otra perspectiva de la misma realidad. Ignorar su bienestar es empobrecer la mirada del propio cosmos ya que cada especie es un tipo de "filtro" que observa una parte de la verdad.'
            author="Felipe Calderón, cofundador"
            Icon={Leaf}
            color="tertiary"
            bgIconLeft={Bug}
            bgIconRight={Fish}
          />
        </Revelar>

        <Revelar delay={0.1}>
          <CTASection />
        </Revelar>

        <Revelar delay={0.1}>
          <ResponsabilidadSection />
        </Revelar>
      </div>
    </div>
  );
}
