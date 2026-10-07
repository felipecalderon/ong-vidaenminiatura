import { GestionRecursosEducativos } from "@/features/recursos-educativos/components/gestion-recursos-educativos";
import { obtenerRecursosEducativosParaGestion } from "@/features/recursos-educativos/queries/obtener-recursos-educativos-para-gestion";

export default async function AdministracionRecursosEducativosPage() {
  const recursos = await obtenerRecursosEducativosParaGestion();

  return (
    <GestionRecursosEducativos initialRecursosEducativos={recursos ?? []} />
  );
}
