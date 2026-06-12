"use client";

import { Camera, Check, Loader2, User2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { comprimirImagenCliente } from "@/lib/image-compress";
import {
  actualizarPerfilAction,
  type PerfilActionState,
} from "../actions/actualizar-perfil";

interface EditarPerfilFormProps {
  usuario: {
    nombre: string;
    picture: string | null;
    correo: string;
  };
}

const initialState: PerfilActionState = {
  success: false,
};

export function EditarPerfilForm({ usuario }: EditarPerfilFormProps) {
  const [state, formAction, isPending] = useActionState(
    actualizarPerfilAction,
    initialState,
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(usuario.picture);
  const [nameVal, setNameVal] = useState(usuario.nombre);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [comprimiendo, setComprimiendo] = useState(false);

  useEffect(() => {
    if (state.success) {
      setSuccessMsg("¡Tu información ha sido actualizada con éxito!");
      const timer = setTimeout(() => setSuccessMsg(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setComprimiendo(true);
      try {
        const compressedFile = await comprimirImagenCliente(file);

        // Reemplazar el archivo seleccionado por la versión comprimida
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(compressedFile);
        e.target.files = dataTransfer.files;

        const url = URL.createObjectURL(compressedFile);
        setPreviewUrl(url);
      } catch (err) {
        console.error("Error al comprimir la imagen:", err);
      } finally {
        setComprimiendo(false);
      }
    }
  };

  const getFieldError = (field: "nombre") => {
    return state.fieldErrors?.[field]?.[0];
  };

  return (
    <form action={formAction} className="space-y-8 max-w-xl mx-auto">
      <input
        type="hidden"
        name="imagenExistente"
        value={usuario.picture || ""}
      />

      {state.error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-sm font-semibold">
          {state.error}
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2">
          <Check className="size-4" />
          {successMsg}
        </div>
      )}

      {/* Profile Picture Upload Section */}
      <div className="flex flex-col items-center gap-4 py-4 sm:flex-row sm:items-center">
        <div className="relative group">
          <Avatar className="size-24 border-2 border-outline-variant/50 shadow-md">
            <AvatarImage alt={nameVal} src={previewUrl ?? undefined} />
            <AvatarFallback className="bg-primary text-on-primary text-3xl font-bold">
              {nameVal.slice(0, 2).toUpperCase() || (
                <User2 className="size-10" />
              )}
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="imagen"
            className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full border border-background shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <Camera className="size-4" />
            <input
              id="imagen"
              name="imagen"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h3 className="font-bold text-lg">Foto de perfil</h3>
          <p className="text-sm text-muted-foreground">
            {comprimiendo ? (
              <span className="text-primary font-medium flex items-center gap-1.5 justify-center sm:justify-start">
                <Loader2 className="size-3.5 animate-spin" />
                Comprimiendo y ajustando imagen...
              </span>
            ) : (
              "Haz clic en el icono de cámara para subir una nueva imagen."
            )}
          </p>
        </div>
      </div>

      {/* Email (Readonly representation of Auth0 verified account) */}
      <div className="space-y-2">
        <Label
          htmlFor="correo"
          className="text-sm font-bold text-muted-foreground"
        >
          Correo electrónico (No modificable)
        </Label>
        <Input
          id="correo"
          type="email"
          value={usuario.correo}
          disabled
          className="border border-outline-variant/60 bg-muted/50 cursor-not-allowed py-6 text-base"
        />
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="nombre" className="text-base font-bold">
          Nombre completo *
        </Label>
        <Input
          id="nombre"
          name="nombre"
          value={nameVal}
          onChange={(e) => setNameVal(e.target.value)}
          required
          placeholder="Ej. Juan Pérez"
          className="border border-outline-variant py-6 text-base"
        />
        {getFieldError("nombre") && (
          <p className="text-destructive text-sm font-semibold mt-1">
            {getFieldError("nombre")}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isPending || comprimiendo}
          className="w-full sm:w-auto px-8 py-6 text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {isPending ? (
            <>
              <Loader2 className="size-5 animate-spin mr-2" />
              Guardando cambios...
            </>
          ) : comprimiendo ? (
            <>
              <Loader2 className="size-5 animate-spin mr-2" />
              Procesando imagen...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>
    </form>
  );
}
