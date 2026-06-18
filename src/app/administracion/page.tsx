import { redirect } from "next/navigation";
import { ClipboardList, FileText, Settings, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GestionCategorias } from "@/features/categorias/components/gestion-categorias";
import { obtenerTodasLasCategorias } from "@/features/categorias/queries/obtener-todas-las-categorias";
import { GestionNoticias } from "@/features/noticias/components/gestion-noticias";
import { obtenerNoticiasParaGestion } from "@/features/noticias/queries/obtener-noticias-para-gestion";
import { GestionPeticiones } from "@/features/peticiones/components/gestion-peticiones";
import { obtenerPeticionesParaGestion } from "@/features/peticiones/queries/obtener-peticiones-para-gestion";
import { GestionUsuarios } from "@/features/usuarios/components/gestion-usuarios";
import { obtenerTodosLosUsuarios } from "@/features/usuarios/queries/obtener-todos-los-usuarios";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export const metadata = {
  title: "Administración | InsectosVivos",
  description: "Panel de administración para configurar categorías, usuarios, peticiones y noticias.",
};

export default async function AdministracionPage() {
  const usuarioAutenticado = await obtenerUsuarioAutenticado();

  if (!usuarioAutenticado || !usuarioAutenticado.acceso.esAdministrador) {
    redirect("/");
  }

  const [usuarios, categorias, peticionesData, noticiasData] = await Promise.all([
    obtenerTodosLosUsuarios(),
    obtenerTodasLasCategorias(),
    obtenerPeticionesParaGestion(),
    obtenerNoticiasParaGestion(),
  ]);

  const peticiones = peticionesData || [];
  const noticias = noticiasData || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 border border-outline-variant bg-primary/10 p-6 dark:bg-primary-foreground/10 dark:">
        <h1 className="text-3xl font-extrabold text-foreground uppercase tracking-wider">
          Panel de Administración
        </h1>
        <p className="mt-2 text-lg font-semibold text-muted-foreground">
          Configura y gestiona las categorías, usuarios registrados, peticiones y noticias del sistema.
        </p>
      </div>

      <div className="w-full">
        <Tabs defaultValue="categorias" className="w-full">
          <TabsList className="mb-6 grid w-full max-w-2xl grid-cols-4 border border-outline-variant bg-background p-1 dark:">
            <TabsTrigger
              value="categorias"
              className="flex items-center gap-2 text-sm font-bold uppercase transition-all border border-transparent data-[state=active]:border-primary"
            >
              <Settings className="size-4" />
              Categorías
            </TabsTrigger>
            <TabsTrigger
              value="usuarios"
              className="flex items-center gap-2 text-sm font-bold uppercase transition-all border border-transparent data-[state=active]:border-primary"
            >
              <User className="size-4" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger
              value="peticiones"
              className="flex items-center gap-2 text-sm font-bold uppercase transition-all border border-transparent data-[state=active]:border-primary"
            >
              <ClipboardList className="size-4" />
              Peticiones
            </TabsTrigger>
            <TabsTrigger
              value="noticias"
              className="flex items-center gap-2 text-sm font-bold uppercase transition-all border border-transparent data-[state=active]:border-primary"
            >
              <FileText className="size-4" />
              Noticias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categorias" className="space-y-4">
            <GestionCategorias initialCategorias={categorias} />
          </TabsContent>

          <TabsContent value="usuarios" className="space-y-4">
            <GestionUsuarios
              initialUsuarios={usuarios}
              currentUser={usuarioAutenticado}
            />
          </TabsContent>

          <TabsContent value="peticiones" className="space-y-4">
            <GestionPeticiones
              initialPeticiones={peticiones}
              categorias={categorias.map((c) => ({ id: c.id, nombre: c.nombre }))}
            />
          </TabsContent>

          <TabsContent value="noticias" className="space-y-4">
            <GestionNoticias initialNoticias={noticias} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


