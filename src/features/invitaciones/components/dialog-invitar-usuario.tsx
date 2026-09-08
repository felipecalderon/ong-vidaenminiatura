"use client";

import { Mail, Plus, Send, Shield, UserCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Rol } from "@/generated/prisma/enums";
import { invitarUsuarioAction } from "../actions/invitar-usuario.action";

export function DialogInvitarUsuario() {
  const [open, setOpen] = useState(false);
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState<Rol>(Rol.AUTOR);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo.trim()) {
      toast.error("Por favor ingresa un correo electrónico.");
      return;
    }

    startTransition(async () => {
      const res = await invitarUsuarioAction({ correo, rol });

      if (res.success) {
        toast.success(res.message);
        setCorreo("");
        setRol(Rol.AUTOR);
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-extrabold uppercase text-xs tracking-wider gap-1.5 shadow-sm">
          <Plus className="size-4" />
          Invitar Usuario
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border border-outline-variant bg-card">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Mail className="size-5 text-primary" />
              Invitar Nuevo Usuario
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Se enviará un correo con un enlace criptográfico seguro para que
              el usuario pueda crear o vincular su cuenta con el rol asignado.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="correo"
                className="text-xs font-bold uppercase text-foreground"
              >
                Correo Electrónico
              </Label>
              <Input
                id="correo"
                type="email"
                placeholder="ejemplo@masinsectos.org"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={isPending}
                required
                className="border-outline-variant font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="rol"
                className="text-xs font-bold uppercase text-foreground"
              >
                Rol a Otorgar
              </Label>
              <Select
                value={rol}
                onValueChange={(val) => setRol(val as Rol)}
                disabled={isPending}
              >
                <SelectTrigger
                  id="rol"
                  className="border-outline-variant font-semibold"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-outline-variant bg-popover font-medium">
                  <SelectItem value={Rol.USUARIO}>
                    <div className="flex items-center gap-2">
                      <UserCheck className="size-4 text-muted-foreground" />
                      <span>USUARIO (Lector y firmas)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value={Rol.AUTOR}>
                    <div className="flex items-center gap-2">
                      <Shield className="size-4 text-primary" />
                      <span>AUTOR (Redacción de contenido)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value={Rol.ADMINISTRADOR}>
                    <div className="flex items-center gap-2">
                      <Shield className="size-4 text-amber-500" />
                      <span>ADMINISTRADOR (Gestión total)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="gap-2 font-bold"
            >
              {isPending ? (
                "Enviando invitación..."
              ) : (
                <>
                  <Send className="size-4" />
                  Enviar Invitación
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
