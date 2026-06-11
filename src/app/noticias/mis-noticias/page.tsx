import { redirect } from "next/navigation";
import { MisNoticiasTable } from "@/features/noticias/components/mis-noticias-table";
import { obtenerNoticiasParaGestion } from "@/features/noticias/queries";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries";

export const metadata = {
  title: "Mis Noticias | InsectosVivos",
  description: "Gestiona tus noticias creadas",
};

export default async function MisNoticiasPage() {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario || !usuario.acceso.puedeAcceder) {
    redirect("/auth/login?returnTo=/noticias/mis-noticias");
  }

  const noticias = await obtenerNoticiasParaGestion();

  if (!noticias) {
    redirect("/auth/login?returnTo=/noticias/mis-noticias");
  }

  const esAdmin = usuario.rol === "ADMINISTRADOR";

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-black uppercase md:text-5xl lg:text-6xl">
            {esAdmin ? "Gestión de Noticias" : "Mis Noticias"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {esAdmin
              ? "Administra todas las noticias de la plataforma"
              : "Gestiona las noticias que has creado"}
          </p>
        </div>
      </div>

      <MisNoticiasTable
        noticias={noticias.map((noticia) => ({
          ...noticia,
          fecha_publicacion: noticia.fecha_publicacion
            ? noticia.fecha_publicacion.toISOString()
            : null,
        }))}
        esAdmin={esAdmin}
      />
    </div>
  );
}
