"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/peticiones", label: "Peticiones" },
  { href: "/noticias", label: "Noticias" },
  { href: "/nosotros", label: "Nosotros" },
];

interface NavigationProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export function Navigation({
  className,
  variant = "desktop",
}: NavigationProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  if (variant === "mobile") {
    return (
      <nav className={cn("flex flex-col gap-2 w-full", className)}>
        {navLinks.map((link) => {
          const active = isLinkActive(link.href);
          return (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative px-4 py-3.5 text-base font-bold rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-between group",
                  active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 border border-transparent",
                )}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
              </Link>
            </SheetClose>
          );
        })}
      </nav>
    );
  }

  // Desktop variant
  return (
    <nav className={cn("flex items-center gap-1.5", className)}>
      {navLinks.map((link) => {
        const active = isLinkActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative px-4 py-2 text-sm font-semibold font-headline tracking-tight rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center overflow-hidden border",
              active
                ? "bg-primary/8 text-primary border-primary/20 shadow-xs"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 border-transparent",
            )}
          >
            <span className="relative z-10">{link.label}</span>
            {active && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full mx-4" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
