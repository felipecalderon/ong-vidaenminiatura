import type { EstadoPeticion } from "@/generated/prisma/enums";
import type { peticionModel } from "@/generated/prisma/models/peticion";

export type Peticion = peticionModel;
export type { EstadoPeticion };

export type PeticionConRelaciones = {
  id: string;
  titulo: string;
  slug: string;
  estado: EstadoPeticion;
  resumen: string;
  contenido: string;
  imagen: string | null;
  categoriaId?: string;
  meta_firmas: number;
  cantidad_firmas: number;
  destacado: boolean;
  categoria: {
    nombre: string;
    color: string | null;
  } | null;
  usuario?: {
    id: string;
    nombre: string;
  } | null;
};
