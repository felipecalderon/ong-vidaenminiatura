"use client";

import { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface SignPetitionFormProps {
  peticionId: string;
  peticionTitulo: string;
}

export function SignPetitionForm({ peticionId, peticionTitulo }: SignPetitionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [signed, setSigned] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSigned(true);
    });
  };

  if (signed) {
    return (
      <div className="p-6 border-4 border-black dark:border-white bg-secondary text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary border-2 border-black dark:border-white flex items-center justify-center">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">¡Gracias por firmar!</h3>
        <p className="text-muted-foreground">
          Tu firma ha sido registrada. Comparte esta petición para aumentar su impacto.
        </p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <Button
        size="lg"
        onClick={() => setShowForm(true)}
        className="w-full font-bold text-lg py-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
      >
        Firmar esta petición
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border-4 border-black dark:border-white bg-card">
      <h3 className="text-xl font-bold border-b-2 border-black dark:border-white pb-2">
        Firmar petición
      </h3>
      
      <div className="space-y-2">
        <Label htmlFor="nombre" className="font-semibold">
          Nombre completo *
        </Label>
        <Input
          id="nombre"
          name="nombre"
          required
          placeholder="Tu nombre"
          className="border-2 border-black dark:border-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="font-semibold">
          Correo electrónico *
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          className="border-2 border-black dark:border-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="comentario" className="font-semibold">
          Comentario (opcional)
        </Label>
        <Input
          id="comentario"
          name="comentario"
          placeholder="¿Por qué firmas esta petición?"
          className="border-2 border-black dark:border-white"
        />
      </div>
      
      <div className="flex items-start gap-3">
        <Checkbox 
          id="publico" 
          name="publico"
          className="border-2 border-black dark:border-white mt-1"
        />
        <Label htmlFor="publico" className="text-sm text-muted-foreground cursor-pointer">
          Mostrar mi nombre públicamente en la lista de firmantes
        </Label>
      </div>
      
      <div className="flex items-start gap-3">
        <Checkbox 
          id="newsletter" 
          name="newsletter"
          defaultChecked
          className="border-2 border-black dark:border-white mt-1"
        />
        <Label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
          Recibir actualizaciones sobre esta petición y otras causas similares
        </Label>
      </div>
      
      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full font-bold text-lg py-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Firmando...
          </>
        ) : (
          "Confirmar firma"
        )}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        Al firmar, aceptas nuestros términos de servicio y política de privacidad.
      </p>
    </form>
  );
}
