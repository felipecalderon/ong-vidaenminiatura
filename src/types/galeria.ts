/**
 * Imagen dentro del cargador de galería de un formulario.
 *
 * `file` sólo está presente en las imágenes recién agregadas por el usuario:
 * las que ya están guardadas viajan únicamente con su `url`.
 */
export type ItemGaleria = {
  id: string;
  url: string;
  file?: File;
};
