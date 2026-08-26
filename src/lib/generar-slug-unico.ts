import { prisma } from "@/lib/prisma";
import { slugify } from "./slugify";

export async function generarSlugUnico(
  titulo: string,
  modelName:
    | "peticion"
    | "noticia"
    | "publicacion"
    | "recursoEducativo" = "peticion",
): Promise<string> {
  const slugOriginal = slugify(titulo);
  let slug = slugOriginal;
  let iterador = 1;

  while (true) {
    let existe = false;
    if (modelName === "publicacion") {
      const p = await prisma.publicacion.findUnique({ where: { slug } });
      existe = !!p;
    } else if (modelName === "recursoEducativo") {
      const r = await prisma.recursoEducativo.findUnique({ where: { slug } });
      existe = !!r;
    } else if (modelName === "peticion") {
      const p = await prisma.peticion.findUnique({ where: { slug } });
      existe = !!p;
    } else {
      const n = await prisma.noticia.findUnique({ where: { slug } });
      existe = !!n;
    }

    if (!existe) {
      return slug;
    }

    slug = `${slugOriginal}-${iterador}`;
    iterador++;
  }
}
