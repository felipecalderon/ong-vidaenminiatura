import { Skeleton } from "@/components/ui/skeleton";

export default function NoticiasLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Heading Section Skeleton */}
      <div className="space-y-4 mb-12">
        <Skeleton className="h-10 w-44 rounded-none" />
        <Skeleton className="h-12 md:h-14 w-2/3 md:w-1/2 rounded-md" />
        <div className="space-y-2 max-w-2xl">
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-4/5 rounded-md" />
        </div>
      </div>

      {/* BarraFiltros Skeleton */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Search input skeleton */}
          <Skeleton className="h-12 w-full sm:max-w-xs rounded-lg" />
          {/* Category buttons skeleton */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Noticias Cards Skeletons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-full border border-outline-variant bg-surface-container rounded-lg overflow-hidden flex flex-col"
          >
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex gap-4 mb-4">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-3 w-16 rounded-md" />
              </div>
              <Skeleton className="h-6 w-3/4 rounded-md mb-3" />
              <Skeleton className="h-4 w-full rounded-md mb-2" />
              <Skeleton className="h-4 w-5/6 rounded-md mb-6" />
              <Skeleton className="mt-auto h-4 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center gap-2 mt-12">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
}
