"use client";

import { Facebook } from "../ui/facebook-icon";

interface BotonCompartirFacebookProps {
  slug: string;
  tipo: "peticion" | "noticia";
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
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.APP_BASE_URL || "https://vidaenminiatura.org";
    const path =
      tipo === "peticion" ? `/peticiones/${slug}` : `/noticias/${slug}`;
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
      className="w-10 h-10 cursor-pointer"
      title="compartir en Facebook"
    >
      <Facebook />
    </button>
  );
}
