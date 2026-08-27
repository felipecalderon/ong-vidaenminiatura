import {
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  Settings,
  User,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GestionCategorias } from "@/features/categorias/components/gestion-categorias";
import { obtenerTodasLasCategorias } from "@/features/categorias/queries/obtener-todas-las-categorias";
import { GestionNoticias } from "@/features/noticias/components/gestion-noticias";
import { obtenerNoticiasParaGestion } from "@/features/noticias/queries/obtener-noticias-para-gestion";
import { PeticionesTable } from "@/features/peticiones/components/peticiones-table";
import { obtenerPeticionesParaGestion } from "@/features/peticiones/queries/obtener-peticiones-para-gestion";
import { GestionPublicaciones } from "@/features/publicaciones/components/gestion-publicaciones";
import { obtenerPublicacionesParaGestion } from "@/features/publicaciones/queries/obtener-publicaciones-para-gestion";
import { GestionRecursosEducativos } from "@/features/recursos-educativos/components/gestion-recursos-educativos";
import { obtenerRecursosEducativosParaGestion } from "@/features/recursos-educativos/queries/obtener-recursos-educativos-para-gestion";
import { GestionUsuarios } from "@/features/usuarios/components/gestion-usuarios";
import { obtenerTodosLosUsuarios } from "@/features/usuarios/queries/obtener-todos-los-usuarios";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export const metadata = {
  title: "Administración | Más Insectos",
  description:
    "Panel de administración para configurar categorías, usuarios, peticiones y noticias.",
};

export default async function AdministracionPage() {
  const usuarioAutenticado = await obtenerUsuarioAutenticado();

  if (!usuarioAutenticado || !usuarioAutenticado.acceso.esAdministrador) {
    redirect("/");
  }

  const [
    usuarios,
    categorias,
    peticionesData,
    noticiasData,
    publicacionesData,
    recursosEducativosData,
  ] = await Promise.all([
    obtenerTodosLosUsuarios(),
    obtenerTodasLasCategorias(),
    obtenerPeticionesParaGestion(),
    obtenerNoticiasParaGestion(),
    obtenerPublicacionesParaGestion(),
    obtenerRecursosEducativosParaGestion(),
  ]);

  const peticiones = peticionesData || [];
  const noticias = noticiasData || [];
  const publicaciones = publicacionesData || [];
  const recursosEducativos = recursosEducativosData || [];

  return (
    <div className="min-h-screen bg-background container mx-auto py-8 px-4">
      <div className="mb-8 rounded-xl border border-outline-variant bg-primary/10 p-6 dark:bg-primary/10">
        <h1 className="text-3xl font-extrabold text-foreground uppercase tracking-wider">
          Panel de Administración
        </h1>
        <p className="mt-2 text-lg font-semibold text-muted-foreground">
          Configura y gestiona las categorías, usuarios registrados, peticiones
          y noticias del sistema.
        </p>
      </div>

      <div className="w-full">
        <Tabs defaultValue="categorias" className="w-full">
          <TabsList
            aria-label="Secciones de administración"
            className="mb-6 grid h-auto w-full max-w-4xl grid-cols-2 gap-1.5 rounded-xl border border-outline-variant bg-surface-container p-1.5 sm:grid-cols-3"
          >
            <TabsTrigger
              value="categorias"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold uppercase transition-[color,background-color,border-color,box-shadow] hover:bg-surface-container-high hover:text-foreground data-[state=active]:bg-primary-container data-[state=active]:text-on-primary-container data-[state=active]:shadow-sm data-[state=active]:hover:bg-primary-container data-[state=active]:hover:text-on-primary-container sm:text-sm dark:hover:text-foreground dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary-container dark:data-[state=active]:text-on-primary-container dark:data-[state=active]:hover:bg-primary-container dark:data-[state=active]:hover:text-on-primary-container"
            >
              <Settings className="size-4 shrink-0" />
              <span>Categorías</span>
            </TabsTrigger>
            <TabsTrigger
              value="usuarios"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold uppercase transition-[color,background-color,border-color,box-shadow] hover:bg-surface-container-high hover:text-foreground data-[state=active]:bg-primary-container data-[state=active]:text-on-primary-container data-[state=active]:shadow-sm data-[state=active]:hover:bg-primary-container data-[state=active]:hover:text-on-primary-container sm:text-sm dark:hover:text-foreground dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary-container dark:data-[state=active]:text-on-primary-container dark:data-[state=active]:hover:bg-primary-container dark:data-[state=active]:hover:text-on-primary-container"
            >
              <User className="size-4 shrink-0" />
              <span>Usuarios</span>
            </TabsTrigger>
            <TabsTrigger
              value="peticiones"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold uppercase transition-[color,background-color,border-color,box-shadow] hover:bg-surface-container-high hover:text-foreground data-[state=active]:bg-primary-container data-[state=active]:text-on-primary-container data-[state=active]:shadow-sm data-[state=active]:hover:bg-primary-container data-[state=active]:hover:text-on-primary-container sm:text-sm dark:hover:text-foreground dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary-container dark:data-[state=active]:text-on-primary-container dark:data-[state=active]:hover:bg-primary-container dark:data-[state=active]:hover:text-on-primary-container"
            >
              <ClipboardList className="size-4 shrink-0" />
              <span>Peticiones</span>
            </TabsTrigger>
            <TabsTrigger
              value="noticias"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold uppercase transition-[color,background-color,border-color,box-shadow] hover:bg-surface-container-high hover:text-foreground data-[state=active]:bg-primary-container data-[state=active]:text-on-primary-container data-[state=active]:shadow-sm data-[state=active]:hover:bg-primary-container data-[state=active]:hover:text-on-primary-container sm:text-sm dark:hover:text-foreground dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary-container dark:data-[state=active]:text-on-primary-container dark:data-[state=active]:hover:bg-primary-container dark:data-[state=active]:hover:text-on-primary-container"
            >
              <FileText className="size-4 shrink-0" />
              <span>Noticias</span>
            </TabsTrigger>
            <TabsTrigger
              value="publicaciones"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold uppercase transition-[color,background-color,border-color,box-shadow] hover:bg-surface-container-high hover:text-foreground data-[state=active]:bg-primary-container data-[state=active]:text-on-primary-container data-[state=active]:shadow-sm data-[state=active]:hover:bg-primary-container data-[state=active]:hover:text-on-primary-container sm:text-sm dark:hover:text-foreground dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary-container dark:data-[state=active]:text-on-primary-container dark:data-[state=active]:hover:bg-primary-container dark:data-[state=active]:hover:text-on-primary-container"
            >
              <BookOpen className="size-4 shrink-0" />
              <span>Publicaciones</span>
            </TabsTrigger>
            <TabsTrigger
              value="recursos"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold uppercase transition-[color,background-color,border-color,box-shadow] hover:bg-surface-container-high hover:text-foreground data-[state=active]:bg-primary-container data-[state=active]:text-on-primary-container data-[state=active]:shadow-sm data-[state=active]:hover:bg-primary-container data-[state=active]:hover:text-on-primary-container sm:text-sm dark:hover:text-foreground dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary-container dark:data-[state=active]:text-on-primary-container dark:data-[state=active]:hover:bg-primary-container dark:data-[state=active]:hover:text-on-primary-container"
            >
              <GraduationCap className="size-4 shrink-0" />
              <span>Recursos</span>
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
            <PeticionesTable
              peticiones={peticiones}
              esAdmin
              categorias={categorias.map((c) => ({
                id: c.id,
                nombre: c.nombre,
              }))}
            />
          </TabsContent>

          <TabsContent value="noticias" className="space-y-4">
            <GestionNoticias initialNoticias={noticias} />
          </TabsContent>

          <TabsContent value="publicaciones" className="space-y-4">
            <GestionPublicaciones initialPublicaciones={publicaciones} />
          </TabsContent>

          <TabsContent value="recursos" className="space-y-4">
            <GestionRecursosEducativos
              initialRecursosEducativos={recursosEducativos}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
