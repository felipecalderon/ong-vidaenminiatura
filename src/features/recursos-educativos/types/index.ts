import {
  EstadoRecursoEducativo,
  TipoRecursoEducativo,
} from "@/generated/prisma/enums";
import type { recursoEducativoModel } from "@/generated/prisma/models/recursoEducativo";

export type RecursoEducativo = recursoEducativoModel;
export { EstadoRecursoEducativo, TipoRecursoEducativo };

export type RecursoEducativoConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  imagen: string | null;
  tipo: TipoRecursoEducativo;
  categoria_id: string | null;
  estado: EstadoRecursoEducativo;
  autor_id: string;
  fecha_publicacion: Date | null;
  destacado: boolean;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  categoria: {
    id: string;
    nombre: string;
    slug: string;
    color: string | null;
  } | null;
  autor: {
    id: string;
    nombre: string;
    picture: string | null;
  };
};
