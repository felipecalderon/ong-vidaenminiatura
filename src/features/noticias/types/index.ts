import { EstadoNoticia } from "@/generated/prisma/enums";
import type { noticiaModel } from "@/generated/prisma/models/noticia";

export type Noticia = noticiaModel;
export { EstadoNoticia };

export type NoticiaConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  estado: EstadoNoticia;
  resumen: string;
  contenido: string;
  imagen: string | null;
  categoria_id: string;
  autor_id: string;
  fecha_publicacion: Date | null;
  destacado: boolean;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  categoria: {
    id: string;
    nombre: string;
    slug: string;
    descripcion: string | null;
    color: string | null;
    activo: boolean;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
  };
  autor: {
    id: string;
    nombre: string;
    picture: string | null;
  };
};
