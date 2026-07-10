import type { EstadoNoticia } from "@/generated/prisma/enums";
import type { noticiaModel } from "@/generated/prisma/models/noticia";

export type Noticia = noticiaModel;
export type { EstadoNoticia };

export type NoticiaConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  estado: EstadoNoticia;
  resumen: string;
  contenido: string;
  imagen: string | null;
  categoria_id: string;
  fecha_publicacion: string | null;
  categoria: {
    nombre: string;
    color: string | null;
  } | null;
  autor?: {
    id: string;
    nombre: string;
  } | null;
};
