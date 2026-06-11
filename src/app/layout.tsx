import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "@mdxeditor/editor/style.css";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries";
import { getTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "InsectosVivos",
    template: "%s | InsectosVivos",
  },
  description:
    "Fundación para la protección y conservación de insectos y arácnidos.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const usuarioAutenticado = await obtenerUsuarioAutenticado();
  const theme = await getTheme();

  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
        theme === "dark" && "dark",
      )}
    >
      <body className="min-h-full bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
        <div className="flex min-h-screen flex-col">
          <Header usuarioAutenticado={usuarioAutenticado} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
