import type { QueryParams } from "@/types/paginacion";

interface OptionsPrisma {
  skip: number;
  take: number;
  orderBy: Record<string, "asc" | "desc">;
}

export function parsePaginationParams(
  params: QueryParams,
  defaultLimit = 9,
  defaultSortField = "fecha_creacion",
): OptionsPrisma {
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const limit = Math.max(1, parseInt(params.limit || `${defaultLimit}`, 10));
  const skip = (page - 1) * limit;

  const orderField = params.orderBy || defaultSortField;
  const orderDir = params.orderDir === "asc" ? "asc" : "desc";

  return {
    skip,
    take: limit,
    orderBy: {
      [orderField]: orderDir,
    },
  };
}
