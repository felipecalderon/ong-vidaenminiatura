"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Facebook } from "../ui/facebook-icon";

interface BotonCompartirFacebookProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  slug: string;
  tipo: "peticion" | "noticia" | "publicacion" | "recurso";
  asChild?: boolean;
}

export function BotonCompartirFacebook({
  slug,
  tipo,
  asChild = false,
  children,
  className,
  ...props
}: BotonCompartirFacebookProps) {
  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();

    const origin =
      process.env.NEXT_PUBLIC_BASE_URL || "https://masinsectos.org";
    const pathMap = {
      peticion: `/peticiones/${slug}`,
      noticia: `/noticias/${slug}`,
      publicacion: `/investigacion/${slug}`,
      recurso: slug ? `/aprende/${slug}` : "/aprende",
    } as const;

    const path = pathMap[tipo];
    const shareUrl = `${origin}${path}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

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

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type="button"
      onClick={handleShare}
      className={cn(!asChild && "w-10 h-10 cursor-pointer", className)}
      title="Compartir en Facebook"
      {...props}
    >
      {children ?? <Facebook />}
    </Comp>
  );
}
