/**
 * Comprime y redimensiona una imagen en el cliente (navegador) utilizando Canvas.
 * Garantiza que la imagen no supere las dimensiones máximas (por defecto 1000x1000px)
 * y ajusta la calidad de compresión JPEG para intentar mantener el archivo por debajo del límite de bytes.
 */
export async function comprimirImagenCliente(
  file: File,
  maxDimension = 1000,
  maxSizeBytes = 800 * 1024, // 800 KB
): Promise<File> {
  // Si no es una imagen, retornar el archivo original
  if (!file.type.startsWith("image/")) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Redimensionar proporcionalmente si excede maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(file); // Fallback al archivo original si falla canvas
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Función recursiva para ajustar la calidad hasta que quepa en el límite de tamaño
        let calidad = 0.85;

        const exportarBlob = (cal: number) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return resolve(file);
              }

              // Si el tamaño sigue siendo mayor al límite y la calidad es alta, bajamos la calidad
              if (blob.size > maxSizeBytes && cal > 0.3) {
                calidad -= 0.1;
                exportarBlob(calidad);
              } else {
                // Crear un nuevo File a partir del Blob
                const extension = file.name.split(".").pop() || "jpg";
                const nombreBase = file.name.substring(
                  0,
                  file.name.lastIndexOf("."),
                );
                const nuevoArchivo = new File(
                  [blob],
                  `${nombreBase}_compressed.${extension}`,
                  { type: blob.type, lastModified: Date.now() },
                );
                resolve(nuevoArchivo);
              }
            },
            "image/jpeg",
            cal,
          );
        };

        exportarBlob(calidad);
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}
