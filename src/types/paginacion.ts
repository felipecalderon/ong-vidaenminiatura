export interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
  categoriaId?: string;
  orderBy?: string;
  orderDir?: "asc" | "desc";
  destacado?: boolean | string;
  [key: string]: string | boolean | undefined;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}
