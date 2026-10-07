import { obtenerTodasLasCategorias } from "@/features/categorias/queries/obtener-todas-las-categorias";
import { GestionPeticiones } from "@/features/peticiones/components/gestion-peticiones";
import { obtenerPeticionesParaGestion } from "@/features/peticiones/queries/obtener-peticiones-para-gestion";

export default async function AdministracionPeticionesPage() {
  const [peticiones, categorias] = await Promise.all([
    obtenerPeticionesParaGestion(),
    obtenerTodasLasCategorias(),
  ]);

  return (
    <GestionPeticiones peticiones={peticiones ?? []} categorias={categorias} />
  );
}
