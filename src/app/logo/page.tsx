import type { Metadata } from "next";
import { ExportarLogo } from "./components/exportar-logo";

export const metadata: Metadata = {
  title: "Logo",
  description:
    "Descarga el logo de Más Insectos en SVG o PNG con fondo transparente.",
};

export default function LogoPage() {
  return <ExportarLogo />;
}
