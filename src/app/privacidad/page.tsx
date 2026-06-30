import {
  ArrowUpRight,
  Briefcase,
  Building,
  Calendar,
  Database,
  Eye,
  Lock,
  Mail,
  MapPin,
  UserCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad de la plataforma +Insectos - Fundación Más Insectos.",
};

const sections = [
  {
    id: "informacion-recopilamos",
    title: "1. Información que Recopilamos",
    icon: Database,
    content: (
      <div className="space-y-4">
        <p>
          Nuestra plataforma está diseñada bajo el principio de minimización de
          datos. Solo recopilamos la información estrictamente necesaria para el
          funcionamiento de la comunidad:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
          <li>
            <strong className="text-foreground">
              Datos de Autenticación (Terceros):
            </strong>{" "}
            Para facilitar el registro y garantizar la seguridad, utilizamos el
            proveedor externo <strong className="text-primary">Auth0</strong>{" "}
            mediante la conexión con Google. Al registrarse, recibimos
            únicamente el{" "}
            <strong className="text-foreground">nombre (o alias)</strong> que
            usted haya configurado y su{" "}
            <strong className="text-foreground">
              dirección de correo electrónico
            </strong>
            .
          </li>
          <li>
            <strong className="text-foreground">
              Datos de Actividad en Peticiones:
            </strong>{" "}
            Cuando usted decide firmar una petición pública en el módulo de
            activismo, el sistema registra de forma automática:
            <ol className="list-decimal pl-6 mt-2 space-y-1 text-on-surface-variant/80">
              <li>El correo electrónico asociado a su cuenta activa.</li>
              <li>La fecha y hora exacta en la que se efectuó la firma.</li>
            </ol>
          </li>
          <li>
            <strong className="text-foreground">Contenido Generado:</strong>{" "}
            Almacenamos los artículos, notas de blog o noticias que usted decida
            publicar de forma voluntaria en la plataforma.
          </li>
        </ul>
        <div className="mt-4 p-4 rounded-xl border border-primary/20 bg-primary/5 text-sm flex items-start gap-3">
          <span className="text-base shrink-0">📌</span>
          <p className="text-on-surface-variant">
            <strong className="text-foreground">Nota Legal Importante:</strong>{" "}
            La plataforma{" "}
            <strong className="text-foreground">
              no solicita, no almacena ni procesa
            </strong>{" "}
            el Rol Único Nacional (RUN/RUT), números de identificación
            gubernamental ni datos financieros de ningún tipo.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "uso-informacion",
    title: "2. Uso de la Información",
    icon: Briefcase,
    content: (
      <div className="space-y-4">
        <p>
          Los datos recolectados se utilizan exclusivamente para los fines
          comunitarios y sin fines de lucro de la ONG:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
          <li>
            Validar de forma interna el conteo de firmas en las peticiones
            ciudadanas (evitando duplicidad mediante el correo electrónico).
          </li>
          <li>
            Permitir la autoría de los artículos de divulgación científica y
            blogs.
          </li>
          <li>
            Notificar actualizaciones clave sobre el estado de las peticiones en
            las que ha participado, siempre que lo autorice.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "destino-visibilidad",
    title: "3. Destino y Visibilidad de los Datos",
    icon: Eye,
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-6 space-y-3 text-on-surface-variant">
          <li>
            <strong className="text-foreground">Visibilidad en la Web:</strong>{" "}
            Su nombre o alias será visible públicamente únicamente si publica un
            artículo o si el creador de una petición decide configurar el
            listado de firmas visibles (mostrando solo el nombre/alias,{" "}
            <strong className="text-foreground">
              nunca su correo electrónico
            </strong>
            ).
          </li>
          <li>
            <strong className="text-foreground">
              Entrega a Terceros / Autoridades:
            </strong>{" "}
            Al tratarse de una base de datos inicial de firmantes, la
            información de los correos electrónicos se mantendrá bajo estricta
            reserva de la fundación. Si una petición jurídica requiere ser
            presentada ante un organismo público, la ONG canalizará la entrega
            de los listados garantizando que los datos no se utilicen para fines
            comerciales ajenos a la causa ambiental.{" "}
            <strong className="text-primary font-bold">
              Jamás venderemos ni comercializaremos su información.
            </strong>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "seguridad-datos",
    title: "4. Seguridad de los Datos",
    icon: Lock,
    content: (
      <p className="leading-relaxed">
        Al delegar el proceso de inicio de sesión en{" "}
        <strong className="text-primary">Auth0</strong>, la seguridad de sus
        credenciales de acceso (contraseñas) queda respaldada por estándares
        internacionales de cifrado industrial. En nuestros servidores locales,
        la base de datos que vincula correos y firmas cuenta con medidas de
        seguridad técnicas para evitar accesos no autorizados.
      </p>
    ),
  },
  {
    id: "derechos-usuario",
    title: "5. Derechos del Usuario (Derechos ARCO)",
    icon: UserCheck,
    content: (
      <div className="space-y-4">
        <p>
          En conformidad con la legislación chilena aplicable, usted conserva en
          todo momento el control sobre sus datos y puede ejercer los derechos
          de:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
          <li>
            <strong className="text-foreground">Acceso:</strong> Saber qué datos
            tenemos de usted.
          </li>
          <li>
            <strong className="text-foreground">Rectificación:</strong>{" "}
            Modificar su nombre o datos de perfil.
          </li>
          <li>
            <strong className="text-foreground">
              Cancelación/Eliminación:
            </strong>{" "}
            Solicitar la eliminación definitiva de su cuenta y el retiro de sus
            firmas en las peticiones activas escribiendo directamente a nuestro
            contacto de soporte.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "contacto",
    title: "6. Contacto",
    icon: Mail,
    content: (
      <p className="leading-relaxed">
        Si tiene dudas sobre el tratamiento de sus datos en este ecosistema
        digital, puede ponerse en contacto con nuestro equipo en Temuco a través
        del correo:{" "}
        <a
          href="mailto:legal@masinsectos.org"
          className="font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
        >
          legal@masinsectos.org
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header section with modern glassmorphism design */}
        <header className="mb-12 p-8 md:p-12 rounded-3xl border border-outline-variant bg-surface/50 backdrop-blur-md shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              Privacidad y Seguridad
            </span>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Política de Privacidad
              <span className="block text-primary text-2xl md:text-3xl font-bold mt-2">
                Fundación +Insectos
              </span>
            </h1>

            <p className="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
              En <strong className="text-foreground">+Insectos</strong>, nos
              tomamos muy en serio la privacidad de nuestra comunidad. Esta
              Política de Privacidad describe cómo recopilamos, utilizamos y
              protegemos la información personal de los usuarios que participan
              en nuestra plataforma de difusión científica y activismo digital.
            </p>

            {/* Meta badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-outline-variant/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/40">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant/70 font-semibold">
                    Última actualización
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Junio 2026
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
                    Fundación +Insectos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

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
