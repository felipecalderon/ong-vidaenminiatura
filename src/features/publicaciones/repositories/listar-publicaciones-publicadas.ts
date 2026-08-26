import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { EstadoPublicacion, TipoPublicacion } from "@/generated/prisma/enums";
import { parsePaginationParams } from "@/lib/paginacion-helper";
import { prisma } from "@/lib/prisma";
import type { PaginatedResult, QueryParams } from "@/types/paginacion";

const publicacionInclude = {
  autor: {
    select: {
      id: true,
      nombre: true,
      picture: true,
    },
  },
} satisfies Prisma.publicacionInclude;

export type PublicacionConRelaciones = Prisma.publicacionGetPayload<{
  include: typeof publicacionInclude;
}>;

export async function listarPublicacionesPublicadas(
  params: QueryParams = {},
): Promise<PaginatedResult<PublicacionConRelaciones>> {
  const { skip, take, orderBy } = parsePaginationParams(
    params,
    9,
    "fecha_publicacion",
  );

  const whereClause: Prisma.publicacionWhereInput = {
    estado: EstadoPublicacion.PUBLICADA,
  };

  const tiposValidos = Object.values(TipoPublicacion) as string[];
  if (params.tipo && tiposValidos.includes(params.tipo)) {
    whereClause.tipo = params.tipo as TipoPublicacion;
  }

  if (params.search) {
    whereClause.OR = [
      { titulo: { contains: params.search, mode: "insensitive" } },
      { resumen: { contains: params.search, mode: "insensitive" } },
      { contenido: { contains: params.search, mode: "insensitive" } },
    ];
  }

  const [totalItems, data] = await Promise.all([
    prisma.publicacion.count({ where: whereClause }),
    prisma.publicacion.findMany({
      where: whereClause,
      skip,
      take,
      orderBy,
      include: publicacionInclude,
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
