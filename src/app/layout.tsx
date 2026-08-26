import "./globals.css";
import { Toaster } from "sonner";
import { CursorSwarm } from "@/components/compartido/cursor-swarm";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteBackground } from "@/components/site-background";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";
import { figtree, geistMono, geistSans } from "@/lib/fonts";
import { metadataSEO } from "@/lib/metadata-seo";
import { getTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const metadata = metadataSEO;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [usuarioAutenticado, theme] = await Promise.all([
    obtenerUsuarioAutenticado(),
    getTheme(),
  ]);

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
        <SiteBackground />
        <div className="flex min-h-screen flex-col">
          <Header
            usuarioAutenticado={usuarioAutenticado}
            currentTheme={theme}
          />
          <CursorSwarm />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
