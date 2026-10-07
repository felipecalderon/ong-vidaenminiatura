import { GestionInvitaciones } from "@/features/invitaciones/components/gestion-invitaciones";
import { obtenerInvitacionesParaGestion } from "@/features/invitaciones/queries/obtener-todas-las-invitaciones.query";

export default async function AdministracionInvitacionesPage() {
  const invitaciones = await obtenerInvitacionesParaGestion();

  return <GestionInvitaciones invitaciones={invitaciones} />;
}
