import { Bug, Leaf, Shield, Users } from "lucide-react";

// Este componente se utilizará a futuro cuando hayan estadísticas reales
// Deuda técnica: Implementar queries para complementar estadísticas
export function EstadisticasGenerales() {
  return (
    <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Users, value: "50k+", label: "Firmas recogidas" },
        { icon: Shield, value: "25+", label: "Peticiones activas" },
        { icon: Bug, value: "12", label: "Victorias logradas" },
        { icon: Leaf, value: "100+", label: "Especies protegidas" },
      ].map((stat) => (
        <div
          key={stat.label}
          className="p-6 bg-surface-container border border-outline-variant rounded-lg text-center flex flex-col items-center justify-center hover:bg-surface-container-high transition-colors dark:neon-border-cyan dark:hover:neon-border-yellow duration-300"
        >
          <stat.icon className="h-6 w-6 mb-4 text-primary" />
          <div className="text-2xl md:text-3xl font-headline font-black tracking-tighter text-on-background mb-1">
            {stat.value}
          </div>
          <div className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}
