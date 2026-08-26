import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import {
  EstadoRecursoEducativo,
  TipoRecursoEducativo,
} from "@/generated/prisma/enums";
import { parsePaginationParams } from "@/lib/paginacion-helper";
import { prisma } from "@/lib/prisma";
import type { PaginatedResult, QueryParams } from "@/types/paginacion";

const recursoEducativoInclude = {
  categoria: {
    select: {
      id: true,
      nombre: true,
      slug: true,
      color: true,
    },
  },
  autor: {
    select: {
      id: true,
      nombre: true,
      picture: true,
    },
  },
} satisfies Prisma.recursoEducativoInclude;

export type RecursoEducativoConRelaciones = Prisma.recursoEducativoGetPayload<{
  include: typeof recursoEducativoInclude;
}>;

export async function listarRecursosEducativosPublicados(
  params: QueryParams = {},
): Promise<PaginatedResult<RecursoEducativoConRelaciones>> {
  const { skip, take, orderBy } = parsePaginationParams(
    params,
    9,
    "fecha_publicacion",
  );

  const whereClause: Prisma.recursoEducativoWhereInput = {
    estado: EstadoRecursoEducativo.PUBLICADA,
  };

  const tiposValidos = Object.values(TipoRecursoEducativo) as string[];
  if (params.tipo && tiposValidos.includes(params.tipo)) {
    whereClause.tipo = params.tipo as TipoRecursoEducativo;
  }

  if (params.search) {
    whereClause.OR = [
      { titulo: { contains: params.search, mode: "insensitive" } },
      { resumen: { contains: params.search, mode: "insensitive" } },
      { contenido: { contains: params.search, mode: "insensitive" } },
    ];
  }

  const [totalItems, data] = await Promise.all([
    prisma.recursoEducativo.count({ where: whereClause }),
    prisma.recursoEducativo.findMany({
      where: whereClause,
      skip,
      take,
      orderBy,
      include: recursoEducativoInclude,
    }),
  ]);

  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const totalPages = Math.ceil(totalItems / take);

  return {
    data,
    meta: {
      totalItems,
      currentPage,
      totalPages,
      limit: take,
    },
  };
}
