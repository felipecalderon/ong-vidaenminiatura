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

interface VoluntarioConfirmacionEmailProps {
  nombre: string;
  areasInteres: string[];
}

export function VoluntarioConfirmacionEmail({
  nombre,
  areasInteres,
}: VoluntarioConfirmacionEmailProps) {
  const previewText = `¡Gracias por postular al voluntariado de Fundación Más Insectos, ${nombre}!`;

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
                        width="42"
                        height="42"
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
            <Text style={subLogoText}>Fundación Más Insectos</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>¡Gracias por sumarte, {nombre}!</Heading>
            <Text style={paragraph}>
              Hemos recibido con entusiasmo tu postulación para formar parte de
              la <strong>Red de Voluntariado de Fundación Más Insectos</strong>.
            </Text>

            <Text style={paragraph}>
              Creemos firmemente que cada especie cuenta y que la defensa de los
              invertebrados requiere de diversas miradas: ciencia, educación,
              derecho, arte y territorio.
            </Text>

            <Section style={box}>
              <Text style={boxTitle}>Tus áreas de interés seleccionadas:</Text>
              <ul style={list}>
                {areasInteres.map((area, idx) => (
                  <li key={idx} style={listItem}>
                    {area}
                  </li>
                ))}
              </ul>
            </Section>

            <Heading as="h2" style={h2}>
              ¿Cuáles son los siguientes pasos?
            </Heading>

            <Text style={paragraph}>
              1. Nuestro equipo de coordinación revisará tus antecedentes y
              disponibilidad.
              <br />
              2. Te contactaremos vía correo electrónico o WhatsApp para
              invitarte a una reunión de inducción y bienvenida.
              <br />
              3. Te integraremos a las brigadas de trabajo según los proyectos
              activos en tu territorio o en modalidad remota.
            </Text>

            <Text style={paragraph}>
              Agradecemos tu compromiso y paciencia mientras procesamos todas
              las solicitudes.
            </Text>

            <Section style={ctaSection}>
              <Link href="https://masinsectos.org/nosotros" style={button}>
                Conoce más sobre la Fundación
              </Link>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong>Fundación Más Insectos (+ Insectos)</strong>
              <br />
              Temuco, Región de La Araucanía, Chile
              <br />
              Conservación, educación e incidencia jurídica para los
              invertebrados.
            </Text>
            <Text style={footerLink}>
              <Link href="https://masinsectos.org" style={linkStyle}>
                masinsectos.org
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos en línea para compatibilidad universal de clientes de correo
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
  padding: "28px 24px",
  textAlign: "center" as const,
};

const brandTable = {
  margin: "0 auto",
  textAlign: "left" as const,
};

const brandIconCell = {
  verticalAlign: "middle" as const,
  paddingRight: "12px",
};

const iconWrapper = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  padding: "4px",
  display: "inline-block",
  lineHeight: "0",
};

const iconImg = {
  display: "block",
  borderRadius: "6px",
};

const brandTextCell = {
  verticalAlign: "middle" as const,
  textAlign: "left" as const,
};

const brandMas = {
  color: "#34d399",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  lineHeight: "1",
};

const brandInsectos = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "900",
  letterSpacing: "-0.04em",
  lineHeight: "1.1",
  marginTop: "2px",
};

const subLogoText = {
  margin: "12px 0 0 0",
  color: "#ede9fe",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.15em",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "32px 28px",
  borderLeft: "1px solid #cbd5e1",
  borderRight: "1px solid #cbd5e1",
};

const h1 = {
  color: "#18181b",
  fontSize: "22px",
  fontWeight: "800",
  margin: "0 0 16px 0",
  lineHeight: "1.3",
};

const h2 = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "700",
  margin: "24px 0 12px 0",
};

const paragraph = {
  color: "#52525b",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 16px 0",
};

const box = {
  backgroundColor: "#ede9fe",
  borderRadius: "12px",
  border: "1px solid #ddd6fe",
  padding: "16px 20px",
  margin: "20px 0",
};

const boxTitle = {
  margin: "0 0 8px 0",
  fontSize: "13px",
  fontWeight: "700",
  color: "#4c1d95",
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

const ctaSection = {
  textAlign: "center" as const,
  margin: "28px 0 12px 0",
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
  padding: "20px 24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#6b7280",
  fontSize: "11px",
  lineHeight: "1.5",
  margin: "0 0 8px 0",
};

const footerLink = {
  margin: "0",
};

const linkStyle = {
  color: "#7c3aed",
  fontSize: "11px",
  fontWeight: "600",
  textDecoration: "underline",
};
