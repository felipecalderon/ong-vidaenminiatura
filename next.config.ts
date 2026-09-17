import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Las Server Actions de noticias reciben la portada y hasta 10 imágenes de
    // galería ya comprimidas en el navegador.
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.66"],
};

export default nextConfig;
