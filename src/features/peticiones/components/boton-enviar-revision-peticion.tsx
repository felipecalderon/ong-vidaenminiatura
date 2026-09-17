"use client";

import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { actualizarEstadoPeticionAction } from "../actions/actualizar-estado-peticion";

interface BotonEnviarRevisionPeticionProps {
  peticionId: string;
}

export function BotonEnviarRevisionPeticion({
  peticionId,
}: BotonEnviarRevisionPeticionProps) {
  const router = useRouter();
  const [enviando, setEnviando] = React.useState(false);

  const handleEnviar = async () => {
    if (
      !confirm(
        "¿Enviar esta petición a revisión? Un administrador deberá aprobarla para publicarla.",
      )
    ) {
      return;
    }

    setEnviando(true);
    const result = await actualizarEstadoPeticionAction(
      peticionId,
      EstadoPeticion.REVISION,
    );
    setEnviando(false);

    if (!result.success) {
      toast.error("No se pudo enviar la petición a revisión", {
        description: result.error ?? "Intenta nuevamente.",
      });
      return;
    }

    toast.success("Petición enviada a revisión", {
      description: "Un administrador la revisará para publicarla.",
    });
    router.refresh();
  };

  return (
    <Button
      onClick={handleEnviar}
      disabled={enviando}
      variant="outline"
      className="border border-outline-variant font-bold"
    >
      {enviando ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Send className="size-4" />
      )}
      Enviar a revisión
    </Button>
  );
}
