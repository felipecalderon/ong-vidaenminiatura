import type { EstadoNoticia } from "@/generated/prisma/enums";
import type { noticiaModel } from "@/generated/prisma/models/noticia";

export type Noticia = noticiaModel;
export type { EstadoNoticia };
