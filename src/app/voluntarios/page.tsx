import {
  BookOpen,
  FlaskConical,
  Gavel,
  Globe,
  HeartHandshake,
  Megaphone,
  Sparkles,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { Revelar } from "@/components/compartido/revelar";
import { FormularioVoluntariado } from "@/features/voluntarios/components/formulario-voluntariado";

export const metadata: Metadata = {
  title: "Voluntariado | Fundación Más Insectos",
  description:
    "Únete a la Red de Voluntariado de Fundación Más Insectos. Buscamos personas apasionadas por la ciencia, el derecho, la educación y el territorio para proteger los invertebrados de Chile.",
};

const AREAS = [
  {
    icon: FlaskConical,
    titulo: "Investigación",
    descripcion:
      "Ciencia ciudadana, monitoreo de especies y generación de datos para la toma de decisiones.",
  },
  {
    icon: Gavel,
    titulo: "Incidencia Legal",
    descripcion:
      "Apoyo en gestiones judiciales, extrajudiciales y elaboración de políticas públicas.",
  },
  {
    icon: BookOpen,
    titulo: "Educación",
    descripcion:
      "Diseño y facilitación de talleres, charlas y materiales pedagógicos para comunidades.",
  },
  {
    icon: Globe,
    titulo: "Territorio",
    descripcion:
      "Acción comunitaria, trabajo en campo y vinculación con organizaciones locales.",
  },
  {
    icon: Megaphone,
    titulo: "Comunicación",
    descripcion:
      "Diseño gráfico, producción audiovisual y difusión de contenidos en redes.",
  },
  {
    icon: Users,
    titulo: "Logística",
    descripcion:
      "Organización de eventos, coordinación de brigadas y soporte operativo.",
  },
];

function HeroSection() {
  return (
    <section className="relative text-center space-y-5 pb-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-150 rounded-full bg-primary/8 blur-3xl"
      />
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-label uppercase tracking-widest text-primary">
        <HeartHandshake className="h-3.5 w-3.5" />
        <span>Participación Ciudadana</span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tighter text-on-background">
        Red de Voluntariado
        <br />
        <span className="text-primary">+ Insectos</span>
      </h1>
      <p className="text-sm md:text-base text-on-surface-variant font-body leading-relaxed max-w-2xl mx-auto">
        Buscamos personas apasionadas por la ciencia, el derecho, la educación y
        el territorio. No importa tu área de formación —{" "}
        <strong className="text-on-background">
          cada disciplina aporta a la protección de los invertebrados
        </strong>{" "}
        y la biodiversidad de Chile.
      </p>
    </section>
  );
}

function AreasSection() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-tertiary/20 bg-tertiary/5 px-3 py-1 text-xs font-label uppercase tracking-widest text-tertiary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>¿En qué puedo aportar?</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-on-background">
          Áreas de acción
        </h2>
        <p className="text-sm text-on-surface-variant font-body max-w-xl mx-auto">
          El voluntariado es multidisciplinario. Colaboramos en seis ejes
          estratégicos que cubren toda la cadena de conservación.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {AREAS.map(({ icon: Icon, titulo, descripcion }) => (
          <div
            key={titulo}
            className="group rounded-2xl border border-outline-variant/60 bg-surface p-5 space-y-3 hover:border-primary/40 hover:bg-surface-container/60 transition-all duration-200"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/15 text-primary group-hover:bg-primary/15 transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-headline font-bold text-on-background">
                {titulo}
              </h3>
              <p className="text-xs text-on-surface-variant font-body leading-relaxed">
                {descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function VoluntariosPage() {
  return (
    <div className="min-h-screen text-on-background overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-20 space-y-14 md:space-y-28">
        <Revelar>
          <HeroSection />
        </Revelar>

        <Revelar delay={0.1}>
          <AreasSection />
        </Revelar>

        <Revelar delay={0.1}>
          <section id="formulario" className="space-y-8 scroll-mt-20">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-label uppercase tracking-widest text-primary">
                <HeartHandshake className="h-3.5 w-3.5" />
                <span>Únete ahora</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-on-background">
                Postula al voluntariado
              </h2>
              <p className="text-sm text-on-surface-variant font-body max-w-xl mx-auto">
                Completa el formulario y el equipo de coordinación se pondrá en
                contacto contigo a la brevedad.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <FormularioVoluntariado />
            </div>
          </section>
        </Revelar>
      </div>
    </div>
  );
}
