import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Hero Section Skeleton */}
      <section className="mb-16 relative overflow-hidden bg-surface-container min-h-150 flex items-end">
        {/* Animated Background skeleton */}
        <div className="absolute inset-0 z-0">
          <Skeleton className="w-full h-full opacity-35 rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 items-end justify-between w-full">
          <div className="max-w-2xl w-full">
            {/* Category badge skeleton */}
            <Skeleton className="h-6 w-32 rounded-full mb-6" />

            {/* Title skeletons */}
            <Skeleton className="h-12 md:h-16 w-3/4 rounded-lg mb-4" />
            <Skeleton className="h-12 md:h-16 w-1/2 rounded-lg mb-4" />

            {/* Description skeletons */}
            <div className="space-y-2 mb-8 max-w-xl">
              <Skeleton className="h-5 w-full rounded-md" />
              <Skeleton className="h-5 w-5/6 rounded-md" />
            </div>

            {/* Buttons skeletons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-14 w-full sm:w-48 rounded-lg" />
              <Skeleton className="h-14 w-full sm:w-48 rounded-lg" />
            </div>
          </div>

          {/* Sidebar widget skeleton */}
          <div className="bg-surface-container-highest/80 backdrop-blur-md border border-outline-variant rounded-lg p-6 w-full md:w-80 shadow-2xl">
            <Skeleton className="h-4 w-40 rounded-md mb-4" />
            <Skeleton className="h-10 w-28 rounded-md mb-4" />
            <Skeleton className="h-2 w-full rounded-full mb-4 animate-pulse" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-24 rounded-md" />
              <Skeleton className="h-3 w-12 rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section Skeleton */}
        <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="p-6 bg-surface-container border border-outline-variant rounded-lg flex flex-col items-center justify-center"
            >
              <Skeleton className="h-6 w-6 rounded-full mb-4" />
              <Skeleton className="h-8 w-20 rounded-md mb-2" />
              <Skeleton className="h-3 w-28 rounded-md" />
            </div>
          ))}
        </section>

        {/* Active Petitions Skeleton */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 rounded-md" />
              <Skeleton className="h-4 w-80 rounded-md" />
            </div>
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-full border border-outline-variant bg-surface-container rounded-lg overflow-hidden flex flex-col"
              >
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="p-6 flex flex-col flex-1">
                  <Skeleton className="h-6 w-3/4 rounded-md mb-3" />
                  <Skeleton className="h-4 w-full rounded-md mb-2" />
                  <Skeleton className="h-4 w-5/6 rounded-md mb-6" />

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-24 rounded-md" />
                      <Skeleton className="h-3 w-16 rounded-md" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20 rounded-md" />
                      <Skeleton className="h-4 w-24 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* News Section Skeleton */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 rounded-md" />
              <Skeleton className="h-4 w-80 rounded-md" />
            </div>
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
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
        </section>

        {/* CTA Section Skeleton */}
        <section className="relative overflow-hidden border border-outline-variant rounded-xl bg-surface-container p-8 md:p-16 text-center flex flex-col items-center">
          <Skeleton className="w-12 h-12 rounded-full mb-6" />
          <Skeleton className="h-10 w-96 rounded-md mb-4" />
          <div className="space-y-2 mb-8 w-full max-w-xl flex flex-col items-center">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>
          <Skeleton className="h-14 w-56 rounded-lg" />
        </section>
      </main>
    </div>
  );
}
