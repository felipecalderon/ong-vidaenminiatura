import { comprimirImagenCliente } from "./image-compress";

/** Cantidad máxima de imágenes que admite la galería de una noticia. */
export const MAX_IMAGENES_GALERIA = 10;

/** Tamaño máximo permitido por archivo, antes de comprimir. */
export const TAMANO_MAXIMO_IMAGEN_BYTES = 5 * 1024 * 1024;

/** Presupuesto de compresión por imagen: 1000px de lado mayor como máximo. */
export const TAMANO_OBJETIVO_IMAGEN_BYTES = 400 * 1024;

/**
 * Tope del envío completo (portada + galería) para avisar antes de que Next
 * rechace el request. Debe quedar por debajo de `serverActions.bodySizeLimit`.
 */
export const TAMANO_MAXIMO_ENVIO_BYTES = 7 * 1024 * 1024;

/** Formatos aceptados por los cargadores de imagen. */
export const FORMATOS_IMAGEN_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
] as const;

export type ResultadoPrepararImagen =
  | { ok: true; file: File }
  | { ok: false; mensaje: string };

/**
 * Valida un archivo de imagen y lo comprime en el navegador (máximo 1000px,
 * salida JPEG). Si la compresión falla, devuelve el archivo original.
 */
export async function prepararImagenParaSubir(
  file: File,
): Promise<ResultadoPrepararImagen> {
  const validacion = validarArchivoImagen(file);

  if (validacion) {
    return { ok: false, mensaje: validacion };
  }

  try {
    const comprimido = await comprimirImagenCliente(
      file,
      1000,
      TAMANO_OBJETIVO_IMAGEN_BYTES,
    );
    return { ok: true, file: comprimido };
  } catch {
    return { ok: true, file };
  }
}

/** Formatea un peso en bytes para mostrarlo en la interfaz. */
export function formatearPeso(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Suma el peso de los archivos indicados, ignorando los que no existen. */
export function sumarPesoArchivos(
  archivos: (File | null | undefined)[],
): number {
  return archivos.reduce<number>(
    (total, archivo) => total + (archivo?.size ?? 0),
    0,
  );
}

/**
 * Valida formato y tamaño de un archivo de imagen. Devuelve el mensaje de error
 * o `null` si el archivo es válido. Se reutiliza en el servidor para no confiar
 * sólo en la validación del cliente.
 */
export function validarArchivoImagen(file: File): string | null {
  if (
    !FORMATOS_IMAGEN_PERMITIDOS.includes(
      file.type as (typeof FORMATOS_IMAGEN_PERMITIDOS)[number],
    )
  ) {
    return "Formato de imagen no permitido. Usa JPG, PNG, WEBP, GIF o SVG.";
  }

  if (file.size === 0) {
    return "Una de las imágenes está vacía o no se pudo leer.";
  }

  if (file.size > TAMANO_MAXIMO_IMAGEN_BYTES) {
    return "La imagen es demasiado grande. El límite máximo es de 5MB.";
  }

  return null;
}

/**
 * Valida en el servidor el conjunto de archivos recibidos por una Server
 * Action. Devuelve el mensaje de error o `null` si el conjunto es válido.
 */
export function validarArchivosImagenServidor(
  files: File[],
  maximo = MAX_IMAGENES_GALERIA,
): string | null {
  if (files.length > maximo) {
    return `Puedes subir hasta ${maximo} imágenes por noticia.`;
  }

  for (const file of files) {
    const error = validarArchivoImagen(file);
    if (error) return error;
  }

  return null;
}
