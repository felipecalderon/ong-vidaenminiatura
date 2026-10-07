"use client";

import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
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
import { EstadoUsuario } from "@/generated/prisma/enums";
import { useGestionUsuarios } from "../hooks/use-gestion-usuarios";
import type { Usuario, UsuarioAutenticadoResumen } from "../types";
import { EstadoUsuarioSelector } from "./usuarios-table/estado-usuario-selector";
import { RolSelector } from "./usuarios-table/rol-selector";
import { UsuarioAvatarCell } from "./usuarios-table/usuario-avatar-cell";

interface GestionUsuariosProps {
  initialUsuarios: Usuario[];
  currentUser: UsuarioAutenticadoResumen;
}

export function GestionUsuarios({
  initialUsuarios,
  currentUser,
}: GestionUsuariosProps) {
  const { usuarios, isPending, handleRoleChange, handleStatusChange } =
    useGestionUsuarios(initialUsuarios, currentUser);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Usuarios"
        description="Administra los roles y el estado de las cuentas registradas."
      >
        <Button asChild variant="outline">
          <Link href="/administracion/invitaciones">
            Gestionar invitaciones
          </Link>
        </Button>
      </AdminHeader>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-card">
        <Table className="min-w-[760px]">
          <TableHeader className="bg-surface-container/70">
            <TableRow>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Usuario
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Correo
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Rol
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground">
                Estado
              </TableHead>
              <TableHead className="h-11 px-4 text-right text-xs font-semibold tracking-wide text-muted-foreground">
                Acciones de estado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-36 px-4 text-center">
                  <p className="font-semibold text-foreground">
                    No hay usuarios registrados todavía.
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Las cuentas aparecerán aquí cuando se registren en la
                    plataforma.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((user) => {
                const esPropio = user.id === currentUser.id;
                const estaActivo = user.estado === EstadoUsuario.ACTIVO;

                return (
                  <TableRow
                    key={user.id}
                    className="border-b border-outline-variant/70"
                  >
                    <TableCell className="px-4 py-3">
                      <UsuarioAvatarCell
                        nombre={user.nombre}
                        picture={user.picture}
                        nickname={user.nickname}
                        esPropio={esPropio}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-foreground">
                      {user.correo}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <RolSelector
                        value={user.rol}
                        disabled={esPropio || isPending}
                        onValueChange={(val) => handleRoleChange(user.id, val)}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          estaActivo
                            ? "border-emerald-700/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                            : "border-destructive/20 bg-destructive/10 text-destructive"
                        }
                      >
                        {estaActivo ? "Activo" : "Suspendido"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <EstadoUsuarioSelector
                        value={user.estado}
                        disabled={esPropio || isPending}
                        onValueChange={(val) =>
                          handleStatusChange(user.id, val)
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
