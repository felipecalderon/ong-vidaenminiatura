import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { EstadisticasAdministracion } from "../types";

interface InicioAdministracionProps {
  estadisticas: EstadisticasAdministracion;
}

const formatoNumero = new Intl.NumberFormat("es-CL");

const seccionesContenido = [
  {
    clave: "noticias",
    titulo: "Noticias",
    href: "/administracion/noticias",
    estados: ["BORRADOR", "REVISION", "PUBLICADA", "ARCHIVADA"],
  },
  {
    clave: "peticiones",
    titulo: "Peticiones",
    href: "/administracion/peticiones",
    estados: ["BORRADOR", "REVISION", "PUBLICADA", "CERRADA", "ARCHIVADA"],
  },
  {
    clave: "publicaciones",
    titulo: "Publicaciones",
    href: "/administracion/publicaciones",
    estados: ["BORRADOR", "REVISION", "PUBLICADA", "ARCHIVADA"],
  },
  {
    clave: "recursosEducativos",
    titulo: "Recursos educativos",
    href: "/administracion/recursos-educativos",
    estados: ["BORRADOR", "REVISION", "PUBLICADA", "ARCHIVADA"],
  },
] as const;

const etiquetasEstado: Record<string, string> = {
  BORRADOR: "Borrador",
  REVISION: "En revisión",
  PUBLICADA: "Publicada",
  CERRADA: "Cerrada",
  ARCHIVADA: "Archivada",
};

const tonoEstado: Record<string, string> = {
  BORRADOR: "bg-surface-container text-on-surface-variant",
  REVISION: "bg-amber-500/10 text-amber-800 dark:text-amber-300",
  PUBLICADA: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
  CERRADA: "bg-surface-container text-on-surface-variant",
  ARCHIVADA: "bg-surface-container text-on-surface-variant",
};

function formatoEstado(estado: string) {
  return etiquetasEstado[estado] ?? estado;
}

function ConteoEstado({
  estado,
  cantidad,
}: {
  estado: string;
  cantidad: number;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${tonoEstado[estado] ?? "bg-surface-container text-on-surface-variant"}`}
    >
      <span>{formatoEstado(estado)}</span>
      <span className="font-semibold tabular-nums">
        {formatoNumero.format(cantidad)}
      </span>
    </span>
  );
}

export function InicioAdministracion({
  estadisticas,
}: InicioAdministracionProps) {
  const totalContenido =
    estadisticas.noticias.total +
    estadisticas.peticiones.total +
    estadisticas.publicaciones.total +
    estadisticas.recursosEducativos.total;
  const usuariosActivos = estadisticas.usuarios.porEstado.ACTIVO ?? 0;
  const voluntariosPendientes =
    estadisticas.voluntarios.porEstado.PENDIENTE ?? 0;

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 border-b border-outline-variant pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">Administración</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Resumen general
          </h1>
          <p className="mt-2 max-w-prose text-sm leading-6 text-muted-foreground sm:text-base">
            Una vista rápida del contenido y la comunidad que estás gestionando.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Datos actuales de la plataforma
        </p>
      </header>

      <section
        aria-label="Indicadores principales"
        className="grid border-y border-outline-variant sm:grid-cols-3 sm:divide-x sm:divide-y-0 divide-y divide-outline-variant"
      >
        <div className="py-5 sm:px-5 sm:first:pl-0">
          <p className="text-sm font-medium text-muted-foreground">
            Contenido en gestión
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-foreground">
            {formatoNumero.format(totalContenido)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Noticias, peticiones, publicaciones y recursos educativos
          </p>
        </div>
        <div className="py-5 sm:px-5">
          <p className="text-sm font-medium text-muted-foreground">
            Usuarios registrados
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-foreground">
            {formatoNumero.format(estadisticas.usuarios.total)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatoNumero.format(usuariosActivos)} cuentas activas
          </p>
        </div>
        <div className="py-5 sm:px-5 sm:pr-0">
          <p className="text-sm font-medium text-muted-foreground">
            Postulaciones de voluntariado
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-foreground">
            {formatoNumero.format(estadisticas.voluntarios.total)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatoNumero.format(voluntariosPendientes)} pendientes de revisión
          </p>
        </div>
      </section>

      <section aria-labelledby="resumen-contenidos" className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="resumen-contenidos"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              Contenido por estado
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Totales agrupados por cada etapa editorial.
            </p>
          </div>
        </div>
        <div className="divide-y divide-outline-variant rounded-xl border border-outline-variant bg-card">
          {seccionesContenido.map((seccion) => {
            const datos = estadisticas[seccion.clave];

            return (
              <div
                key={seccion.clave}
                className="flex flex-col gap-3 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex items-center justify-between gap-4 lg:min-w-44">
                  <Link
                    href={seccion.href}
                    className="group inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {seccion.titulo}
                    <ArrowUpRight
                      className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                  <span className="text-sm tabular-nums text-muted-foreground lg:hidden">
                    {formatoNumero.format(datos.total)} en total
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {seccion.estados.map((estado) => (
                    <ConteoEstado
                      key={estado}
                      estado={estado}
                      cantidad={datos.porEstado[estado] ?? 0}
                    />
                  ))}
                </div>
                <span className="hidden min-w-24 text-right text-sm font-semibold tabular-nums text-foreground lg:block">
                  {formatoNumero.format(datos.total)} total
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section
          aria-labelledby="resumen-comunidad"
          className="rounded-xl border border-outline-variant bg-card p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="resumen-comunidad"
                className="text-xl font-semibold tracking-tight text-foreground"
              >
                Comunidad
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Usuarios, roles y postulaciones recibidas.
              </p>
            </div>
            <Link
              href="/administracion/usuarios"
              className="shrink-0 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Ver usuarios
            </Link>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Estado de usuarios
              </h3>
              <dl className="mt-3 space-y-2">
                {[
                  ["ACTIVO", "Activos"],
                  ["SUSPENDIDO", "Suspendidos"],
                ].map(([estado, etiqueta]) => (
                  <div
                    key={estado}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <dt className="text-muted-foreground">{etiqueta}</dt>
                    <dd className="font-semibold tabular-nums text-foreground">
                      {formatoNumero.format(
                        estadisticas.usuarios.porEstado[estado] ?? 0,
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <h3 className="mt-5 text-sm font-semibold text-foreground">
                Roles
              </h3>
              <dl className="mt-3 space-y-2">
                {[
                  ["USUARIO", "Usuarios"],
                  ["AUTOR", "Autores"],
                  ["ADMINISTRADOR", "Administradores"],
                ].map(([rol, etiqueta]) => (
                  <div key={rol} className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">{etiqueta}</dt>
                    <dd className="font-semibold tabular-nums text-foreground">
                      {formatoNumero.format(
                        estadisticas.usuarios.porRol[rol] ?? 0,
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="border-t border-outline-variant pt-5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Voluntariado
                </h3>
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {formatoNumero.format(estadisticas.voluntarios.total)} total
                </span>
              </div>
              <dl className="mt-3 space-y-2">
                {[
                  ["PENDIENTE", "Pendientes"],
                  ["CONTACTADO", "Contactados"],
                  ["ACTIVO", "Activos"],
                  ["INACTIVO", "Inactivos"],
                ].map(([estado, etiqueta]) => (
                  <div
                    key={estado}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <dt className="text-muted-foreground">{etiqueta}</dt>
                    <dd className="font-semibold tabular-nums text-foreground">
                      {formatoNumero.format(
                        estadisticas.voluntarios.porEstado[estado] ?? 0,
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="resumen-configuracion"
          className="rounded-xl border border-outline-variant bg-card p-5 sm:p-6"
        >
          <div>
            <h2
              id="resumen-configuracion"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              Configuración y acceso
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Categorías disponibles e invitaciones de equipo.
            </p>
          </div>
          <dl className="mt-5 divide-y divide-outline-variant">
            <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
              <div>
                <dt className="text-sm font-semibold text-foreground">
                  Categorías
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground">
                  {formatoNumero.format(estadisticas.categorias.activas)}{" "}
                  activas de{" "}
                  {formatoNumero.format(estadisticas.categorias.total)}
                </dd>
              </div>
              <Link
                href="/administracion/categorias"
                className="text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Gestionar
              </Link>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
              <div>
                <dt className="text-sm font-semibold text-foreground">
                  Invitaciones
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground">
                  Emitidas para incorporar personas al equipo
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {formatoNumero.format(estadisticas.invitaciones)}
                </span>
                <Link
                  href="/administracion/invitaciones"
                  className="text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Ver
                </Link>
              </div>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
