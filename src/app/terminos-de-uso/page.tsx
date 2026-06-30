import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  Building,
  Calendar,
  FileSignature,
  FileText,
  Mail,
  MapPin,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso",
  description:
    "Términos y Condiciones de Uso de la plataforma +Insectos - Fundación Más Insectos.",
};

const sections = [
  {
    id: "naturaleza-del-servicio",
    title: "1. Naturaleza del Servicio y Propósito",
    icon: BookOpen,
    content: (
      <div className="space-y-4">
        <p>
          <strong>+Insectos</strong> es un ecosistema digital abierto diseñado
          para:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-on-surface-variant">
          <li>
            <strong className="text-foreground">Difusión y Educación:</strong>{" "}
            Permitir la lectura y publicación de artículos de blog, noticias de
            actualidad y artículos científicos en torno a la biodiversidad, la
            entomología y la filosofía de la interconexión ecológica.
          </li>
          <li>
            <strong className="text-foreground">Activismo Digital:</strong>{" "}
            Facilitar la creación, firma y difusión de peticiones ciudadanas
            públicas orientadas a la protección animal y ambiental (módulo de
            incidencia pública).
          </li>
        </ol>
        <p className="text-sm italic text-primary font-medium mt-2">
          El uso de esta plataforma es estrictamente gratuito y de carácter no
          lucrativo.
        </p>
      </div>
    ),
  },
  {
    id: "registro-de-usuarios",
    title: "2. Registro de Usuarios y Responsabilidad de la Cuenta",
    icon: UserCheck,
    content: (
      <div className="space-y-4">
        <p>
          Para participar de forma activa (publicar contenido o crear
          peticiones), el usuario debe registrarse aportando datos verídicos,
          exactos y actualizados.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
          <li>
            <strong className="text-foreground">
              Custodia de Credenciales:
            </strong>{" "}
            El usuario es el único responsable de mantener la confidencialidad
            de sus credenciales de acceso.
          </li>
          <li>
            <strong className="text-foreground">
              Uso Personal e Intransferible:
            </strong>{" "}
            La cuenta es personal. Cualquier actividad realizada desde una
            cuenta se atribuirá jurídicamente a su titular.
          </li>
          <li>
            <strong className="text-foreground">Restricción de Edad:</strong> La
            plataforma está abierta a todo público, pero la creación de
            contenidos y firmas estará sujeta a la legislación local de
            capacidad civil (en Chile, usuarios menores de edad requieren
            supervisión de sus tutores legales).
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "politica-de-contenido",
    title: "3. Política de Contenido Generado por el Usuario (CGU)",
    icon: FileText,
    content: (
      <div className="space-y-4">
        <p>
          Nuestra plataforma promueve la democratización del conocimiento bajo
          el lema{" "}
          <strong className="text-primary font-semibold">
            "Ciencia con Propósito"
          </strong>
          . Al publicar artículos o noticias, usted garantiza que:
        </p>
        <ol className="list-decimal pl-6 space-y-3 text-on-surface-variant">
          <li>
            <strong className="text-foreground">Autoría y Originalidad:</strong>{" "}
            Posee los derechos de propiedad intelectual sobre el texto, o cuenta
            con las autorizaciones/licencias correspondientes (como Creative
            Commons) citando debidamente las fuentes.
          </li>
          <li>
            <strong className="text-foreground">
              Estándar Científico y Respeto:
            </strong>{" "}
            No se permitirá la difusión de noticias falsas (fake news),
            pseudociencia sin respaldo, discursos de odio, violencia, ni
            material difamatorio.
          </li>
          <li>
            <strong className="text-foreground">
              Licencia de Uso Exclusiva para la ONG:
            </strong>{" "}
            Al subir contenido, usted otorga a la Fundación +Insectos una
            licencia gratuita, no exclusiva, mundial y perpetua para alojar,
            indexar, difundir y maquetar dicho contenido dentro de los fines
            educativos y comunicacionales de la ONG, manteniendo siempre el
            reconocimiento de su autoría.
          </li>
          <li>
            <strong className="text-foreground">Moderación Comunitaria:</strong>{" "}
            La fundación se reserva el derecho inapelable de moderar, editar el
            formato o remover de forma inmediata cualquier publicación que
            vulnere estos estándares o que desvíe el foco temático principal de
            la organización.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "modulo-de-peticiones",
    title: "4. Módulo de Peticiones y Recolección de Firmas Públicas",
    icon: FileSignature,
    content: (
      <div className="space-y-4">
        <p>
          El sistema de recolección de firmas busca generar un impacto real ante
          instituciones públicas y privadas bajo la dirección jurídica de la
          ONG.
        </p>
        <ul className="list-disc pl-6 space-y-3 text-on-surface-variant">
          <li>
            <strong className="text-foreground">
              Validación de Identidad:
            </strong>{" "}
            Para asegurar la validez legal e institucional de las peticiones en
            Chile, el sistema requerirá la verificación de la identidad del
            firmante (incluyendo nombres, apellidos y RUN mediante algoritmos de
            validación estándar).
          </li>
          <li>
            <strong className="text-foreground">Uso de las Firmas:</strong> Al
            firmar una petición, usted autoriza expresamente a la Fundación
            +Insectos a incluir su nombre, apellido y el dato de validación
            pertinente en los documentos formales que se presenten ante las
            autoridades o entidades destinatarias de la petición.
          </li>
          <li>
            <strong className="text-foreground">
              Prohibición de Manipulación:
            </strong>{" "}
            Queda estrictamente prohibido el uso de bots, scripts de
            automatización, identidades falsas o usurpación de datos de terceros
            para inflar el conteo de firmas. Dichas acciones serán sancionadas
            con la expulsión de la plataforma y el reporte a las autoridades
            competentes si constituyera delito.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "5. Propiedad Intelectual de la Fundación",
    icon: ShieldCheck,
    content: (
      <p className="leading-relaxed">
        Los nombres, logotipos (incluyendo la marca <strong>"+Insectos"</strong>{" "}
        y sus variantes visuales), el código fuente de la plataforma, el diseño
        de la interfaz (incluyendo el <em>Modo Ultravioleta</em>), la
        arquitectura del sistema y los contenidos institucionales propios son
        propiedad exclusiva de la fundación o de sus desarrolladores originales
        y están protegidos por las leyes de propiedad intelectual e industrial
        de Chile e instrumentos internacionales.
      </p>
    ),
  },
  {
    id: "limitacion-responsabilidad",
    title: "6. Limitación de Responsabilidad",
    icon: AlertTriangle,
    content: (
      <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
        <li>
          <strong className="text-foreground">Opiniones de Terceros:</strong> La
          fundación no se co-responsabiliza por las opiniones, hipótesis
          científicas o posturas filosóficas vertidas por los usuarios en los
          artículos de blog.
        </li>
        <li>
          <strong className="text-foreground">
            Disponibilidad del Sistema:
          </strong>{" "}
          Como plataforma en constante desarrollo técnico, no garantizamos la
          disponibilidad ininterrumpida del sitio, ni nos hacemos responsables
          por pérdidas de datos ocasionadas por fallos de conectividad ajenos a
          nuestro control directo.
        </li>
      </ul>
    ),
  },
  {
    id: "modificaciones-terminos",
    title: "7. Modificaciones de los Términos",
    icon: FileText,
    content: (
      <p className="leading-relaxed">
        La fundación se reserva el derecho de actualizar estos términos para
        adaptarlos a nuevas funcionalidades de la plataforma o cambios
        legislativos (como la Ley N° 19.628 de Protección de la Vida Privada o
        la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores en
        Chile, de ser aplicables). Las modificaciones serán notificadas de forma
        visible en la web.
      </p>
    ),
  },
  {
    id: "legislacion-jurisdiccion",
    title: "8. Legislación Aplicable y Jurisdicción",
    icon: Scale,
    content: (
      <p className="leading-relaxed">
        Estos Términos y Condiciones se rigen por las leyes de la República de
        Chile. Cualquier controversia derivada del uso de la plataforma o la
        interpretación de este documento será sometida a los tribunales
        ordinarios de justicia de la ciudad de <strong>Temuco, Chile</strong>.
      </p>
    ),
  },
];

export default function TerminosDeUsoPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header section with modern glassmorphism design */}
        <header className="mb-12 p-8 md:p-12 rounded-3xl border border-outline-variant bg-surface/50 backdrop-blur-md shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              Legal y Privacidad
            </span>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Términos y Condiciones de Uso
              <span className="block text-primary text-2xl md:text-3xl font-bold mt-2">
                Fundación +Insectos
              </span>
            </h1>

            <p className="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
              Bienvenido/a a{" "}
              <strong className="text-foreground">+Insectos</strong>, una
              plataforma tecnológica y comunitaria impulsada por nuestra
              organización sin fines de lucro, dedicada a la difusión
              científica, la educación ambiental, la exploración filosófica del
              biocentrismo y la protección legal de los insectos y demás seres
              vivos.
            </p>

            {/* Meta badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-outline-variant/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/40">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant/70 font-semibold">
                    Última actualización
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Julio 2026
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant/70 font-semibold">
                    Origen
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Temuco, Chile
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/40">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant/70 font-semibold">
                    Entidad
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Fundación (en formación)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/40">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant/70 font-semibold">
                    Contacto legal
                  </p>
                  <a
                    href="mailto:legal@masinsectos.org"
                    className="text-sm font-bold text-primary hover:underline flex items-center gap-0.5"
                  >
                    legal@masinsectos.org
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Intro Alert Box */}
        <div className="mb-12 p-6 rounded-2xl border border-primary/20 bg-primary/5 text-on-surface-variant leading-relaxed text-base">
          Al acceder, registrarse o utilizar nuestro sitio web y sus módulos
          interactivos, usted acepta quedar vinculado por los presentes Términos
          y Condiciones. Si no está de acuerdo con alguna de estas
          disposiciones, le solicitamos abstenerse de utilizar la plataforma.
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Navigation Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-6 space-y-4">
            <div className="p-6 rounded-2xl border border-outline-variant bg-surface/50 backdrop-blur-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant/70 mb-4">
                Contenido
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all group"
                    >
                      <Icon className="w-4 h-4 text-on-surface-variant/60 group-hover:text-primary transition-colors shrink-0" />
                      <span className="truncate">
                        {section.title.split(". ")[1]}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Detailed Sections (Scrollable) */}
          <div className="lg:col-span-8 space-y-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="p-8 rounded-2xl border border-outline-variant bg-surface hover:shadow-md transition-shadow scroll-mt-6"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground pt-2.5">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-on-surface-variant space-y-4 leading-relaxed font-body pl-0 md:pl-16">
                    {section.content}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
