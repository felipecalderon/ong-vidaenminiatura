import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";

export function obtenerIniciales(nombre: string): string {
  return nombre
    .split("")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .join("");
}

export function formatearRol(rol: UsuarioAutenticadoResumen["rol"]): string {
  switch (rol) {
    case "ADMINISTRADOR":
      return "Administrador";
    case "AUTOR":
      return "Autor";
    default:
      return "Usuario";
  }
}

export function formatearEstado(
  estado: UsuarioAutenticadoResumen["estado"],
): string {
  return estado === "SUSPENDIDO" ? "Suspendida" : "Activa";
}
