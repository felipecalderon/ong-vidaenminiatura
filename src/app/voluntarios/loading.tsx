import { Skeleton } from "@/components/ui/skeleton";

export default function VoluntariosLoading() {
  return (
    <div className="min-h-screen text-on-background overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-20 space-y-20 md:space-y-28">
        {/* Hero skeleton */}
        <div className="text-center space-y-5">
          <Skeleton className="h-7 w-52 rounded-full mx-auto" />
          <Skeleton className="h-16 md:h-20 w-3/4 rounded-xl mx-auto" />
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-10/12 rounded-md mx-auto" />
          </div>
        </div>

        {/* Áreas skeleton */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <Skeleton className="h-6 w-44 rounded-full mx-auto" />
            <Skeleton className="h-8 w-48 rounded-lg mx-auto" />
            <Skeleton className="h-4 w-80 rounded-md mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-outline-variant/40 bg-surface p-5 space-y-3"
              >
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-4 w-24 rounded-md" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-full rounded-sm" />
                  <Skeleton className="h-3 w-4/5 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario skeleton */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <Skeleton className="h-6 w-36 rounded-full mx-auto" />
            <Skeleton className="h-8 w-56 rounded-lg mx-auto" />
            <Skeleton className="h-4 w-80 rounded-md mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto rounded-2xl border border-outline-variant/40 bg-surface p-6 md:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-3 w-28 rounded-sm" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-28 rounded-xl" />
              ))}
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-64 rounded-sm" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-11 w-44 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
