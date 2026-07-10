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
