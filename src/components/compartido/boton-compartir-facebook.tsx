"use client";

import { cn } from "@/lib/utils";
import { Facebook } from "../ui/facebook-icon";

interface BotonCompartirFacebookProps {
  slug: string;
  tipo: "peticion" | "noticia" | "publicacion" | "recurso";
  className?: string;
}

export function BotonCompartirFacebook({
  slug,
  tipo,
  className = "",
}: BotonCompartirFacebookProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();

    // Determinar URL de forma dinámica
    const origin =
      process.env.NEXT_PUBLIC_BASE_URL || "https://masinsectos.vercel.app";
    const pathMap = {
      peticion: `/peticiones/${slug}`,
      noticia: `/noticias/${slug}`,
      publicacion: `/investigacion/${slug}`,
      recurso: slug ? `/aprende/${slug}` : "/aprende",
    } as const;
    const path = pathMap[tipo];
    const shareUrl = `${origin}${path}`;

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    // Especificaciones del popup centrado en pantalla
    const width = 600;
    const height = 450;

    let left = 0;
    let top = 0;

    if (typeof window !== "undefined") {
      left = window.screen.width / 2 - width / 2;
      top = window.screen.height / 2 - height / 2;
    }

    window.open(
      facebookShareUrl,
      "facebook-share-dialog",
      `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,resizable=yes,scrollbars=yes`,
    );
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn("w-10 h-10 cursor-pointer", className)}
      title="compartir en Facebook"
    >
      <Facebook />
    </button>
  );
}
