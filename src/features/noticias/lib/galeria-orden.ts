/**
 * Serialización del orden de la galería de una noticia.
 *
 * El formulario mantiene una única lista ordenada que mezcla imágenes ya
 * guardadas (URLs) con archivos nuevos (que viajan en el input de archivos).
 * Para reconstruir ese orden en el servidor se envía un arreglo JSON de tokens:
 *
 * - `e:<url>`  → una imagen ya guardada.
 * - `n:<indice>` → un archivo nuevo, según su posición en el input de archivos.
 */

import type { ItemGaleria } from "@/types/galeria";

export type ResultadoOrdenGaleria =
  | { ok: true; imagenes: string[] }
  | { ok: false; error: string };

const PREFIJO_EXISTENTE = "e:";
const PREFIJO_NUEVO = "n:";

export function crearTokenExistente(url: string): string {
  return `${PREFIJO_EXISTENTE}${url}`;
}

export function crearTokenNuevo(indice: number): string {
  return `${PREFIJO_NUEVO}${indice}`;
}

/**
 * Construye el valor que el formulario envía en `imagenesOrden`. Los archivos
 * nuevos se numeran según su posición relativa dentro de la lista.
 */
export function serializarOrdenGaleria(items: ItemGaleria[]): string {
  let indiceArchivo = 0;

  const tokens = items.map((item) => {
    if (item.file) {
      const token = crearTokenNuevo(indiceArchivo);
      indiceArchivo += 1;
      return token;
    }
    return crearTokenExistente(item.url);
  });

  return JSON.stringify(tokens);
}

/**
 * Resuelve el orden final de la galería a partir de los tokens enviados por el
 * formulario y de las URLs ya subidas a Cloudinary.
 *
 * Si no se envían tokens, se usa el orden de subida (comportamiento de la
 * creación de noticias).
 */
export function resolverOrdenGaleria(
  ordenRaw: FormDataEntryValue | null,
  urlsNuevas: string[],
): ResultadoOrdenGaleria {
  if (typeof ordenRaw !== "string" || ordenRaw.length === 0) {
    return { ok: true, imagenes: [...urlsNuevas] };
  }

  let tokens: unknown;

  try {
    tokens = JSON.parse(ordenRaw);
  } catch {
    return { ok: false, error: "El orden de la galería no es válido." };
  }

  if (!Array.isArray(tokens)) {
    return { ok: false, error: "El orden de la galería no es válido." };
  }

  const imagenes: string[] = [];
  const indicesUsados = new Set<number>();

  for (const token of tokens) {
    if (typeof token !== "string") {
      return { ok: false, error: "El orden de la galería no es válido." };
    }

    if (token.startsWith(PREFIJO_EXISTENTE)) {
      const url = token.slice(PREFIJO_EXISTENTE.length);
      if (!url) {
        return { ok: false, error: "El orden de la galería no es válido." };
      }
      imagenes.push(url);
      continue;
    }

    if (token.startsWith(PREFIJO_NUEVO)) {
      const indice = Number(token.slice(PREFIJO_NUEVO.length));
      if (!Number.isInteger(indice) || indice < 0) {
        return { ok: false, error: "El orden de la galería no es válido." };
      }

      // Un índice fuera de rango se ignora: puede ocurrir si el navegador no
      // adjuntó un archivo duplicado al input. Al final se agregan las URLs que
      // no hayan sido referenciadas.
      if (indice >= urlsNuevas.length) {
        continue;
      }

      indicesUsados.add(indice);
      imagenes.push(urlsNuevas[indice]);
      continue;
    }

    return { ok: false, error: "El orden de la galería no es válido." };
  }

  // Cualquier archivo subido que no aparezca en el orden se agrega al final,
  // para no perder imágenes.
  urlsNuevas.forEach((url, indice) => {
    if (!indicesUsados.has(indice)) {
      imagenes.push(url);
    }
  });

  return { ok: true, imagenes };
}

/**
 * Extrae los archivos enviados por el formulario, descartando entradas vacías.
 */
export function extraerArchivosGaleria(formData: FormData): File[] {
  return formData
    .getAll("imagenesArchivos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
}
