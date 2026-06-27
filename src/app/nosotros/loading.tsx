import { Skeleton } from "@/components/ui/skeleton";

export default function NosotrosLoading() {
  return (
    <div className="min-h-screen bg-background text-on-background overflow-hidden">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-linear-to-b from-surface-container via-surface-container/50 to-background">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-40 md:pt-32">
          {/* Eyebrow */}
          <Skeleton className="h-7 w-56 rounded-full mb-10" />

          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-end">
            <div className="md:col-span-3">
              {/* Headline skeletons */}
              <Skeleton className="h-14 md:h-20 w-3/4 rounded-lg mb-4" />
              <Skeleton className="h-10 md:h-12 w-5/6 rounded-lg mb-6" />
              {/* Paragraph description */}
              <div className="space-y-2 max-w-xl">
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-11/12 rounded-md" />
                <Skeleton className="h-5 w-4/5 rounded-md" />
              </div>
            </div>

            {/* Floating badges stats skeletons */}
            <div className="md:col-span-2 flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl border border-outline-variant/60 bg-surface/70 px-5 py-4"
                >
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-12 rounded-md" />
                    <Skeleton className="h-3 w-28 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24 space-y-24 md:space-y-36">
        {/* Mission and Vision Grid Skeleton */}
        <section id="mision-vision" className="relative">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Mision */}
            <div className="relative rounded-2xl border border-outline-variant/60 bg-surface p-8 md:p-10 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-2xl" />
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>
              <Skeleton className="h-4 w-28 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-44 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
            </div>

            {/* Vision */}
            <div className="relative rounded-2xl border border-outline-variant/60 bg-surface p-8 md:p-10 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-2xl" />
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>
              <Skeleton className="h-4 w-28 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-44 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
            </div>
          </div>
        </section>

        {/* Perspectivas / Ventanas de percepción Skeleton */}
        <section id="ventanas">
          <div className="mb-12 text-center space-y-4">
            <div className="mx-auto flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-outline-variant" />
              <Skeleton className="h-4 w-48 rounded-md" />
              <div className="h-px w-8 bg-outline-variant" />
            </div>
            <Skeleton className="h-10 md:h-12 w-64 rounded-md mx-auto" />
            <div className="space-y-2 max-w-xl mx-auto">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md mx-auto" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-outline-variant/60 bg-surface p-8 space-y-6"
              >
                <Skeleton className="h-12 w-12 rounded-2xl" />
                <Skeleton className="h-6 w-36 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-11/12 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fundadores Skeleton */}
        <section id="fundadores">
          <div className="mb-12 text-center space-y-4">
            <div className="mx-auto flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-outline-variant" />
              <Skeleton className="h-4 w-60 rounded-md" />
              <div className="h-px w-8 bg-outline-variant" />
            </div>
            <Skeleton className="h-10 md:h-12 w-48 rounded-md mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-outline-variant/60 bg-surface overflow-hidden flex flex-col"
              >
                <Skeleton className="aspect-4/3 w-full rounded-none" />
                <div className="p-6 md:p-8 space-y-4">
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="h-8 w-44 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4.5 w-5/6 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote 1 Skeleton */}
        <section className="relative overflow-hidden rounded-3xl border border-primary/10 bg-linear-to-br from-primary/3 to-primary/2 p-8 md:p-14 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-14 w-14 rounded-full mx-auto" />
            <div className="space-y-3">
              <Skeleton className="h-6 md:h-8 w-full rounded-md" />
              <Skeleton className="h-6 md:h-8 w-11/12 rounded-md mx-auto" />
              <Skeleton className="h-6 md:h-8 w-4/5 rounded-md mx-auto" />
            </div>
            <div className="inline-flex items-center gap-3 justify-center">
              <div className="h-px w-8 bg-primary/20" />
              <Skeleton className="h-4 w-48 rounded-md" />
              <div className="h-px w-8 bg-primary/20" />
            </div>
          </div>
        </section>

        {/* Valores Section Skeleton */}
        <section id="valores">
          <div className="mb-12 text-center space-y-4">
            <div className="mx-auto flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-outline-variant" />
              <Skeleton className="h-4 w-32 rounded-md" />
              <div className="h-px w-8 bg-outline-variant" />
            </div>
            <Skeleton className="h-10 md:h-12 w-52 rounded-md mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-outline-variant/60 bg-surface p-7 md:p-8 flex gap-5"
              >
                <Skeleton className="h-12 w-12 rounded-2xl shrink-0" />
                <div className="space-y-3 flex-1 min-w-0">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote 2 Skeleton */}
        <section className="relative overflow-hidden rounded-3xl border border-tertiary/10 bg-linear-to-br from-tertiary/3 to-tertiary/2 p-8 md:p-14 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-14 w-14 rounded-full mx-auto" />
            <div className="space-y-3">
              <Skeleton className="h-6 md:h-8 w-full rounded-md" />
              <Skeleton className="h-6 md:h-8 w-11/12 rounded-md mx-auto" />
              <Skeleton className="h-6 md:h-8 w-4/5 rounded-md mx-auto" />
            </div>
            <div className="inline-flex items-center gap-3 justify-center">
              <div className="h-px w-8 bg-tertiary/20" />
              <Skeleton className="h-4 w-48 rounded-md" />
              <div className="h-px w-8 bg-tertiary/20" />
            </div>
          </div>
        </section>

        {/* CTA Section Skeleton */}
        <section className="relative overflow-hidden rounded-3xl border border-primary/15 p-10 md:p-16 text-center bg-linear-to-br from-primary/4 via-primary/1 to-background">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6 flex flex-col items-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-10 md:h-12 w-80 rounded-md" />
            <div className="space-y-2 w-full max-w-lg">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 rounded-md mx-auto" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
              <Skeleton className="h-14 w-full sm:w-56 rounded-xl" />
              <Skeleton className="h-14 w-full sm:w-40 rounded-xl" />
            </div>
          </div>
        </section>

        {/* Responsabilidad cosmica Skeleton */}
        <section className="relative overflow-hidden rounded-3xl border border-outline-variant/60 bg-linear-to-br from-surface-container/60 via-surface/40 to-surface-container/30 p-8 md:p-12">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <Skeleton className="h-4 w-36 rounded-md mx-auto" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-11/12 rounded-md mx-auto" />
              <Skeleton className="h-6 w-4/5 rounded-md mx-auto" />
            </div>
            <div className="h-px w-16 bg-outline-variant mx-auto my-6" />
            <div className="space-y-2 max-w-xl mx-auto">
              <Skeleton className="h-4.5 w-full rounded-md" />
              <Skeleton className="h-4.5 w-5/6 rounded-md mx-auto" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
