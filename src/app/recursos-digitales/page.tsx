import type { Metadata } from "next";
import { ExportarFondo } from "./components/exportar-fondo";
import { ExportarLogo } from "./components/exportar-logo";

export const metadata: Metadata = {
  title: "Recursos digitales",
  description:
    "Descarga el logo y el fondo decorativo de Más Insectos en distintos formatos y modos de color.",
};

export default function RecursosDigitalesPage() {
  return (
    <>
      <ExportarLogo />
      <div className="mx-auto w-full max-w-2xl px-4 pb-20 sm:px-6 lg:px-8">
        <ExportarFondo />
      </div>
    </>
  );
}
