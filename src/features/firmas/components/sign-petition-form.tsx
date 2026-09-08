"use client";

import { Check, Info, Loader2 } from "lucide-react";
import { type FormEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { firmarPeticionAction } from "@/features/firmas/actions/firmar-peticion";

interface UsuarioSesion {
  nombre: string;
  correo: string;
}

interface SignPetitionFormProps {
  peticionId: string;
  yaFirmoOriginal: boolean;
  usuarioSesion?: UsuarioSesion | null;
}

export function SignPetitionForm({
  peticionId,
  yaFirmoOriginal,
  usuarioSesion,
}: SignPetitionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [signed, setSigned] = useState(yaFirmoOriginal);
  const [error, setError] = useState<string | null>(null);

  const [nombre, setNombre] = useState(usuarioSesion?.nombre ?? "");
  const [correo, setCorreo] = useState(usuarioSesion?.correo ?? "");

  const estaLogueado = Boolean(usuarioSesion);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const correoFinal = estaLogueado ? usuarioSesion?.correo : correo;

    if (!nombre.trim()) {
      setError("Por favor, ingresa tu nombre completo.");
      return;
    }

    if (!correoFinal && !correoFinal?.trim()) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }

    startTransition(async () => {
      const result = await firmarPeticionAction({
        peticionId,
        nombre: nombre.trim(),
        correo: correoFinal!.trim().toLowerCase(),
      });

      if (result.success) {
        setSigned(true);
      } else {
        setError(result.error || "Ocurrió un error al firmar la petición.");
      }
    });
  };

  if (signed) {
    return (
      <div className="p-6 border border-outline-variant bg-card text-center dark:">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-primary border border-outline-variant flex items-center justify-center">
          <Check className="h-8 w-8 text-white" />
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
    <div className="space-y-4 p-6 border border-outline-variant bg-card dark:">
      <div className="border-b border-outline-variant pb-2">
        <h3 className="text-xl font-bold">Firmar petición</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Súmate con tu apoyo para hacer visible esta causa ante las
          autoridades.
        </p>
      </div>

      {error && (
        <div className="p-3 border border-red-600 bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 text-sm font-semibold rounded-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="nombre" className="font-semibold text-sm">
            Nombre completo
          </Label>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej. Francisca Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={isPending}
            required
            minLength={2}
            maxLength={100}
            className="border-outline-variant"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="correo" className="font-semibold text-sm">
              Correo electrónico
            </Label>
            {estaLogueado && (
              <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                Cuenta activa
              </span>
            )}
          </div>
          <Input
            id="correo"
            name="correo"
            type="email"
            placeholder="tu@correo.com"
            value={estaLogueado ? usuarioSesion?.correo : correo}
            onChange={(e) => setCorreo(e.target.value)}
            readOnly={estaLogueado}
            disabled={isPending}
            required
            className={`border-outline-variant ${
              estaLogueado ? "bg-muted/50 cursor-not-allowed opacity-90" : ""
            }`}
          />
          {estaLogueado ? (
            <p className="text-xs text-muted-foreground">
              Tu firma se vinculará al correo de tu cuenta iniciada.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Solo se permite una firma por correo electrónico.
            </p>
          )}
        </div>

        <div className="flex items-start gap-2 p-2.5 bg-muted/30 border border-outline-variant rounded-sm text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
          <span>
            La fecha y hora de tu firma se registrarán automáticamente al
            confirmar el formulario.
          </span>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full font-bold text-lg py-6 border border-outline-variant dark: hover: dark:hover: disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
      </form>
    </div>
  );
}
