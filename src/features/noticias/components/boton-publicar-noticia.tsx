"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { publicarNoticiaAction } from "../actions/publicar-noticia";

interface BotonPublicarNoticiaProps {
  noticiaId: string;
}

export function BotonPublicarNoticia({ noticiaId }: BotonPublicarNoticiaProps) {
  const router = useRouter();
  const [publicando, setPublicando] = React.useState(false);

  const handlePublicar = async () => {
    if (
      !confirm(
        "¿Publicar esta noticia? Una vez publicada será visible para todos.",
      )
    ) {
      return;
    }

    setPublicando(true);
    const result = await publicarNoticiaAction(noticiaId);
    setPublicando(false);

    if (!result.success) {
      toast.error("No se pudo publicar la noticia", {
        description: result.error ?? "Intenta nuevamente.",
      });
      return;
    }

    toast.success("Noticia publicada", {
      description: "La noticia ya es visible para todo el público.",
    });
    router.refresh();
  };

  return (
    <Button
      onClick={handlePublicar}
      disabled={publicando}
      className="border border-outline-variant font-bold"
    >
      {publicando ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <CheckCircle className="size-4" />
      )}
      Publicar
    </Button>
  );
}
