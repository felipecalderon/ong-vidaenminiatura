import { InicioAdministracion } from "@/features/administracion/components/inicio-administracion";
import { obtenerEstadisticasAdministracion } from "@/features/administracion/queries/obtener-estadisticas-administracion.query";

export const metadata = {
  title: "Administración | Más Insectos",
  description: "Resumen global del contenido y la comunidad de Más Insectos.",
};

export default async function AdministracionPage() {
  const estadisticas = await obtenerEstadisticasAdministracion();

  return <InicioAdministracion estadisticas={estadisticas} />;
}
