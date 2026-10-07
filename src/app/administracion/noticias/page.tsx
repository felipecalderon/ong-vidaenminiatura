import { GestionNoticias } from "@/features/noticias/components/gestion-noticias";
import { obtenerNoticiasParaGestion } from "@/features/noticias/queries/obtener-noticias-para-gestion";

export default async function AdministracionNoticiasPage() {
  const noticias = await obtenerNoticiasParaGestion();

  return <GestionNoticias initialNoticias={noticias ?? []} />;
}
