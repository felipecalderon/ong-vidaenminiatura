"use client";

import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { firmarPeticionAction } from "@/features/firmas/actions";

interface SignPetitionFormProps {
  peticionId: string;
  usuarioAutenticado: boolean;
  yaFirmoOriginal: boolean;
}

export function SignPetitionForm({
  peticionId,
  usuarioAutenticado,
  yaFirmoOriginal,
}: SignPetitionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [signed, setSigned] = useState(yaFirmoOriginal);
  const [error, setError] = useState<string | null>(null);

  const handleSign = () => {
    setError(null);
    startTransition(async () => {
      const result = await firmarPeticionAction(peticionId);
      if (result.success) {
        setSigned(true);
      } else {
        setError(result.error || "Ocurrió un error al firmar la petición.");
      }
    });
  };

  if (!usuarioAutenticado) {
    return (
      <div className="p-6 border-4 border-black dark:border-white bg-muted text-center space-y-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <h3 className="text-xl font-bold">Únete y firma esta causa</h3>
        <p className="text-sm text-muted-foreground">
          Necesitas iniciar sesión con tu cuenta para poder firmar esta petición
          y ayudarnos a proteger la biodiversidad.
        </p>
        <Button
          asChild
          size="lg"
          className="w-full font-bold text-lg py-6 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all"
        >
          <Link href="/auth/login">Iniciar sesión</Link>
        </Button>
      </div>
    );
  }

  if (signed) {
    return (
      <div className="p-6 border-4 border-black dark:border-white bg-secondary text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary border-2 border-black dark:border-white flex items-center justify-center">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">¡Gracias por firmar!</h3>
        <p className="text-muted-foreground">
          Tu firma ha sido registrada de forma segura. Comparte esta petición
          para aumentar su impacto.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6 border-4 border-black dark:border-white bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
      <h3 className="text-xl font-bold border-b-2 border-black dark:border-white pb-2">
        Firmar petición
      </h3>
      <p className="text-sm text-muted-foreground">
        Al hacer clic en el botón de abajo, registrarás tu apoyo con tu perfil
        verificado.
      </p>

      {error && (
        <div className="p-3 border-2 border-red-600 bg-red-100 text-red-800 text-sm font-semibold">
          {error}
        </div>
      )}

      <Button
        onClick={handleSign}
        disabled={isPending}
        className="w-full font-bold text-lg py-6 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Registrando firma...
          </>
        ) : (
          "Firmar esta petición"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Tu firma se asociará públicamente a tu cuenta de usuario.
      </p>
    </div>
  );
}
