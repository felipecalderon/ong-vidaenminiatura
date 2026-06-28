import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "@mdxeditor/editor/style.css";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
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

const BASE_URL = process.env.APP_BASE_URL || "https://www.insectosvivos.org";

export const metadata: Metadata = {
  title: {
    default: "MasInsectos",
    template: "%s | MasInsectos",
  },
  description:
    "Fundación para la protección y conservación de seres vivos enfocado en insectos y arácnidos. Conoce nuestra misión, proyectos y cómo puedes ayudar.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp, etc.) ────────────────────
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: BASE_URL,
    siteName: "MasInsectos",
    title: "MasInsectos – Fundación para la conservación de insectos",
    description:
      "Fundación para la protección y conservación de insectos y arácnidos. Conoce nuestra misión, proyectos y cómo puedes ayudar.",
    images: [
      {
        url: "/assets/og-image.jpg", // coloca aquí tu imagen 1200×630 px
        width: 1200,
        height: 630,
        alt: "MasInsectos – Fundación para la conservación de insectos",
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@InsectosVivos", // reemplaza con tu handle real
    creator: "@InsectosVivos",
    title: "InsectosVivos – Fundación para la conservación de insectos",
    description:
      "Fundación para la protección y conservación de insectos y arácnidos. Conoce nuestra misión, proyectos y cómo puedes ayudar.",
    images: ["/assets/og-image.jpg"],
  },

  // ── Íconos ──────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // agrega este archivo en /public si lo tienes
  },

  // ── Robots ──────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verificación de dominio (opcional) ──────────────────────────────────
  // verification: {
  //   google: "TU_CODIGO_GOOGLE_SEARCH_CONSOLE",
  // },

  // ── Meta tags personalizadas (fb:app_id, etc.) ───────────────────────────
  other: {
    "fb:app_id": process.env.NEXT_PUBLIC_FB_APP_ID ?? "691932913034599",
  },
};

import { Toaster } from "sonner";

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
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
