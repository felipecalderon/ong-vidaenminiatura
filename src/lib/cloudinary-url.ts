const SEGMENTO_UPLOAD = "/upload/";
const HOST_CLOUDINARY = "/res.cloudinary.com/";

/**
 * Construye una URL de Cloudinary con transformaciones de entrega para usar
 * como miniatura. Es una función pura, segura para componentes cliente: el
 * módulo `lib/cloudinary.ts` importa el SDK y no debe llegar al navegador.
 *
 * Si la URL no proviene de Cloudinary o ya trae transformaciones, se devuelve
 * sin cambios.
 */
export function urlMiniaturaCloudinary(url: string, ancho = 800): string {
  const indice = url.indexOf(SEGMENTO_UPLOAD);

  if (indice === -1 || !url.includes(HOST_CLOUDINARY)) {
    return url;
  }

  const corte = indice + SEGMENTO_UPLOAD.length;
  const resto = url.slice(corte);
  const primerSegmento = resto.split("/")[0] ?? "";

  // Una transformación existente (por ejemplo `w_800,c_limit`) ya contiene `_`.
  if (primerSegmento.includes("_")) {
    return url;
  }

  return `${url.slice(0, corte)}w_${ancho},c_limit,q_auto,f_auto/${resto}`;
}
