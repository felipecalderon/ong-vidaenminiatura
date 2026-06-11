import type { Metadata } from "next";
import { NoticiaCard } from "@/features/noticias/components/noticia-card";
import { obtenerListaNoticiasPublicadas } from "@/features/noticias/queries/obtener-lista-noticias-publicadas";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Mantente informado sobre conservación de insectos y arácnidos. Artículos y novedades de la Fundación InsectosVivos.",
};

export default async function NoticiasPage() {
  const noticias = await obtenerListaNoticiasPublicadas();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4 mb-12">
        <div className="inline-block bg-primary text-on-primary px-4 py-2 border border-outline-variant dark: font-bold">
          📰 Últimas Noticias
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Actualidad en conservación
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Artículos, victorias y descubrimientos sobre el mundo de los insectos
          y arácnidos que merecen ser conocidos.
        </p>
      </div>

      {noticias.length === 0 ? (
        <div className="p-12 text-center border border-outline-variant bg-muted">
          <p className="text-xl font-semibold">
            No hay noticias publicadas todavía.
          </p>
          <p className="text-muted-foreground mt-2">
            ¡Vuelve pronto para estar informado!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.map((noticia) => (
            <NoticiaCard
              key={noticia.id}
              noticia={{
                ...noticia,
                categoria: noticia.categoria ?? null,
                autor: noticia.autor ?? null,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
