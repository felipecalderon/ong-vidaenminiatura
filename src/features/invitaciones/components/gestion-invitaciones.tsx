import { AdminHeader } from "@/components/admin/admin-header";
import type { InvitacionConDetalle } from "../types";
import { DialogInvitarUsuario } from "./dialog-invitar-usuario";
import { TablaInvitaciones } from "./tabla-invitaciones";

export function GestionInvitaciones({
  invitaciones,
}: {
  invitaciones: InvitacionConDetalle[];
}) {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Invitaciones"
        description="Invita a nuevas personas al equipo y administra el acceso pendiente."
      >
        <DialogInvitarUsuario />
      </AdminHeader>
      <TablaInvitaciones invitaciones={invitaciones} />
    </div>
  );
}
