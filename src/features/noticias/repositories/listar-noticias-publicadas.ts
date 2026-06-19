import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { EstadoNoticia } from "@/generated/prisma/enums";
import { parsePaginationParams } from "@/lib/paginacion-helper";
import { prisma } from "@/lib/prisma";
import type { PaginatedResult, QueryParams } from "@/types/paginacion";

const noticiaInclude = {
  categoria: true,
  autor: {
    select: {
      id: true,
      nombre: true,
      picture: true,
    },
  },
} satisfies Prisma.noticiaInclude;

export type NoticiaConRelaciones = Prisma.noticiaGetPayload<{
  include: typeof noticiaInclude;
}>;

export async function listarNoticiasPublicadas(
  params: QueryParams = {},
): Promise<PaginatedResult<NoticiaConRelaciones>> {
  const { skip, take, orderBy } = parsePaginationParams(
    params,
    9,
    "fecha_publicacion",
  );

  const whereClause: Prisma.noticiaWhereInput = {
    estado: EstadoNoticia.PUBLICADA,
  };

  if (params.search) {
    whereClause.OR = [
      { titulo: { contains: params.search, mode: "insensitive" } },
      { resumen: { contains: params.search, mode: "insensitive" } },
      { contenido: { contains: params.search, mode: "insensitive" } },
    ];
  }

  if (params.categoriaId) {
    whereClause.categoria_id = params.categoriaId;
  }

  const [totalItems, data] = await Promise.all([
    prisma.noticia.count({ where: whereClause }),
    prisma.noticia.findMany({
      where: whereClause,
      skip,
      take,
      orderBy,
      include: noticiaInclude,
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
