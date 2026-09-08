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
import type { Rol } from "@/generated/prisma/enums";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BASE_URL ||
  "https://masinsectos.org";

interface InvitacionUsuarioEmailProps {
  correo: string;
  rol: Rol;
  urlInvitacion: string;
  invitadoPorNombre: string;
  expiraDias?: number;
}

const ROL_LABELS: Record<Rol, string> = {
  USUARIO: "Usuario",
  AUTOR: "Autor de Contenido",
  ADMINISTRADOR: "Administrador de Plataforma",
};

export function InvitacionUsuarioEmail({
  correo,
  rol,
  urlInvitacion,
  invitadoPorNombre,
  expiraDias = 7,
}: InvitacionUsuarioEmailProps) {
  const rolEtiqueta = ROL_LABELS[rol] || rol;
  const previewText = `Has sido invitado a unirte a Fundación Más Insectos con el rol de ${rolEtiqueta}`;

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
            <Heading style={h1}>
              ¡Te damos la bienvenida a la plataforma!
            </Heading>
            <Text style={paragraph}>
              <strong>{invitadoPorNombre}</strong> te ha invitado a formar parte
              del equipo de <strong>Fundación Más Insectos</strong> en nuestra
              plataforma digital.
            </Text>

            <Section style={box}>
              <Text style={boxTitle}>Detalles de tu invitación:</Text>
              <Text style={boxDetail}>
                <strong>Correo registrado:</strong> {correo}
              </Text>
              <Text style={boxDetail}>
                <strong>Rol asignado:</strong>{" "}
                <span style={roleBadge}>{rolEtiqueta}</span>
              </Text>
              <Text style={boxDetail}>
                <strong>Vigencia:</strong> Este enlace expirará en {expiraDias}{" "}
                días.
              </Text>
            </Section>

            <Text style={paragraph}>
              Para activar tu cuenta, haz clic en el botón siguiente y completa
              el inicio de sesión o registro con este mismo correo electrónico:
            </Text>

            <Section style={ctaSection}>
              <Link href={urlInvitacion} style={button}>
                Aceptar Invitación
              </Link>
            </Section>

            <Text style={alternativeText}>
              Si el botón no funciona, copia y pega el siguiente enlace
              directamente en tu navegador:
            </Text>
            <Text style={linkBox}>
              <Link href={urlInvitacion} style={linkBreak}>
                {urlInvitacion}
              </Link>
            </Text>

            <Hr style={innerDivider} />

            <Text style={securityNote}>
              Si no esperabas esta invitación o consideras que se trata de un
              error, puedes ignorar este mensaje. Nadie podrá acceder a tu
              cuenta sin tu consentimiento.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Este es un correo automático generado por la plataforma de
              Fundación Más Insectos.
              <br />
              Para consultas o asistencia, puedes escribir a{" "}
              <Link href="mailto:hola@masinsectos.org" style={linkStyle}>
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
  backgroundColor: "#f4f4f5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  padding: "32px 0",
};

const container = {
  maxWidth: "580px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  overflow: "hidden" as const,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
};

const header = {
  backgroundColor: "#1c1917",
  padding: "28px 24px",
  textAlign: "center" as const,
  borderTop: "5px solid #ca8a04",
};

const brandTable = {
  margin: "0 auto",
};

const brandIconCell = {
  paddingRight: "10px",
  verticalAlign: "middle" as const,
};

const iconWrapper = {
  width: "42px",
  height: "42px",
  borderRadius: "10px",
  backgroundColor: "#ca8a04",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden" as const,
};

const iconImg = {
  display: "block",
};

const brandTextCell = {
  textAlign: "left" as const,
  verticalAlign: "middle" as const,
};

const brandMas = {
  color: "#ca8a04",
  fontSize: "10px",
  fontWeight: "900",
  letterSpacing: "0.25em",
  lineHeight: "1",
};

const brandInsectos = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "900",
  letterSpacing: "-0.03em",
  lineHeight: "1.1",
  marginTop: "2px",
};

const subLogoText = {
  margin: "10px 0 0 0",
  color: "#a1a1aa",
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.15em",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "32px 28px",
  borderLeft: "1px solid #e4e4e7",
  borderRight: "1px solid #e4e4e7",
};

const h1 = {
  color: "#18181b",
  fontSize: "22px",
  fontWeight: "800",
  margin: "0 0 16px 0",
  lineHeight: "1.3",
};

const paragraph = {
  color: "#52525b",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 16px 0",
};

const box = {
  backgroundColor: "#fefce8",
  borderRadius: "12px",
  border: "1px solid #fef08a",
  padding: "16px 20px",
  margin: "20px 0",
};

const boxTitle = {
  margin: "0 0 10px 0",
  fontSize: "13px",
  fontWeight: "700",
  color: "#854d0e",
};

const boxDetail = {
  margin: "0 0 6px 0",
  fontSize: "13px",
  color: "#713f12",
  lineHeight: "1.5",
};

const roleBadge = {
  backgroundColor: "#ca8a04",
  color: "#ffffff",
  padding: "2px 8px",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "800",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "28px 0 16px 0",
};

const button = {
  backgroundColor: "#ca8a04",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 28px",
  letterSpacing: "0.04em",
};

const alternativeText = {
  color: "#71717a",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "16px 0 6px 0",
  textAlign: "center" as const,
};

const linkBox = {
  margin: "0 0 20px 0",
  padding: "10px 14px",
  backgroundColor: "#f4f4f5",
  borderRadius: "8px",
  textAlign: "center" as const,
};

const linkBreak = {
  color: "#854d0e",
  fontSize: "12px",
  wordBreak: "break-all" as const,
  textDecoration: "underline",
};

const innerDivider = {
  borderColor: "#f4f4f5",
  margin: "24px 0",
};

const securityNote = {
  color: "#a1a1aa",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0",
};

const hr = {
  borderColor: "#e4e4e7",
  margin: "0",
};

const footer = {
  backgroundColor: "#fafafa",
  borderRadius: "0 0 16px 16px",
  border: "1px solid #e4e4e7",
  borderTop: "none",
  padding: "20px 24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#71717a",
  fontSize: "11px",
  lineHeight: "1.5",
  margin: "0",
};

const linkStyle = {
  color: "#ca8a04",
  fontSize: "11px",
  fontWeight: "600",
  textDecoration: "underline",
};
