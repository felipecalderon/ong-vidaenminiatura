"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ── Nav structure ─────────────────────────────────────────────────────────────

type NavLink = { href: string; label: string };
type NavGroup = { label: string; items: NavLink[] };
type NavItem = ({ type: "link" } & NavLink) | ({ type: "group" } & NavGroup);

export const navStructure: NavItem[] = [
  { type: "link", href: "/", label: "Inicio" },
  { type: "link", href: "/nosotros", label: "Quiénes somos" },
  {
    type: "group",
    label: "Educación",
    items: [
      { href: "/aprende", label: "Aprende" },
      { href: "/investigacion", label: "Investigación" },
      { href: "/noticias", label: "Noticias" },
    ],
  },
  {
    type: "group",
    label: "Actúa",
    items: [
      { href: "/peticiones", label: "Peticiones" },
      { href: "/voluntarios", label: "Voluntariado" },
    ],
  },
];

// Backward-compat flat list
export const navLinks = navStructure.flatMap((item) =>
  item.type === "link" ? [{ href: item.href, label: item.label }] : item.items,
);

// ── Desktop dropdown ──────────────────────────────────────────────────────────

function DesktopGroup({
  label,
  items,
  isActive,
}: {
  label: string;
  items: NavLink[];
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "relative px-3 py-2 text-sm font-semibold font-headline tracking-tight rounded-lg transition-all duration-200 active:scale-95 flex items-center gap-1.5 overflow-hidden border",
          isActive
            ? "bg-primary/12 text-primary border-primary/25"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 border-transparent",
        )}
      >
        <span className="relative z-10">{label}</span>
        <ChevronDown
          className={cn(
            "relative z-10 w-3.5 h-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
        {isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-4" />
        )}
      </button>

      {/* Popover panel */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-40 rounded-xl border border-outline-variant bg-surface-container shadow-md overflow-hidden z-50",
          "transition-all duration-200 origin-top",
          open
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none",
        )}
      >
        <div className="flex flex-col py-1.5">
          {items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-2.5 text-sm font-semibold font-headline tracking-tight transition-colors duration-150 flex items-center justify-between",
                  active
                    ? "text-primary bg-primary/8"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60",
                )}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Mobile accordion ──────────────────────────────────────────────────────────

function MobileGroup({
  label,
  items,
  isActive,
}: {
  label: string;
  items: NavLink[];
  isActive: boolean;
}) {
  const [open, setOpen] = useState(isActive);
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "relative px-4 py-3.5 text-base font-bold rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-between border",
          isActive
            ? "bg-primary/10 text-primary border-primary/20"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 border-transparent",
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Accordion body */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 pl-4 pt-1 pb-1">
          {items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-between border",
                    active
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 border-transparent",
                  )}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </Link>
              </SheetClose>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main Navigation component ─────────────────────────────────────────────────

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
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isGroupActive = useCallback(
    (items: NavLink[]) => items.some((i) => pathname.startsWith(i.href)),
    [pathname],
  );

  if (variant === "mobile") {
    return (
      <nav className={cn("flex flex-col gap-2 w-full", className)}>
        {navStructure.map((item) => {
          if (item.type === "link") {
            const active = isLinkActive(item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-4 py-3.5 text-base font-bold rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-between group border",
                    active
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 border-transparent",
                  )}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </Link>
              </SheetClose>
            );
          }

          return (
            <MobileGroup
              key={item.label}
              label={item.label}
              items={item.items}
              isActive={isGroupActive(item.items)}
            />
          );
        })}
      </nav>
    );
  }

  // Desktop variant
  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {navStructure.map((item) => {
        if (item.type === "link") {
          const active = isLinkActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-semibold font-headline tracking-tight rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center overflow-hidden border",
                active
                  ? "bg-primary/12 text-primary border-primary/25"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 border-transparent",
              )}
            >
              <span className="relative z-10">{item.label}</span>
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-4" />
              )}
            </Link>
          );
        }

        return (
          <DesktopGroup
            key={item.label}
            label={item.label}
            items={item.items}
            isActive={isGroupActive(item.items)}
          />
        );
      })}
    </nav>
  );
}
