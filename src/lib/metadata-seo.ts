import type { Metadata } from "next";

const BASE_URL = process.env.APP_BASE_URL || "https://www.insectosvivos.org";

export const metadataSEO: Metadata = {
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
    title: "MasInsectos - Fundación para la conservación de insectos",
    description:
      "Fundación para la protección y conservación de insectos y arácnidos. Conoce nuestra misión, proyectos y cómo puedes ayudar.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MasInsectos - Fundación para la conservación de insectos",
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@masinsectos",
    creator: "@masinsectos",
    title: "Más Insectos - Fundación para la conservación de insectos",
    description:
      "Fundación para la protección y conservación de insectos y arácnidos. Conoce nuestra misión, proyectos y cómo puedes ayudar.",
    images: ["/og-image.jpg"],
  },

  // ── Íconos ──────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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

  facebook: {
    appId: "691932913034599",
  },
  // ── Verificación de dominio (opcional) ──────────────────────────────────
  // verification: {
  //   google: "TU_CODIGO_GOOGLE_SEARCH_CONSOLE",
  // },
};
