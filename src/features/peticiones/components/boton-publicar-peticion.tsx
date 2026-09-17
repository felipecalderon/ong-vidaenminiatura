"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { publicarPeticionAction } from "../actions/publicar-peticion";

interface BotonPublicarPeticionProps {
  peticionId: string;
}

export function BotonPublicarPeticion({
  peticionId,
}: BotonPublicarPeticionProps) {
  const router = useRouter();
  const [publicando, setPublicando] = React.useState(false);

  const handlePublicar = async () => {
    if (
      !confirm(
        "¿Publicar esta petición? Una vez publicada será visible para todos y podrá recibir firmas.",
      )
    ) {
      return;
    }

    setPublicando(true);
    const result = await publicarPeticionAction(peticionId);
    setPublicando(false);

    if (!result.success) {
      toast.error("No se pudo publicar la petición", {
        description: result.error ?? "Intenta nuevamente.",
      });
      return;
    }

    toast.success("Petición publicada", {
      description: "La petición ya es visible para todo el público.",
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
