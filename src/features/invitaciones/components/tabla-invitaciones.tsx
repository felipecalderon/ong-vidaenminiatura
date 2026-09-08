"use client";

import { Check, Clock, RefreshCw, XCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EstadoInvitacion, Rol } from "@/generated/prisma/enums";
import { cancelarInvitacionAction } from "../actions/cancelar-invitacion.action";
import { reenviarInvitacionAction } from "../actions/reenviar-invitacion.action";
import type { InvitacionConDetalle } from "../types";

interface TablaInvitacionesProps {
  invitaciones: InvitacionConDetalle[];
}

export function TablaInvitaciones({ invitaciones }: TablaInvitacionesProps) {
  const [isPending, startTransition] = useTransition();

  const handleCancelar = (id: string) => {
    if (
      !confirm(
        "¿Seguro que deseas cancelar esta invitación? El enlace dejará de ser válido.",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const res = await cancelarInvitacionAction(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleReenviar = (id: string) => {
    startTransition(async () => {
      const res = await reenviarInvitacionAction(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  if (invitaciones.length === 0) {
    return (
      <div className="border border-outline-variant rounded-xl p-8 text-center bg-card">
        <Clock className="size-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm font-bold text-foreground">
          No hay invitaciones registradas
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Usa el botón &quot;Invitar Usuario&quot; para enviar tu primera
          invitación.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-outline-variant bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted border-b border-outline-variant">
          <TableRow>
            <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs">
              Correo
            </TableHead>
            <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs">
              Rol Asignado
            </TableHead>
            <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs">
              Estado
            </TableHead>
            <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs">
              Invitado Por
            </TableHead>
            <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs">
              Vigencia / Expiración
            </TableHead>
            <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs text-right">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitaciones.map((inv) => {
            const expiro = new Date(inv.expira_at) < new Date();
            const estadoEfectivo =
              inv.estado === EstadoInvitacion.PENDIENTE && expiro
                ? EstadoInvitacion.EXPIRADA
                : inv.estado;

            return (
              <TableRow
                key={inv.id}
                className="border-b border-outline-variant/10 text-xs"
              >
                <TableCell className="font-mono font-medium">
                  {inv.correo}
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={`font-black uppercase text-[10px] tracking-wider ${
                      inv.rol === Rol.ADMINISTRADOR
                        ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : inv.rol === Rol.AUTOR
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-muted-foreground/30 bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    {inv.rol}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    className={`font-extrabold text-[10px] border border-outline-variant ${
                      estadoEfectivo === EstadoInvitacion.ACEPTADA
                        ? "bg-green-300 text-black hover:bg-green-300"
                        : estadoEfectivo === EstadoInvitacion.PENDIENTE
                          ? "bg-amber-300 text-black hover:bg-amber-300"
                          : estadoEfectivo === EstadoInvitacion.CANCELADA
                            ? "bg-red-300 text-black hover:bg-red-300"
                            : "bg-zinc-300 text-black hover:bg-zinc-300"
                    }`}
                  >
                    {estadoEfectivo}
                  </Badge>
                </TableCell>

                <TableCell className="text-muted-foreground font-medium">
                  {inv.creada_por.nombre}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {inv.estado === EstadoInvitacion.ACEPTADA ? (
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                      <Check className="size-3.5" />
                      {inv.aceptada_at
                        ? new Date(inv.aceptada_at).toLocaleDateString("es-CL")
                        : "Aceptada"}
                    </span>
                  ) : (
                    new Date(inv.expira_at).toLocaleDateString("es-CL", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  )}
                </TableCell>

                <TableCell className="text-right">
                  {estadoEfectivo !== EstadoInvitacion.ACEPTADA && (
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-xs font-semibold gap-1"
                        disabled={isPending}
                        onClick={() => handleReenviar(inv.id)}
                        title="Reenviar invitación con nuevo enlace"
                      >
                        <RefreshCw className="size-3.5" />
                        Reenviar
                      </Button>

                      {estadoEfectivo !== EstadoInvitacion.CANCELADA && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-xs font-semibold text-destructive hover:text-destructive hover:bg-destructive/10 gap-1"
                          disabled={isPending}
                          onClick={() => handleCancelar(inv.id)}
                          title="Cancelar y anular invitación"
                        >
                          <XCircle className="size-3.5" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
