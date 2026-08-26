import type { TipoRecursoEducativo } from "@/generated/prisma/enums";

export function formatearTipo(tipo: TipoRecursoEducativo) {
  switch (tipo) {
    case "CONCEPTO":
      return "Concepto clave";
    case "GUIA":
      return "Guía de identificación";
    case "PREGUNTA":
      return "Mito o pregunta frecuente";
    case "ACCION":
      return "Cómo actuar";
    default:
      return tipo;
  }
}

export function formatearTipoFiltro(tipo: TipoRecursoEducativo) {
  switch (tipo) {
    case "CONCEPTO":
      return "Conceptos clave";
    case "GUIA":
      return "Guías de identificación";
    case "PREGUNTA":
      return "Mitos y preguntas";
    case "ACCION":
      return "Cómo actuar";
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
