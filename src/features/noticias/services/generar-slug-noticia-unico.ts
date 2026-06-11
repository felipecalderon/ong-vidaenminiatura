import { prisma } from "@/lib/prisma";
import { slugifyNoticia } from "./slugify-noticia";

export async function generarSlugNoticiaUnico(titulo: string): Promise<string> {
  const slugOriginal = slugifyNoticia(titulo);
  let slug = slugOriginal;
  let iterador = 1;

  while (true) {
    const existe = await prisma.noticia.findUnique({ where: { slug } });
    if (!existe) {
      return slug;
    }
    slug = `${slugOriginal}-${iterador}`;
    iterador++;
  }
}
