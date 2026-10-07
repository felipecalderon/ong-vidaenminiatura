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
        <Clock
          className="mx-auto mb-3 size-8 text-muted-foreground"
          aria-hidden="true"
        />
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
    <div className="overflow-hidden rounded-xl border border-outline-variant bg-card">
      <Table className="min-w-[900px]">
        <TableHeader className="bg-surface-container/70">
          <TableRow>
            <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
              Correo
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
              Rol Asignado
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
              Estado
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
              Invitado Por
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
              Vigencia / Expiración
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground text-right">
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
                className="border-b border-outline-variant/70 text-xs"
              >
                <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
                  {inv.correo}
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={`font-black uppercase text-[10px] tracking-wider ${
                      inv.rol === Rol.ADMINISTRADOR
                        ? "border-amber-700/20 bg-amber-500/10 text-amber-900 dark:text-amber-300"
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
                    className={`border px-2.5 py-1 text-[11px] font-semibold ${
                      estadoEfectivo === EstadoInvitacion.ACEPTADA
                        ? "border-emerald-700/20 bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/10 dark:text-emerald-300"
                        : estadoEfectivo === EstadoInvitacion.PENDIENTE
                          ? "border-amber-700/20 bg-amber-500/10 text-amber-900 hover:bg-amber-500/10 dark:text-amber-300"
                          : estadoEfectivo === EstadoInvitacion.CANCELADA
                            ? "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/10"
                            : "border-outline-variant bg-surface-container text-muted-foreground hover:bg-surface-container"
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
                    <span className="flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-300">
                      <Check className="size-3.5" aria-hidden="true" />
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
