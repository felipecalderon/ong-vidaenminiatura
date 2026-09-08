"use client";

import { Mail, Users } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogInvitarUsuario } from "@/features/invitaciones/components/dialog-invitar-usuario";
import { TablaInvitaciones } from "@/features/invitaciones/components/tabla-invitaciones";
import type { InvitacionConDetalle } from "@/features/invitaciones/types";
import { EstadoUsuario } from "@/generated/prisma/enums";
import { useGestionUsuarios } from "../hooks/use-gestion-usuarios";
import type { Usuario, UsuarioAutenticadoResumen } from "../types";
import { EstadoUsuarioSelector } from "./usuarios-table/estado-usuario-selector";
import { RolSelector } from "./usuarios-table/rol-selector";
import { UsuarioAvatarCell } from "./usuarios-table/usuario-avatar-cell";

interface GestionUsuariosProps {
  initialUsuarios: Usuario[];
  initialInvitaciones?: InvitacionConDetalle[];
  currentUser: UsuarioAutenticadoResumen;
}

export function GestionUsuarios({
  initialUsuarios,
  initialInvitaciones = [],
  currentUser,
}: GestionUsuariosProps) {
  const { usuarios, isPending, handleRoleChange, handleStatusChange } =
    useGestionUsuarios(initialUsuarios, currentUser);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Gestión de Usuarios"
        description="Administra los roles y estados de los usuarios y envía invitaciones oficiales."
      >
        <DialogInvitarUsuario />
      </AdminHeader>

      <Tabs defaultValue="activos" className="w-full">
        <TabsList className="mb-4 grid w-full max-w-md grid-cols-2 rounded-xl border border-outline-variant bg-surface-container p-1">
          <TabsTrigger
            value="activos"
            className="flex items-center gap-2 rounded-lg py-2 text-xs font-bold uppercase transition-all data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            <Users className="size-3.5" />
            <span>Registrados ({usuarios.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="invitaciones"
            className="flex items-center gap-2 rounded-lg py-2 text-xs font-bold uppercase transition-all data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            <Mail className="size-3.5" />
            <span>Invitaciones ({initialInvitaciones.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activos" className="space-y-4">
          <div className="border border-outline-variant bg-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted border-b border-outline-variant">
                <TableRow>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs">
                    Usuario
                  </TableHead>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs">
                    Correo
                  </TableHead>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs">
                    Rol
                  </TableHead>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs">
                    Estado
                  </TableHead>
                  <TableHead className="font-extrabold text-black dark:text-white uppercase text-xs text-right">
                    Acciones de Estado
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((user) => {
                  const esPropio = user.id === currentUser.id;
                  return (
                    <TableRow
                      key={user.id}
                      className="border-b border-outline-variant/10 text-xs"
                    >
                      <TableCell>
                        <UsuarioAvatarCell
                          nombre={user.nombre}
                          picture={user.picture}
                          nickname={user.nickname}
                          esPropio={esPropio}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {user.correo}
                      </TableCell>
                      <TableCell>
                        <RolSelector
                          value={user.rol}
                          disabled={esPropio || isPending}
                          onValueChange={(val) =>
                            handleRoleChange(user.id, val)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`border border-outline-variant font-extrabold text-[10px] ${
                            user.estado === EstadoUsuario.ACTIVO
                              ? "bg-green-300 text-black hover:bg-green-300"
                              : "bg-red-300 text-black hover:bg-red-300"
                          }`}
                        >
                          {user.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
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
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="invitaciones" className="space-y-4">
          <TablaInvitaciones invitaciones={initialInvitaciones} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
