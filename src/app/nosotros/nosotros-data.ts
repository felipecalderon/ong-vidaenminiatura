import {
  BookOpen,
  Handshake,
  Heart,
  Landmark,
  Leaf,
  Microscope,
  Scale,
  Sparkles,
  Sprout,
} from "lucide-react";

export const denominacionInstitucional = {
  nombreOficial: "Fundación Más Insectos",
  nombreFantasia: "+ Insectos",
  lema: "Investigación, educación, defensa jurídica y conservación de los invertebrados",
  domicilio: "Temuco, Región de La Araucanía, Chile",
  tipoEntidad: "Fundación de derecho privado sin fines de lucro",
};

export const objetoPrincipal = {
  titulo: "Objeto Estatutario Principal",
  declaracion:
    "Proteger los animales no humanos, con enfoque prioritario en la defensa y conservación de los insectos, arácnidos y otros invertebrados, instaurando cambios legislativos, institucionales, culturales, sociales y medioambientales en relación a ellos",
};

export interface EjeEstrategico {
  id: number;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  icon: typeof Microscope;
  ruta?: string;
  estado: "activo" | "en_desarrollo";
  objetivosAsociados: number[];
}

export const ejesEstrategicos: EjeEstrategico[] = [
  {
    id: 1,
    nombre: "Investigación y Difusión Científica",
    subtitulo: "Generación de evidencia y divulgación técnica",
    descripcion:
      "Generar, promover, patrocinar y difundir estudios científicos, publicaciones técnicas, material bibliográfico y encuestas de percepción social.",
    icon: Microscope,
    ruta: "/investigacion",
    estado: "activo",
    objetivosAsociados: [2, 4, 13],
  },
  {
    id: 2,
    nombre: "Acción Legal e Incidencia Institucional",
    subtitulo: "Defensa jurídica y políticas públicas",
    descripcion:
      "Impulsar reformas normativas, participar en discusiones legislativas y ejercer acciones judiciales y extrajudiciales.",
    icon: Scale,
    ruta: "/peticiones",
    estado: "activo",
    objetivosAsociados: [1, 6],
  },
  {
    id: 3,
    nombre: "Educación y Concientización",
    subtitulo: "Formación ciudadana y cultura antiespecista",
    descripcion:
      "Desarrollar programas educativos, talleres, charlas y recursos multimedia para promover el respeto, la protección, el asombro y la coexistencia empática con las especies más vulneradas del planeta.",
    icon: BookOpen,
    ruta: "/aprende",
    estado: "activo",
    objetivosAsociados: [3, 5, 10],
  },
  {
    id: 4,
    nombre: "Redes y Cooperación",
    subtitulo: "Alianzas estratégicas nacionales e internacionales",
    descripcion:
      "Articular convenios de cooperación con universidades, centros científicos, organismos públicos, entidades privadas y organizaciones afines para potenciar el impacto colectivo.",
    icon: Handshake,
    estado: "en_desarrollo",
    objetivosAsociados: [7, 8],
  },
  {
    id: 5,
    nombre: "Cultura vegana y alternativas éticas",
    subtitulo: "Fomento de alimentación basada en plantas.",
    descripcion:
      "Implementar acciones y campañas para masificar el veganismo y asesorar en nutrición basada en plantas.",
    icon: Sprout,
    estado: "en_desarrollo",
    objetivosAsociados: [10, 11],
  },
  {
    id: 6,
    nombre: "Gestión Financiera y Sostenibilidad",
    subtitulo: "Transparencia, probidad y financiamiento ético",
    descripcion:
      "Gestionar fondos públicos y privados, aportes y dotaciones bajo los más altos estándares de transparencia y rendición de cuentas para asegurar la continuidad institucional.",
    icon: Landmark,
    estado: "en_desarrollo",
    objetivosAsociados: [9, 12],
  },
];

export const fundadores = [
  {
    nombre: "Bárbara Manquilef",
    rol: "Cofundadora",
    descripcion:
      "Abogada especializada en Derecho Animal, Docente de la Universidad Católica de Temuco.",
    emoji: "🦋",
    iniciales: "BM",
    tema: "primary",
    foto: "/assets/barbara-2.jpeg",
  },
  {
    nombre: "Felipe Calderón",
    rol: "Cofundador",
    descripcion:
      "Ingeniero de software apasionado por la tecnología con enfoque ambientalista.",
    emoji: "💻",
    iniciales: "FC",
    tema: "tertiary",
    foto: "/assets/felipe.jpeg",
  },
];

export const valores = [
  {
    icon: Microscope,
    titulo: "Evidencia y rigor científico",
    descripcion:
      "Nuestras posturas y acciones se fundamentan en investigación empírica y pensamiento crítico.",
  },
  {
    icon: Heart,
    titulo: "Ética animal",
    descripcion:
      "Rechazamos el especismo, toda forma de vida sintiente merece consideración moral, derechos y resguardo de su bienestar.",
  },
  {
    icon: Sparkles,
    titulo: "Educación Transformadora",
    descripcion:
      "Construimos puentes pedagógicos para desarmar prejuicios y despertar empatía hacia los seres más vulnerados del planeta.",
  },
  {
    icon: Leaf,
    titulo: "Regeneración Ecosistémica",
    descripcion:
      "Comprendemos que resguardar a los invertebrados también es proteger la base de la vida en la tierra.",
  },
];
