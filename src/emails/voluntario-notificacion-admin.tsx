import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BASE_URL ||
  "https://masinsectos.org";

interface VoluntarioNotificacionAdminEmailProps {
  nombre: string;
  correo: string;
  telefono?: string | null;
  ciudad?: string | null;
  profesionOcupacion?: string | null;
  disponibilidad?: string | null;
  areasInteres: string[];
  motivacion: string;
  fechaCreacion?: string;
}

export function VoluntarioNotificacionAdminEmail({
  nombre,
  correo,
  telefono,
  ciudad,
  profesionOcupacion,
  disponibilidad,
  areasInteres,
  motivacion,
  fechaCreacion,
}: VoluntarioNotificacionAdminEmailProps) {
  const previewText = `Nueva postulación de voluntariado recibida: ${nombre} (${correo})`;

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <table
              role="presentation"
              border={0}
              cellPadding={0}
              cellSpacing={0}
              style={brandTable}
            >
              <tbody>
                <tr>
                  <td style={brandIconCell}>
                    <div style={iconWrapper}>
                      <Img
                        src={`${BASE_URL}/apple-touch-icon.png`}
                        width="36"
                        height="36"
                        alt="Isotipo Más Insectos"
                        style={iconImg}
                      />
                    </div>
                  </td>
                  <td style={brandTextCell}>
                    <div style={brandMas}>MÁS</div>
                    <div style={brandInsectos}>Insectos</div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={adminTitleWrapper}>
              <Text style={badge}>Panel de Gestión</Text>
              <Heading style={h1}>Nueva Postulación a Voluntariado</Heading>
              <Text style={subHeader}>Fundación Más Insectos</Text>
            </div>
          </Section>

          {/* Body Content */}
          <Section style={content}>
            <Text style={introText}>
              Se ha registrado un nuevo postulante a través del formulario de
              voluntariado del sitio web.
            </Text>

            {/* Ficha del Postulante */}
            <Section style={card}>
              <Text style={cardTitle}>Datos del Postulante</Text>

              <div style={fieldGroup}>
                <Text style={fieldLabel}>Nombre:</Text>
                <Text style={fieldValue}>{nombre}</Text>
              </div>

              <div style={fieldGroup}>
                <Text style={fieldLabel}>Correo Electrónico:</Text>
                <Text style={fieldValue}>
                  <Link href={`mailto:${correo}`} style={link}>
                    {correo}
                  </Link>
                </Text>
              </div>

              <div style={fieldGroup}>
                <Text style={fieldLabel}>Teléfono / WhatsApp:</Text>
                <Text style={fieldValue}>
                  {telefono ? (
                    <Link
                      href={`https://wa.me/${telefono.replace(/\D/g, "")}`}
                      style={link}
                    >
                      {telefono}
                    </Link>
                  ) : (
                    "No especificado"
                  )}
                </Text>
              </div>

              <div style={fieldGroup}>
                <Text style={fieldLabel}>Ciudad / Región:</Text>
                <Text style={fieldValue}>{ciudad || "No especificada"}</Text>
              </div>

              <div style={fieldGroup}>
                <Text style={fieldLabel}>Profesión / Ocupación:</Text>
                <Text style={fieldValue}>
                  {profesionOcupacion || "No especificada"}
                </Text>
              </div>

              <div style={fieldGroup}>
                <Text style={fieldLabel}>Disponibilidad:</Text>
                <Text style={fieldValue}>
                  {disponibilidad || "No especificada"}
                </Text>
              </div>

              <div style={fieldGroup}>
                <Text style={fieldLabel}>Fecha de Postulación:</Text>
                <Text style={fieldValue}>
                  {fechaCreacion || new Date().toLocaleString("es-CL")}
                </Text>
              </div>
            </Section>

            {/* Áreas de Interés */}
            <Section style={card}>
              <Text style={cardTitle}>Áreas de Interés Seleccionadas</Text>
              <ul style={list}>
                {areasInteres.map((area, idx) => (
                  <li key={idx} style={listItem}>
                    {area}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Motivación */}
            <Section style={card}>
              <Text style={cardTitle}>Motivación Declarada</Text>
              <Text style={quoteText}>&ldquo;{motivacion}&rdquo;</Text>
            </Section>

            <Section style={ctaSection}>
              <Link
                href={`mailto:${correo}?subject=Bienvenida%20Voluntariado%20Fundaci%C3%B3n%20M%C3%A1s%20Insectos`}
                style={button}
              >
                Responder al Postulante
              </Link>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Este es un correo automático generado por la plataforma de
              Fundación Más Insectos.
              <br />
              Para consultas administrativas, escribir a{" "}
              <Link href="mailto:hola@masinsectos.org" style={link}>
                hola@masinsectos.org
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos
const main = {
  backgroundColor: "#f8fafc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px 16px",
  maxWidth: "580px",
};

const header = {
  backgroundColor: "#120a2d",
  borderRadius: "16px 16px 0 0",
  padding: "24px",
  textAlign: "center" as const,
};

const brandTable = {
  margin: "0 auto",
  textAlign: "left" as const,
};

const brandIconCell = {
  verticalAlign: "middle" as const,
  paddingRight: "10px",
};

const iconWrapper = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "4px",
  display: "inline-block",
  lineHeight: "0",
};

const iconImg = {
  display: "block",
  borderRadius: "4px",
};

const brandTextCell = {
  verticalAlign: "middle" as const,
  textAlign: "left" as const,
};

const brandMas = {
  color: "#34d399",
  fontSize: "10px",
  fontWeight: "800",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  lineHeight: "1",
};

const brandInsectos = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "900",
  letterSpacing: "-0.04em",
  lineHeight: "1.1",
  marginTop: "2px",
};

const adminTitleWrapper = {
  marginTop: "16px",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  paddingTop: "16px",
};

const badge = {
  display: "inline-block",
  backgroundColor: "rgba(192, 132, 252, 0.2)",
  border: "1px solid #c084fc",
  color: "#c084fc",
  fontSize: "11px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  padding: "4px 10px",
  borderRadius: "100px",
  margin: "0 0 8px 0",
};

const h1 = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "800",
  margin: "0 0 4px 0",
};

const subHeader = {
  color: "#ede9fe",
  fontSize: "12px",
  margin: "0",
  letterSpacing: "0.05em",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "28px 24px",
  borderLeft: "1px solid #cbd5e1",
  borderRight: "1px solid #cbd5e1",
};

const introText = {
  color: "#52525b",
  fontSize: "14px",
  margin: "0 0 20px 0",
  lineHeight: "1.5",
};

const card = {
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  padding: "16px",
  margin: "0 0 16px 0",
};

const cardTitle = {
  color: "#4c1d95",
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  margin: "0 0 12px 0",
  borderBottom: "1px solid #e2e8f0",
  paddingBottom: "6px",
};

const fieldGroup = {
  margin: "0 0 8px 0",
};

const fieldLabel = {
  color: "#6b7280",
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 2px 0",
  fontWeight: "600",
};

const fieldValue = {
  color: "#18181b",
  fontSize: "14px",
  margin: "0",
  fontWeight: "500",
};

const list = {
  margin: "0",
  paddingLeft: "18px",
};

const listItem = {
  color: "#4c1d95",
  fontSize: "13px",
  lineHeight: "1.5",
  marginBottom: "4px",
};

const quoteText = {
  color: "#18181b",
  fontSize: "13px",
  fontStyle: "italic",
  lineHeight: "1.6",
  backgroundColor: "#ffffff",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "12px",
  margin: "0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "24px 0 8px 0",
};

const button = {
  backgroundColor: "#7c3aed",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
};

const hr = {
  borderColor: "#cbd5e1",
  margin: "0",
};

const footer = {
  backgroundColor: "#f8fafc",
  borderRadius: "0 0 16px 16px",
  border: "1px solid #cbd5e1",
  borderTop: "none",
  padding: "16px 24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#6b7280",
  fontSize: "11px",
  lineHeight: "1.5",
  margin: "0",
};

const link = {
  color: "#7c3aed",
  textDecoration: "underline",
};
