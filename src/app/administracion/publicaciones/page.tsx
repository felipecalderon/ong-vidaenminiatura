import { GestionPublicaciones } from "@/features/publicaciones/components/gestion-publicaciones";
import { obtenerPublicacionesParaGestion } from "@/features/publicaciones/queries/obtener-publicaciones-para-gestion";

export default async function AdministracionPublicacionesPage() {
  const publicaciones = await obtenerPublicacionesParaGestion();

  return <GestionPublicaciones initialPublicaciones={publicaciones ?? []} />;
}
