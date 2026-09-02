import {
  BookOpen,
  Handshake,
  Heart,
  Landmark,
  Leaf,
  Microscope,
  Scale,
  Sparkles,
  Users,
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
    "Promover la conservación, investigación, defensa y protección de los insectos, arácnidos y otros invertebrados, así como de sus ecosistemas y la biodiversidad general, impulsando transformaciones legislativas, institucionales, culturales, educativas, sociales y ambientales.",
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
  puntosClave: string[];
}

export const ejesEstrategicos: EjeEstrategico[] = [
  {
    id: 1,
    nombre: "Investigación y Difusión Científica",
    subtitulo: "Generación de evidencia y divulgación técnica",
    descripcion:
      "Promover, patrocinar y difundir estudios científicos, publicaciones técnicas, material bibliográfico y encuestas de percepción social sobre la biodiversidad y el bienestar de los invertebrados.",
    icon: Microscope,
    ruta: "/investigacion",
    estado: "activo",
    objetivosAsociados: [2, 4, 13],
    puntosClave: [
      "Producción de informes técnicos y bibliografía especializada",
      "Estudios de percepción pública sobre artrópodos e invertebrados",
      "Repositorio abierto de conocimiento científico para la comunidad",
    ],
  },
  {
    id: 2,
    nombre: "Educación y Concientización",
    subtitulo: "Formación ciudadana y cultura multiespecie",
    descripcion:
      "Desarrollar programas educativos, talleres, charlas y recursos multimedia para promover el respeto, el asombro y la coexistencia empática con las especies más pequeñas del planeta.",
    icon: BookOpen,
    ruta: "/aprende",
    estado: "activo",
    objetivosAsociados: [3, 5, 10],
    puntosClave: [
      "Cursos, talleres y actividades formativas en establecimientos educativos",
      "Producción de contenidos visuales e interactivos accesibles",
      "Transformación cultural hacia una ética antiespecista integral",
    ],
  },
  {
    id: 3,
    nombre: "Acción Legal e Incidencia Institucional",
    subtitulo: "Defensa jurídica y políticas públicas",
    descripcion:
      "Impulsar reformas normativas, participar en discusiones legislativas y ejercer acciones judiciales y ciudadanas para dotar de amparo legal efectivo a los insectos y arácnidos.",
    icon: Scale,
    ruta: "/peticiones",
    estado: "activo",
    objetivosAsociados: [1, 6],
    puntosClave: [
      "Propuestas normativas dirigidas a autoridades y órganos del Estado",
      "Canalización de peticiones ciudadanas con respaldo jurídico",
      "Asesoría y acompañamiento en derecho animal e institucional",
    ],
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
    puntosClave: [
      "Convenios académicos y de investigación colaborativa",
      "Fortalecimiento mutuo con la sociedad civil organizada",
      "Mecanismos de cooperación técnica y de intercambio de saberes",
    ],
  },
  {
    id: 5,
    nombre: "Acción Social y Beneficencia",
    subtitulo: "Desarrollo comunitario y bienestar integral",
    descripcion:
      "Integrar la protección ambiental y animal con programas de beneficencia pública, desarrollo humano y territorial, orientados especialmente a sectores vulnerables.",
    icon: Users,
    estado: "en_desarrollo",
    objetivosAsociados: [10, 11],
    puntosClave: [
      "Talleres y capacitaciones comunitarias en territorios prioritarios",
      "Vinculación con el marco de la Ley N° 19.885 de Donaciones Sociales",
      "Promoción activa de brigadas de voluntariado y acción comunitaria",
    ],
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
    puntosClave: [
      "Postulación a fondos concursables nacionales e internacionales",
      "Administración transparente orientada 100% al objeto fundacional",
      "Canales de patrocinio institucional y donaciones verificables",
    ],
  },
];

export const fundadores = [
  {
    nombre: "Bárbara Manquilef Aburto",
    rol: "Cofundadora",
    descripcion:
      "Abogada especializada en Derecho Animal, Docente de la Universidad Católica de Temuco, apasionada por la investigación jurídica y con un profundo compromiso hacia la defensa, protección y cuidado de todos los seres humanos y no humanos.",
    emoji: "🦋",
    iniciales: "BM",
    tema: "primary",
    foto: "/assets/barbara2.jpeg",
  },
  {
    nombre: "Felipe Calderón Espinoza",
    rol: "Cofundador",
    descripcion:
      "Ingeniero de Software apasionado por la tecnología con enfoque ambientalista, científico de salón y autodidacta que desarrolla código con rigor lógico y observa el mundo desde la filosofía de la mente y la ciencia.",
    emoji: "💻",
    iniciales: "FC",
    tema: "tertiary",
    foto: "/assets/felipe.jpeg",
  },
];

export const valores = [
  {
    icon: Microscope,
    titulo: "Evidencia y Rigor Científico",
    descripcion:
      "Nuestras posturas y acciones se fundamentan en investigación empírica, biología de avanzada y pensamiento crítico.",
  },
  {
    icon: Heart,
    titulo: "Ética Multiespecie",
    descripcion:
      "Rechazamos el especismo: toda forma de vida sintiente merece consideración moral y resguardo de su bienestar.",
  },
  {
    icon: Sparkles,
    titulo: "Educación Transformadora",
    descripcion:
      "Construimos puentes pedagógicos para desarmar prejuicios y despertar empatía hacia los seres invisibilizados.",
  },
  {
    icon: Leaf,
    titulo: "Regeneración Ecosistémica",
    descripcion:
      "Comprendemos que resguardar a los invertebrados es proteger la base viva de los suelos, polinizadores y bosques.",
  },
];
