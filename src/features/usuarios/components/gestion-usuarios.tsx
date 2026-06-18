"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EstadoUsuario, Rol } from "@/generated/prisma/enums";
import { useGestionUsuarios } from "../hooks/use-gestion-usuarios";
import type {
  Usuario,
  UsuarioAutenticadoResumen,
} from "../types";

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
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="size-8 border border-outline-variant dark:">
                      <AvatarImage src={user.picture ?? undefined} />
                      <AvatarFallback className="font-extrabold">
                        {user.nombre.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-foreground">
                        {user.nombre}
                        {" "}
                        {esPropio && (
                          <span className="text-xs text-primary font-extrabold">
                            (Tú)
                          </span>
                        )}
                      </p>
                      {user.nickname && (
                        <p className="text-xs text-muted-foreground">
                          @{user.nickname}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {user.correo}
                  </TableCell>
                  <TableCell>
                    <Select
                      disabled={esPropio || isPending}
                      value={user.rol}
                      onValueChange={(val) =>
                        handleRoleChange(user.id, val as Rol)
                      }
                    >
                      <SelectTrigger className="w-40 border border-outline-variant font-semibold bg-background dark:">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border border-outline-variant bg-popover font-semibold">
                        <SelectItem value={Rol.USUARIO}>USUARIO</SelectItem>
                        <SelectItem value={Rol.AUTOR}>AUTOR</SelectItem>
                        <SelectItem value={Rol.ADMINISTRADOR}>
                          ADMINISTRADOR
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      disabled={esPropio || isPending}
                      value={user.estado}
                      onValueChange={(val) =>
                        handleStatusChange(user.id, val as EstadoUsuario)
                      }
                    >
                      <SelectTrigger className="w-35 ml-auto border border-outline-variant font-semibold bg-background dark:">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border border-outline-variant bg-popover font-semibold">
                        <SelectItem value={EstadoUsuario.ACTIVO}>
                          ACTIVO
                        </SelectItem>
                        <SelectItem value={EstadoUsuario.SUSPENDIDO}>
                          SUSPENDIDO
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
