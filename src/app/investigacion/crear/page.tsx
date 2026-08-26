import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CrearPublicacionForm } from "@/features/publicaciones/components/crear-publicacion-form";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export const metadata: Metadata = {
  title: "Crear Publicación",
  description:
    "Crea una nueva publicación científica o actividad formativa para el espacio de investigación.",
};

export default async function CrearPublicacionPage() {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect("/auth/login?returnTo=/investigacion/crear");
  }

  return (
    <div className="min-h-screen bg-background container mx-auto px-4 py-12">
      <CrearPublicacionForm />
    </div>
  );
}
