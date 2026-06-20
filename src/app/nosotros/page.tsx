import {
  Bug,
  Heart,
  Leaf,
  MapPin,
  Microscope,
  Quote,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a InsectosVivos: una fundación nacida en Temuco, Chile, dedicada a educar y preservar el bienestar animal con foco en el mundo de los insectos.",
};

const fundadores = [
  {
    nombre: "Bárbara Manquilef Aburto",
    rol: "Cofundadora",
    descripcion:
      "Abogada especializada en Derecho Animal, Docente en la Universidad Católica, amante de los gatos y los insectos",
    emoji: "🦋",
    color: "bg-primary/10 border-primary/20",
    accentColor: "text-primary",
  },
  {
    nombre: "Felipe Calderón Espinoza",
    rol: "Cofundador",
    descripcion:
      "Ingeniero de Software apasionado por la tecnología con enfoque ambientalista, apasionado por las teorías de panteísmo y monismo.",
    emoji: "💻",
    color: "bg-tertiary/10 border-tertiary/20",
    accentColor: "text-tertiary",
  },
];

const valores = [
  {
    icon: Microscope,
    titulo: "Ciencia con propósito",
    descripcion:
      "Cada acción que tomamos está respaldada por evidencia científica rigurosa y pensamiento crítico.",
  },
  {
    icon: Heart,
    titulo: "Bienestar integral",
    descripcion:
      "Creemos que el bienestar animal no tiene jerarquías: toda vida merece respeto, sin importar su tamaño.",
  },
  {
    icon: Users,
    titulo: "Comunidad y educación",
    descripcion:
      "Sembramos conciencia en las nuevas generaciones para construir una sociedad que cuide su entorno.",
  },
  {
    icon: Leaf,
    titulo: "Regeneración ecosistémica",
    descripcion:
      "Proteger los insectos es proteger bosques, ríos, cultivos y la red completa de la vida.",
  },
];

const hitos = [
  {
    año: "2019",
    titulo: "El origen",
    descripcion: "....",
  },
  {
    año: "2021",
    titulo: "Primera campaña",
    descripcion: "....",
  },
  {
    año: "2022",
    titulo: "Constitución oficial",
    descripcion: "....",
  },
  {
    año: "2024",
    titulo: "Plataforma digital",
    descripcion: "....",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-outline-variant bg-surface-container">
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/8 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-tertiary/8 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-36 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-label uppercase tracking-widest text-primary mb-8">
            <MapPin className="h-3 w-3" />
            Temuco, Chile · Fundada 2026
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black tracking-tighter text-on-background leading-[1.05] mb-6">
            Cada insecto <span className="text-primary">importa.</span>
            <br />
            Esos pequeños seres te necesitan atento
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-on-surface-variant font-body leading-relaxed mb-10">
            Somos una fundación nacida en el corazón de La Araucanía con una
            convicción simple pero poderosa: los insectos sostienen la vida en
            la Tierra, y educar sobre ellos es el primer paso para preservarla.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: "5+", label: "años de labor" },
              { value: "2", label: "fundadores" },
              { value: "10k+", label: "vidas impactadas" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-outline-variant bg-surface p-4 text-center"
              >
                <div className="text-2xl font-headline font-black tracking-tighter text-on-background">
                  {s.value}
                </div>
                <div className="text-xs font-label uppercase tracking-widest text-on-surface-variant mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-20 space-y-28">
        {/* ── Frase inspiradora ───────────────────────────── */}
        <section className="relative">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-14 text-center">
            <Quote className="mx-auto h-10 w-10 text-primary/30 mb-6" />
            <blockquote className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background leading-snug mb-6">
              "Un mundo sin insectos es un mundo sin futuro. Nosotros elegimos
              el futuro."
            </blockquote>
            <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant">
              — Bárbara Manquilef, cofundadora InsectosVivos
            </p>
          </div>
        </section>

        {/* ── Misión & Visión ─────────────────────────────── */}
        <section id="mision-vision">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Misión */}
            <div className="group relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container p-8 hover:border-primary/40 transition-colors duration-300">
              <div className="absolute top-0 right-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="mb-5 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 border border-primary/20">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xs font-label uppercase tracking-widest text-primary mb-3">
                  Nuestra Misión
                </h2>
                <p className="text-xl md:text-2xl font-headline font-black tracking-tighter text-on-background leading-snug mb-4">
                  Educar, proteger y restaurar
                </p>
                <p className="text-on-surface-variant font-body leading-relaxed">
                  Promovemos la educación ambiental y el bienestar animal con
                  foco en los insectos, trabajando con comunidades, escuelas e
                  instituciones para generar un cambio cultural que reconozca el
                  valor irremplazable de estos seres en todos los ecosistemas.
                </p>
              </div>
            </div>

            {/* Visión */}
            <div className="group relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container p-8 hover:border-tertiary/40 transition-colors duration-300">
              <div className="absolute top-0 right-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-tertiary/5 blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="mb-5 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-tertiary/10 border border-tertiary/20">
                  <Sparkles className="h-5 w-5 text-tertiary" />
                </div>
                <h2 className="text-xs font-label uppercase tracking-widest text-tertiary mb-3">
                  Nuestra Visión
                </h2>
                <p className="text-xl md:text-2xl font-headline font-black tracking-tighter text-on-background leading-snug mb-4">
                  Un mundo que cuida lo pequeño
                </p>
                <p className="text-on-surface-variant font-body leading-relaxed">
                  Imaginamos una sociedad donde los insectos sean valorados como
                  los pilares invisibles de la biodiversidad; donde la infancia
                  crezca con asombro por la naturaleza y donde las políticas
                  públicas reflejen que cuidar lo pequeño es cuidar el todo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Historia ─────────────────────────────────────── */}
        <section id="historia">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex-1 h-px bg-outline-variant" />
            <h2 className="text-xs font-label uppercase tracking-widest text-on-surface-variant px-2">
              Nuestra historia
            </h2>
            <div className="flex-1 h-px bg-outline-variant" />
          </div>

          <div className="relative">
            {/* Vertical line (desktop) */}
            <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-outline-variant hidden md:block" />

            <div className="space-y-10">
              {hitos.map((hito, i) => (
                <div
                  key={hito.año}
                  className={`relative flex flex-col md:flex-row gap-6 items-start ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className="md:w-[calc(50%-2rem)] shrink-0">
                    <div className="rounded-xl border border-outline-variant bg-surface-container p-6 hover:border-primary/30 transition-colors duration-200">
                      <div className="text-3xl font-headline font-black tracking-tighter text-primary mb-2">
                        {hito.año}
                      </div>
                      <h3 className="text-base font-bold text-on-background mb-2">
                        {hito.titulo}
                      </h3>
                      <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                        {hito.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 h-4 w-4 rounded-full bg-primary border-2 border-background z-10 items-center justify-center" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Valores ──────────────────────────────────────── */}
        <section id="valores">
          <div className="mb-10 text-center">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">
              Lo que nos guía
            </p>
            <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-background">
              Nuestros valores
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {valores.map((v) => (
              <div
                key={v.titulo}
                className="flex gap-4 rounded-xl border border-outline-variant bg-surface-container p-6 hover:bg-surface-container-high transition-colors duration-200 group"
              >
                <div className="mt-0.5 shrink-0 h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-on-background mb-1.5">
                    {v.titulo}
                  </h3>
                  <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                    {v.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Fundadores ───────────────────────────────────── */}
        <section id="fundadores">
          <div className="mb-10 text-center">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">
              Las personas detrás de la misión
            </p>
            <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-background">
              Quiénes somos
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {fundadores.map((f) => (
              <div
                key={f.nombre}
                className={`rounded-2xl border p-8 ${f.color} transition-transform duration-200 hover:-translate-y-1`}
              >
                {/* Avatar placeholder */}
                <div className="mb-6 h-20 w-20 rounded-2xl bg-surface-container border border-outline-variant flex items-center justify-center text-4xl">
                  {f.emoji}
                </div>

                <div className="mb-1">
                  <span
                    className={`text-xs font-label uppercase tracking-widest ${f.accentColor}`}
                  >
                    {f.rol}
                  </span>
                </div>
                <h3 className="text-2xl font-headline font-black tracking-tighter text-on-background mb-4">
                  {f.nombre}
                </h3>
                <p className="text-on-surface-variant font-body leading-relaxed text-sm">
                  {f.descripcion}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Segunda frase ────────────────────────────────── */}
        <section className="text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-tertiary/10 border border-tertiary/20 mb-6">
            <Bug className="h-7 w-7 text-tertiary" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background leading-snug max-w-3xl mx-auto mb-4">
            "Nadie protege lo que no conoce. Por eso enseñamos primero, y
            actuamos después — siempre juntos."
          </blockquote>
          <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant">
            — Diego Sepúlveda, cofundador InsectosVivos
          </p>
        </section>

        {/* ── Impacto / Cifras ─────────────────────────────── */}
        <section>
          <div className="rounded-2xl border border-outline-variant bg-surface-container overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant">
              {[
                {
                  icon: Users,
                  value: "10.000+",
                  label: "Estudiantes impactados",
                  sub: "en escuelas de La Araucanía",
                },
                {
                  icon: Shield,
                  value: "40+",
                  label: "Especies documentadas",
                  sub: "en campañas de campo",
                },
                {
                  icon: Leaf,
                  value: "3",
                  label: "Regiones alcanzadas",
                  sub: "con programas educativos",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center p-10 text-center gap-2 hover:bg-surface-container-high transition-colors duration-200"
                >
                  <stat.icon className="h-6 w-6 text-primary mb-2" />
                  <div className="text-3xl font-headline font-black tracking-tighter text-on-background">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-on-background">
                    {stat.label}
                  </div>
                  <div className="text-xs text-on-surface-variant font-body">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA final ────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-10 md:p-16 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
          />
          <div className="relative z-10">
            <p className="text-xs font-label uppercase tracking-widest text-primary mb-4">
              Únete al movimiento
            </p>
            <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-background mb-4">
              ¿Compartes nuestra visión?
            </h2>
            <p className="text-on-surface-variant font-body max-w-xl mx-auto mb-8 leading-relaxed">
              Hay muchas formas de sumarte: firmando peticiones, compartiendo
              noticias o simplemente hablando de insectos con las personas que
              quieres. Cada gesto cuenta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/peticiones">
                <button
                  type="button"
                  className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-lg font-label uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100"
                >
                  Ver peticiones activas
                </button>
              </Link>
              <Link href="/noticias">
                <button
                  type="button"
                  className="w-full sm:w-auto bg-transparent border border-outline-variant text-on-background px-8 py-4 rounded-lg font-label uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100"
                >
                  Leer noticias
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
