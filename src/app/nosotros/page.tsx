import {
  ArrowRight,
  Bug,
  Heart,
  Leaf,
  MapPin,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Revelar } from "@/components/compartido/revelar";
import { fundadores, valores } from "./nosotros-data";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a InsectosVivos: una fundación nacida en Temuco, Chile, dedicada a educar y preservar el bienestar animal con foco en el mundo de los insectos.",
};

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background text-on-background overflow-hidden">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-surface-container via-surface-container/50 to-background">
        {/* Decorative floating elements */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-tertiary/5 blur-[100px]" />

          {/* Wing-like decorative shapes */}
          <svg
            role="img"
            aria-label="Formas decorativas"
            className="absolute top-20 right-[10%] h-32 w-32 text-primary/4 dark:text-primary/[0.07]"
            viewBox="0 0 100 100"
            fill="none"
          >
            <ellipse cx="50" cy="50" rx="45" ry="25" fill="currentColor" />
            <ellipse cx="50" cy="50" rx="25" ry="45" fill="currentColor" />
          </svg>
          <svg
            role="img"
            aria-label="Formas decorativas"
            className="absolute bottom-40 left-[5%] h-40 w-40 text-tertiary/4 dark:text-tertiary/[0.07]"
            viewBox="0 0 100 100"
            fill="none"
          >
            <ellipse cx="50" cy="50" rx="45" ry="20" fill="currentColor" />
            <ellipse cx="50" cy="50" rx="20" ry="45" fill="currentColor" />
          </svg>
          <svg
            role="img"
            aria-label="Formas decorativas"
            className="absolute top-40 left-[15%] h-20 w-20 text-primary/3 dark:text-primary/5"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path d="M50 5 Q65 35 50 95 Q35 35 50 5Z" fill="currentColor" />
          </svg>

          {/* Dots pattern */}
          <div className="absolute top-32 right-[8%] grid grid-cols-3 gap-2 opacity-[0.04] dark:opacity-[0.08]">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary" />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-20 md:pb-40 md:pt-32">
          {/* Eyebrow */}
          <div className="mb-10 inline-flex animate-[fadeIn_0.6s_ease-out] items-center gap-2 rounded-full border border-primary/15 bg-linear-to-r from-primary/7 to-primary/3 px-4 py-1.5 text-xs font-label uppercase tracking-[0.15em] text-primary">
            <MapPin className="h-3 w-3" />
            Temuco, Chile · Fundada 2026
          </div>

          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-end">
            <div className="md:col-span-3 animate-[fadeIn_0.8s_ease-out]">
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-headline font-black tracking-[-0.03em] text-on-background leading-[0.92] mb-6">
                Cada insecto{" "}
                <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  importa.
                </span>
                <br />
                <span className="text-[0.6em] font-bold tracking-tight text-on-surface-variant">
                  Esos pequeños seres te necesitan atento
                </span>
              </h1>

              <p className="max-w-xl text-base md:text-lg text-on-surface-variant font-body leading-relaxed">
                Somos una fundación nacida en el corazón de La Araucanía con una
                convicción simple pero poderosa: los insectos sostienen la vida
                en la Tierra, y educar sobre ellos es el primer paso para
                preservarla.
              </p>
            </div>

            {/* Stats as floating badges */}
            <div className="md:col-span-2 flex flex-col gap-3 animate-[fadeIn_1s_ease-out]">
              {[
                {
                  value: "5+",
                  label: "años de labor",
                  icon: Sparkles,
                  color: "primary",
                },
                {
                  value: "2",
                  label: "fundadores",
                  icon: Users,
                  color: "tertiary",
                },
                {
                  value: "10k+",
                  label: "vidas impactadas",
                  icon: Heart,
                  color: "primary",
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="group flex items-center gap-4 rounded-2xl border border-outline-variant/60 bg-surface/70 backdrop-blur-sm px-5 py-4 hover:bg-surface hover:border-primary/20 transition-all duration-300 hover:translate-x-1"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/8 to-primary/2 border border-primary/10">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-headline font-black tracking-tighter text-on-background leading-none mb-0.5">
                      {s.value}
                    </div>
                    <div className="text-[11px] font-label uppercase tracking-widest text-on-surface-variant">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Organic bottom transition */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent"
        />
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24 space-y-24 md:space-y-36">
        {/* ── Misión & Visión ─────────────────────────────── */}
        <Revelar>
          <section id="mision-vision" className="relative">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Misión */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-linear-to-br from-primary/10 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-outline-variant/60 bg-surface p-8 md:p-10 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/15">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div className="h-px flex-1 bg-linear-to-r from-primary/20 to-transparent" />
                  </div>
                  <h2 className="text-xs font-label uppercase tracking-[0.15em] text-primary mb-2">
                    Nuestra Misión
                  </h2>
                  <p className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background leading-[1.1] mb-4">
                    Educar, proteger
                    <br />y restaurar
                  </p>
                  <p className="text-on-surface-variant font-body leading-relaxed text-sm md:text-base">
                    Promovemos la educación ambiental y el bienestar animal con
                    foco en los insectos, trabajando con comunidades, escuelas e
                    instituciones para generar un cambio cultural que reconozca
                    el valor irremplazable de estos seres en todos los
                    ecosistemas.
                  </p>
                </div>
              </div>

              {/* Visión */}
              <div className="group relative md:pt-16">
                <div className="absolute -inset-1 bg-linear-to-br from-tertiary/10 to-tertiary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-outline-variant/60 bg-surface p-8 md:p-10 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-tertiary/10 to-tertiary/5 border border-tertiary/15">
                      <Sparkles className="h-6 w-6 text-tertiary" />
                    </div>
                    <div className="h-px flex-1 bg-linear-to-r from-tertiary/20 to-transparent" />
                  </div>
                  <h2 className="text-xs font-label uppercase tracking-[0.15em] text-tertiary mb-2">
                    Nuestra Visión
                  </h2>
                  <p className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background leading-[1.1] mb-4">
                    Un mundo que cuida
                    <br />
                    lo pequeño
                  </p>
                  <p className="text-on-surface-variant font-body leading-relaxed text-sm md:text-base">
                    Imaginamos una sociedad donde los insectos sean valorados
                    como los pilares invisibles de la biodiversidad; donde la
                    infancia crezca con asombro por la naturaleza y donde las
                    políticas públicas reflejen que cuidar lo pequeño es cuidar
                    el todo.
                  </p>
                </div>
              </div>
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

        {/* ── Fundadores ───────────────────────────────────── */}
        <Revelar delay={0.1}>
          <section id="fundadores">
            <div className="mb-12 text-center">
              <div className="mx-auto mb-6 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-outline-variant" />
                <span className="text-xs font-label uppercase tracking-[0.15em] text-on-surface-variant">
                  Las personas detrás de la misión
                </span>
                <div className="h-px w-8 bg-outline-variant" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background">
                Quiénes somos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {fundadores.map((f) => (
                <div
                  key={f.nombre}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-outline-variant/60 bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/3 w-full transition-transform duration-500 group-hover:scale-103">
                    <Image
                      src={f.foto}
                      alt={f.nombre}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="overflow-hidden object-cover transition-transform duration-500 will-change-transform transform-gpu group-hover:scale-103 backface-hidden"
                      priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent duration-500 group-hover:scale-105" />

                    {/* Floating emoji/icon */}
                    <div
                      className={`absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-md shadow-md ${
                        f.tema === "primary"
                          ? "border-primary/20 bg-primary/10 text-primary"
                          : "border-tertiary/20 bg-tertiary/10 text-tertiary"
                      }`}
                    >
                      <span className="text-2xl">{f.emoji}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 p-6 md:p-8 flex flex-col justify-between">
                    {/* Decorative background blob */}
                    <div
                      aria-hidden
                      className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full ${
                        f.tema === "primary" ? "bg-primary/3" : "bg-tertiary/3"
                      } blur-3xl`}
                    />

                    <div className="relative z-10">
                      <div className="mb-2">
                        <span
                          className={`text-xs font-label uppercase tracking-[0.15em] font-semibold ${
                            f.tema === "primary"
                              ? "text-primary"
                              : "text-tertiary"
                          }`}
                        >
                          {f.rol}
                        </span>
                      </div>

                      <h3 className="text-2xl font-headline font-black tracking-tighter text-on-background mb-4">
                        {f.nombre}
                      </h3>

                      <p className="text-on-surface-variant font-body leading-relaxed text-sm md:text-base">
                        {f.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Revelar>

        {/* ── Quote 1 ──────────────────────────────────────── */}
        <Revelar delay={0.1}>
          <section className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-64 w-64 rounded-full bg-primary/3 blur-[80px]" />
            </div>

            <div className="relative rounded-3xl border border-primary/10 bg-linear-to-br from-primary/3 via-transparent to-primary/2 p-8 md:p-14 text-center">
              {/* Decorative large quotes */}
              <div
                aria-hidden
                className="absolute top-4 left-6 md:top-6 md:left-10 text-6xl md:text-8xl font-headline font-black leading-none text-primary/6 select-none"
              >
                &ldquo;
              </div>
              <div
                aria-hidden
                className="absolute bottom-4 right-6 md:bottom-6 md:right-10 text-6xl md:text-8xl font-headline font-black leading-none text-primary/6 select-none"
              >
                &rdquo;
              </div>

              <div className="relative z-10">
                <div className="mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/15">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-headline font-black tracking-tighter text-on-background leading-[1.15] max-w-3xl mx-auto mb-6">
                  &ldquo;Una abeja no contempla el mismo jardín que nosotros.
                  Donde vemos colores, ella percibe patrones ultravioleta
                  invisibles para el ojo humano. El universo no creó una copia
                  de nuestra mirada; creó otra forma de descubrirse.&rdquo;
                </blockquote>
                <div className="inline-flex items-center gap-3">
                  <div className="h-px w-8 bg-primary/30" />
                  <p className="text-sm font-label uppercase tracking-[0.15em] text-on-surface-variant">
                    Bárbara Manquilef, cofundadora
                  </p>
                  <div className="h-px w-8 bg-primary/30" />
                </div>
              </div>
            </div>
          </section>
        </Revelar>

        {/* ── Valores ──────────────────────────────────────── */}
        <Revelar delay={0.1}>
          <section id="valores">
            <div className="mb-12 text-center">
              <div className="mx-auto mb-6 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-outline-variant" />
                <span className="text-xs font-label uppercase tracking-[0.15em] text-on-surface-variant">
                  Lo que nos guía
                </span>
                <div className="h-px w-8 bg-outline-variant" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background">
                Nuestros valores
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {valores.map((v, i) => (
                <div
                  key={v.titulo}
                  className="group relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface p-7 md:p-8 hover:shadow-sm transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary/4 to-transparent group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative z-10 flex gap-5">
                    <div className="shrink-0 mt-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/10 group-hover:border-primary/20 group-hover:shadow-sm transition-all duration-300">
                        <v.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-headline font-bold tracking-tight text-on-background mb-2">
                        {v.titulo}
                      </h3>
                      <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                        {v.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Corner decorative dash */}
                  <div
                    aria-hidden
                    className="absolute bottom-3 right-3 h-8 w-8"
                  >
                    <svg
                      role="img"
                      aria-label="Formas decorativas"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="h-full w-full text-primary/6"
                    >
                      <path
                        d="M2 30 L30 2"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 30 L30 10"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Revelar>

        {/* ── Quote 2 (Felipe) ──────────────────────────────── */}
        <Revelar delay={0.1} desde="izquierda">
          <section className="relative overflow-hidden rounded-3xl border border-tertiary/10 bg-linear-to-br from-tertiary/3 via-transparent to-tertiary/2 p-8 md:p-14 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-tertiary/4 via-transparent to-transparent"
            />

            <div className="relative z-10">
              {/* Decorative bug icon */}
              <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-tertiary/10 border border-tertiary/15">
                <Bug className="h-6 w-6 text-tertiary" />
              </div>

              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-headline font-black tracking-tighter text-on-background leading-[1.15] max-w-3xl mx-auto mb-6">
                &ldquo;Nuestros sentidos son la manera en que el universo se
                observa a sí mismo, los sentidos de los animales no son más que
                otra perspectiva de la misma realidad. Ignorar su bienestar es
                empobrecer la mirada del propio cosmos.&rdquo;
              </blockquote>

              <div className="inline-flex items-center gap-3">
                <div className="h-px w-8 bg-tertiary/30" />
                <p className="text-sm font-label uppercase tracking-[0.15em] text-on-surface-variant">
                  Felipe Calderón, cofundador
                </p>
                <div className="h-px w-8 bg-tertiary/30" />
              </div>
            </div>

            {/* Wing decorations */}
            <svg
              role="img"
              aria-label="Formas decorativas"
              aria-hidden
              className="absolute -bottom-10 -right-10 h-40 w-40 text-tertiary/4 dark:text-tertiary/6"
              viewBox="0 0 100 100"
              fill="none"
            >
              <ellipse cx="50" cy="50" rx="45" ry="20" fill="currentColor" />
              <ellipse cx="50" cy="50" rx="20" ry="45" fill="currentColor" />
            </svg>
            <svg
              role="img"
              aria-label="Formas decorativas"
              aria-hidden
              className="absolute -top-10 -left-10 h-28 w-28 text-tertiary/3 dark:text-tertiary/5"
              viewBox="0 0 100 100"
              fill="none"
            >
              <ellipse cx="50" cy="50" rx="40" ry="18" fill="currentColor" />
              <ellipse cx="50" cy="50" rx="18" ry="40" fill="currentColor" />
            </svg>
          </section>
        </Revelar>

        {/* ── CTA final ────────────────────────────────────── */}
        <Revelar delay={0.1}>
          <section className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-br from-primary/4 via-primary/1 to-background"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,var(--tw-gradient-stops))] from-primary/6 via-transparent to-transparent"
            />

            {/* Decorative wing shapes */}
            <svg
              role="img"
              aria-label="Formas decorativas"
              aria-hidden
              className="absolute -top-16 -right-16 h-64 w-64 text-primary/3 dark:text-primary/5"
              viewBox="0 0 100 100"
              fill="none"
            >
              <ellipse cx="50" cy="50" rx="48" ry="22" fill="currentColor" />
              <ellipse cx="50" cy="50" rx="22" ry="48" fill="currentColor" />
            </svg>

            <div className="relative z-10 border border-primary/15 rounded-3xl p-10 md:p-16 text-center backdrop-blur-sm">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/15">
                <Leaf className="h-5 w-5 text-primary" />
              </div>

              <p className="text-xs font-label uppercase tracking-[0.15em] text-primary mb-4">
                Únete al movimiento
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-on-background mb-4">
                ¿Compartes nuestra visión?
              </h2>
              <p className="text-on-surface-variant font-body max-w-lg mx-auto mb-10 leading-relaxed text-sm md:text-base">
                Hay muchas formas de sumarte: firmando peticiones, compartiendo
                noticias o simplemente hablando de insectos con las personas que
                quieres. Cada gesto cuenta.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/peticiones"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary px-8 py-4 font-label uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-all duration-300 active:scale-95"
                >
                  Ver peticiones activas
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/noticias"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-transparent border border-outline-variant text-on-background px-8 py-4 font-label uppercase tracking-widest font-bold hover:bg-surface-container-high transition-all duration-300 active:scale-95"
                >
                  Leer noticias
                </Link>
              </div>
            </div>
          </section>
        </Revelar>
      </div>
    </div>
  );
}
