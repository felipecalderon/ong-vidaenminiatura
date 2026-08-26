import { EstadoPublicacion, TipoPublicacion } from "@/generated/prisma/enums";
import type { publicacionModel } from "@/generated/prisma/models/publicacion";

export type Publicacion = publicacionModel;
export { EstadoPublicacion, TipoPublicacion };

export type PublicacionConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  imagen: string | null;
  tipo: TipoPublicacion;
  autores: string[];
  anio: number | null;
  enlace: string | null;
  lugar: string | null;
  fecha_evento: Date | null;
  estado: EstadoPublicacion;
  autor_id: string;
  fecha_publicacion: Date | null;
  destacado: boolean;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  autor: {
    id: string;
    nombre: string;
    picture: string | null;
  };
};
