"use client";

import {
  BookOpen,
  ClipboardList,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  Mail,
  Menu,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AdminNavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface AdminNavigationGroup {
  label: string;
  items: AdminNavigationItem[];
}

const navigationGroups: AdminNavigationGroup[] = [
  {
    label: "General",
    items: [
      { href: "/administracion", label: "Resumen", icon: LayoutDashboard },
    ],
  },
  {
    label: "Contenido",
    items: [
      { href: "/administracion/noticias", label: "Noticias", icon: Newspaper },
      {
        href: "/administracion/peticiones",
        label: "Peticiones",
        icon: ClipboardList,
      },
      {
        href: "/administracion/publicaciones",
        label: "Publicaciones",
        icon: FileText,
      },
      {
        href: "/administracion/recursos-educativos",
        label: "Recursos educativos",
        icon: BookOpen,
      },
      {
        href: "/administracion/categorias",
        label: "Categorías",
        icon: Settings,
      },
    ],
  },
  {
    label: "Comunidad",
    items: [
      { href: "/administracion/usuarios", label: "Usuarios", icon: Users },
      {
        href: "/administracion/invitaciones",
        label: "Invitaciones",
        icon: Mail,
      },
    ],
  },
];

function esRutaActiva(pathname: string, href: string) {
  return href === "/administracion"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

function obtenerSeccionActual(pathname: string) {
  return (
    navigationGroups
      .flatMap((group) => group.items)
      .find((item) => esRutaActiva(pathname, item.href))?.label ??
    "Administración"
  );
}

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {navigationGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
            {group.label}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const isActive = esRutaActiva(pathname, item.href);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActive
                        ? "bg-primary-container text-on-primary-container"
                        : "text-muted-foreground hover:bg-surface-container hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function AdminNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentSection = obtenerSeccionActual(pathname);

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">
            Administración
          </p>
          <p className="truncate text-sm font-semibold text-foreground">
            {currentSection}
          </p>
        </div>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-11 shrink-0"
              aria-label="Abrir menú de administración"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(20rem,calc(100vw-2rem))] gap-0 border-outline-variant p-0"
          >
            <SheetHeader className="border-b border-outline-variant px-5 py-5 pr-14 text-left">
              <SheetTitle className="text-lg">Administración</SheetTitle>
              <SheetDescription>
                Navega entre las áreas de gestión.
              </SheetDescription>
            </SheetHeader>
            <nav
              aria-label="Secciones de administración"
              className="overflow-y-auto px-3 py-5"
            >
              <NavigationLinks onNavigate={() => setMobileMenuOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden self-start lg:sticky lg:top-6 lg:block">
        <nav
          aria-label="Secciones de administración"
          className="rounded-2xl border border-outline-variant bg-card p-3"
        >
          <div className="mb-4 border-b border-outline-variant px-3 pb-4">
            <p className="text-sm font-semibold text-foreground">
              Administración
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Herramientas de la plataforma
            </p>
          </div>
          <NavigationLinks />
        </nav>
      </aside>
    </>
  );
}
