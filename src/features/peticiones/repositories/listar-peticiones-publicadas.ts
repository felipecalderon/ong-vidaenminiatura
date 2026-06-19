import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { EstadoPeticion } from "@/generated/prisma/enums";
import { parsePaginationParams } from "@/lib/paginacion-helper";
import { prisma } from "@/lib/prisma";
import type { PaginatedResult, QueryParams } from "@/types/paginacion";

const peticionInclude = {
  categoria: true,
} satisfies Prisma.peticionInclude;

export type PeticionConRelaciones = Prisma.peticionGetPayload<{
  include: typeof peticionInclude;
}>;

export async function listarPeticionesPublicadas(
  params: QueryParams = {},
): Promise<PaginatedResult<PeticionConRelaciones>> {
  const { skip, take, orderBy } = parsePaginationParams(
    params,
    9,
    "fecha_publicacion",
  );

  const whereClause: Prisma.peticionWhereInput = {
    estado: EstadoPeticion.PUBLICADA,
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
    prisma.peticion.count({ where: whereClause }),
    prisma.peticion.findMany({
      where: whereClause,
      skip,
      take,
      orderBy,
      include: peticionInclude,
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
