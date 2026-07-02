import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteSectionProps {
  quote: string;
  author: string;
  Icon: LucideIcon;
  color: "primary" | "tertiary";
  bgIconLeft?: LucideIcon;
  bgIconRight?: LucideIcon;
}

const colorMaps = {
  primary: {
    bgFrom: "from-primary/3",
    bgTo: "to-primary/2",
    border: "border-primary/10",
    bgBlur: "bg-primary/3",
    quoteText: "text-primary/6",
    iconBg: "bg-primary/10",
    iconBorder: "border-primary/15",
    iconText: "text-primary",
    lineBg: "bg-primary/30",
    wingBig: "text-primary dark:text-primary opacity-7",
    wingSmall: "text-primary dark:text-primary opacity-7",
    radialFrom: "from-primary/4",
  },
  tertiary: {
    bgFrom: "from-tertiary/3",
    bgTo: "to-tertiary/2",
    border: "border-tertiary/10",
    bgBlur: "bg-tertiary/3",
    quoteText: "text-tertiary/6",
    iconBg: "bg-tertiary/10",
    iconBorder: "border-tertiary/15",
    iconText: "text-tertiary",
    lineBg: "bg-tertiary/30",
    wingBig: "text-tertiary dark:text-tertiary opacity-7",
    wingSmall: "text-tertiary dark:text-tertiary opacity-7 rotate-45",
    radialFrom: "from-tertiary/4",
  },
};

export function QuoteSection({
  quote,
  author,
  Icon,
  color,
  bgIconLeft: BgIconLeft,
  bgIconRight: BgIconRight,
}: QuoteSectionProps) {
  const styles = colorMaps[color];

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-linear-to-br p-8 md:p-14 text-center",
        styles.border,
        styles.bgFrom,
        styles.bgTo,
      )}
    >
      {/* Background blur/radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className={cn("h-64 w-64 rounded-full blur-[80px]", styles.bgBlur)}
        />
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] via-transparent to-transparent",
          styles.radialFrom,
        )}
      />

      {/* Decorative large quotes */}
      <div
        aria-hidden
        className={cn(
          "absolute top-4 left-6 md:top-6 md:left-10 text-6xl md:text-8xl font-headline font-black leading-none select-none",
          styles.quoteText,
        )}
      >
        &ldquo;
      </div>
      <div
        aria-hidden
        className={cn(
          "absolute bottom-4 right-6 md:bottom-6 md:right-10 text-6xl md:text-8xl font-headline font-black leading-none select-none",
          styles.quoteText,
        )}
      >
        &rdquo;
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={cn(
            "mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border",
            styles.iconBg,
            styles.iconBorder,
          )}
        >
          <Icon className={cn("h-6 w-6", styles.iconText)} />
        </div>

        {/* Quote text */}
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-headline font-black tracking-tighter text-on-background leading-[1.15] max-w-3xl mx-auto mb-6">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="inline-flex items-center gap-3">
          <div className={cn("h-px w-8", styles.lineBg)} />
          <p className="text-sm italic font-label uppercase tracking-[0.15em] text-on-surface-variant">
            {author}
          </p>
          <div className={cn("h-px w-8", styles.lineBg)} />
        </div>
      </div>

      {/* Wing decorations replaced by dynamic Lucide icons */}
      {BgIconRight && (
        <BgIconRight
          className={cn(
            "absolute -bottom-4 right-20 h-40 w-40 stroke-1",
            styles.wingBig,
          )}
        />
      )}
      {BgIconLeft && (
        <BgIconLeft
          className={cn(
            "absolute top-2 left-20 h-28 w-28 stroke-1",
            styles.wingSmall,
          )}
        />
      )}
    </section>
  );
}
