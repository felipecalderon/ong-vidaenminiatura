"use client";

import { Badge } from "@/components/ui/badge";
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-tight">
          Gestión de Usuarios
        </h2>
      </div>

      <div className="border border-outline-variant bg-card dark:">
        <Table>
          <TableHeader className="bg-muted border-b border-outline-variant">
            <TableRow>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Usuario
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Correo
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Rol
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase">
                Estado
              </TableHead>
              <TableHead className="font-extrabold text-black dark:text-white uppercase text-right">
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
                  className="border-b border-outline-variant/10"
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
                      onValueChange={(val) => handleRoleChange(user.id, val)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`border border-outline-variant font-extrabold ${
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
                      onValueChange={(val) => handleStatusChange(user.id, val)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
