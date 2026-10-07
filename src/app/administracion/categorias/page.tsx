import { GestionCategorias } from "@/features/categorias/components/gestion-categorias";
import { obtenerTodasLasCategorias } from "@/features/categorias/queries/obtener-todas-las-categorias";

export default async function AdministracionCategoriasPage() {
  const categorias = await obtenerTodasLasCategorias();

  return <GestionCategorias initialCategorias={categorias} />;
}
