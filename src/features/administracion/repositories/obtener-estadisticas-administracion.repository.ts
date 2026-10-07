import { prisma } from "@/lib/prisma";
import type { ConteosPorEstado, EstadisticasAdministracion } from "../types";

type GrupoEstado = {
  estado: string;
  _count: { _all: number };
};

type GrupoClave<T extends string> = {
  clave: T;
  cantidad: number;
};

function agruparEstados(grupos: readonly GrupoEstado[]): ConteosPorEstado {
  const porEstado = Object.fromEntries(
    grupos.map((grupo) => [grupo.estado, grupo._count._all]),
  );

  return {
    total: grupos.reduce((total, grupo) => total + grupo._count._all, 0),
    porEstado,
  };
}

function agruparClaves<T extends string>(grupos: readonly GrupoClave<T>[]) {
  return Object.fromEntries(
    grupos.map(({ clave, cantidad }) => [clave, cantidad]),
  );
}

export async function obtenerEstadisticasAdministracionRepository(): Promise<EstadisticasAdministracion> {
  const [
    noticias,
    peticiones,
    publicaciones,
    recursosEducativos,
    usuariosPorEstado,
    usuariosPorRol,
    voluntarios,
    categorias,
    totalInvitaciones,
  ] = await Promise.all([
    prisma.noticia.groupBy({ by: ["estado"], _count: { _all: true } }),
    prisma.peticion.groupBy({ by: ["estado"], _count: { _all: true } }),
    prisma.publicacion.groupBy({ by: ["estado"], _count: { _all: true } }),
    prisma.recursoEducativo.groupBy({ by: ["estado"], _count: { _all: true } }),
    prisma.usuario.groupBy({ by: ["estado"], _count: { _all: true } }),
    prisma.usuario.groupBy({ by: ["rol"], _count: { _all: true } }),
    prisma.voluntario.groupBy({ by: ["estado"], _count: { _all: true } }),
    prisma.categoria.groupBy({ by: ["activo"], _count: { _all: true } }),
    prisma.invitacion.count(),
  ]);

  const categoriasActivas =
    categorias.find((grupo) => grupo.activo)?._count._all ?? 0;

  return {
    noticias: agruparEstados(noticias),
    peticiones: agruparEstados(peticiones),
    publicaciones: agruparEstados(publicaciones),
    recursosEducativos: agruparEstados(recursosEducativos),
    voluntarios: agruparEstados(voluntarios),
    usuarios: {
      total: usuariosPorEstado.reduce(
        (total, grupo) => total + grupo._count._all,
        0,
      ),
      porEstado: agruparClaves(
        usuariosPorEstado.map((grupo) => ({
          clave: grupo.estado,
          cantidad: grupo._count._all,
        })),
      ),
      porRol: agruparClaves(
        usuariosPorRol.map((grupo) => ({
          clave: grupo.rol,
          cantidad: grupo._count._all,
        })),
      ),
    },
    categorias: {
      total: categorias.reduce((total, grupo) => total + grupo._count._all, 0),
      activas: categoriasActivas,
    },
    invitaciones: totalInvitaciones,
  };
}
