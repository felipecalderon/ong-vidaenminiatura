import type { Metadata } from "next";
import { PeticionCard } from "@/features/peticiones/components/peticion-card";
import { obtenerListaPeticionesActivas } from "@/features/peticiones/queries";

export const metadata: Metadata = {
  title: "Peticiones",
  description:
    "Todas las peticiones activas de la Fundación InsectosVivos. Firma y marca la diferencia.",
};

export default async function PeticionesPage() {
  const peticiones = await obtenerListaPeticionesActivas();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4 mb-12">
        <div className="inline-block bg-primary text-primary-foreground px-4 py-2 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-bold">
          ✍️ Peticiones Activas
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Causas que necesitan tu apoyo
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explora las peticiones creadas por nuestra comunidad y suma tu firma
          para ayudarnos a impulsar cambios reales para los insectos y
          arácnidos.
        </p>
      </div>

      {peticiones.length === 0 ? (
        <div className="p-12 text-center border-4 border-black dark:border-white bg-muted">
          <p className="text-xl font-semibold">
            No hay peticiones activas en este momento.
          </p>
          <p className="text-muted-foreground mt-2">
            ¡Sé el primero en crear una causa!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {peticiones.map((peticion) => (
            // Type conversion safety helper
            <PeticionCard
              key={peticion.id}
              peticion={{
                ...peticion,
                imagen: peticion.imagen ?? "",
                meta_firmas: peticion.meta_firmas ?? 1000,
                fecha_publicacion: peticion.fecha_publicacion ?? undefined,
                categoria: peticion.categoria
                  ? {
                      ...peticion.categoria,
                      descripcion: peticion.categoria.descripcion ?? undefined,
                      color: peticion.categoria.color ?? undefined,
                    }
                  : undefined,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
