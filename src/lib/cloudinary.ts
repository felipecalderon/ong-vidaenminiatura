import { v2 as cloudinary } from "cloudinary";
import {
  cloudinary_api_key as api_key,
  cloudinary_api_secret as api_secret,
  cloudinary_cloud_name as cloud_name,
} from "./envs";

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export async function subirImagenACloudinary(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "insectos-vivos" }, (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Error al subir a Cloudinary"));
        }
        resolve(result.secure_url);
      })
      .end(buffer);
  });
}
export async function subirImagenSiExiste(
  file: File | null | undefined,
): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;
  return subirImagenACloudinary(file);
}

export { cloudinary };
