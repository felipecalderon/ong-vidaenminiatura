import type { TipoPublicacion } from "@/generated/prisma/enums";

export function formatearTipo(tipo: TipoPublicacion) {
  switch (tipo) {
    case "ESTUDIO":
      return "Estudio";
    case "PUBLICACION":
      return "Publicación";
    case "EVENTO":
      return "Seminario, taller o evento";
    default:
      return tipo;
  }
}

export function formatearEstado(estado: string) {
  switch (estado) {
    case "BORRADOR":
      return "Borrador";
    case "REVISION":
      return "En Revisión";
    case "PUBLICADA":
      return "Publicada";
    case "ARCHIVADA":
      return "Archivada";
    default:
      return estado;
  }
}

export function formatearFecha(fecha: Date | string | null) {
  if (!fecha) return "-";

  const date = fecha instanceof Date ? fecha : new Date(fecha);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatearAutores(autores: string[]) {
  if (autores.length === 0) return null;
  if (autores.length === 1) return autores[0];
  if (autores.length === 2) return autores.join(" y ");
  return `${autores.slice(0, 2).join(", ")} y otros`;
}

export function formatearFechaInput(fecha: Date | string | null) {
  if (!fecha) return "";

  const date = fecha instanceof Date ? fecha : new Date(fecha);
  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
