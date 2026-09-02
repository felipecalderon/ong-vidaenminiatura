import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

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
            <Text style={logoText}>+ INSECTOS</Text>
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
  backgroundColor: "#f4f6f4",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px 16px",
  maxWidth: "580px",
};

const header = {
  backgroundColor: "#1b3323",
  borderRadius: "16px 16px 0 0",
  padding: "28px 24px",
  textAlign: "center" as const,
};

const logoText = {
  margin: "0",
  color: "#a4e2a8",
  fontSize: "24px",
  fontWeight: "900",
  letterSpacing: "0.1em",
};

const subLogoText = {
  margin: "4px 0 0 0",
  color: "#ffffff",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.15em",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "32px 28px",
  borderLeft: "1px solid #e2e8e0",
  borderRight: "1px solid #e2e8e0",
};

const h1 = {
  color: "#1b3323",
  fontSize: "22px",
  fontWeight: "800",
  margin: "0 0 16px 0",
  lineHeight: "1.3",
};

const h2 = {
  color: "#1b3323",
  fontSize: "16px",
  fontWeight: "700",
  margin: "24px 0 12px 0",
};

const paragraph = {
  color: "#3d4b3f",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 16px 0",
};

const box = {
  backgroundColor: "#f0f7f1",
  borderRadius: "12px",
  border: "1px solid #cfe6d2",
  padding: "16px 20px",
  margin: "20px 0",
};

const boxTitle = {
  margin: "0 0 8px 0",
  fontSize: "13px",
  fontWeight: "700",
  color: "#1b3323",
};

const list = {
  margin: "0",
  paddingLeft: "18px",
};

const listItem = {
  color: "#2a5235",
  fontSize: "13px",
  lineHeight: "1.5",
  marginBottom: "4px",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "28px 0 12px 0",
};

const button = {
  backgroundColor: "#225932",
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
  borderColor: "#e2e8e0",
  margin: "0",
};

const footer = {
  backgroundColor: "#f9faf9",
  borderRadius: "0 0 16px 16px",
  border: "1px solid #e2e8e0",
  borderTop: "none",
  padding: "20px 24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#6b7d6f",
  fontSize: "11px",
  lineHeight: "1.5",
  margin: "0 0 8px 0",
};

const footerLink = {
  margin: "0",
};

const linkStyle = {
  color: "#225932",
  fontSize: "11px",
  fontWeight: "600",
  textDecoration: "underline",
};
