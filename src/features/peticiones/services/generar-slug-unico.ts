import { prisma } from "@/lib/prisma";
import { slugify } from "./slugify";

export async function generarSlugUnico(
  titulo: string,
  modelName: "peticion" | "noticia" = "peticion",
): Promise<string> {
  const slugOriginal = slugify(titulo);
  let slug = slugOriginal;
  let iterador = 1;

  while (true) {
    let existe = false;
    if (modelName === "peticion") {
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
