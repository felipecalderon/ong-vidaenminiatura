import type * as React from "react";

interface AdminHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function AdminHeader({
  title,
  description,
  children,
}: AdminHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-outline-variant pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-prose text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
          {children}
        </div>
      )}
    </header>
  );
}
