import { Bug, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { AccountAccess } from "@/components/account-access";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";

interface HeaderProps {
  usuarioAutenticado: UsuarioAutenticadoResumen | null;
}

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/peticiones", label: "Peticiones" },
  { href: "/noticias", label: "Noticias" },
  { href: "/nosotros", label: "Nosotros" },
];

export function Header({ usuarioAutenticado }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 active:scale-95 transition-transform duration-100"
        >
          <div className="text-primary flex items-center justify-center">
            <Bug className="h-6 w-6" />
          </div>
          <span className="hidden text-xl font-black text-on-background tracking-tighter sm:block">
            InsectosVivos
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-on-surface transition-colors font-headline tracking-tight hover:bg-surface-container-high transition-all duration-200 active:scale-95 px-3 py-1 rounded-md"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <AccountAccess usuario={usuarioAutenticado} variant="desktop" />

          {usuarioAutenticado?.acceso.esAdministrador && (
            <Link
              href="/administracion"
              className="hidden sm:flex text-on-surface-variant hover:text-on-surface transition-colors active:scale-95 duration-100 items-center justify-center"
              title="Administración"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Administración</span>
            </Link>
          )}

          <Link href="/peticiones/crear" className="hidden sm:block">
            <button
              type="button"
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label text-sm tracking-widest uppercase hover:bg-primary-fixed-dim transition-colors active:scale-95 duration-100 font-bold"
            >
              Crear Petición
            </button>
          </Link>

          <Sheet>
            <SheetTrigger className="inline-flex size-9 items-center justify-center rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all active:scale-95 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-outline-variant bg-surface-container-lowest"
            >
              <div className="mt-8 flex flex-col gap-4">
                <AccountAccess usuario={usuarioAutenticado} variant="mobile" />
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="px-4 py-3 text-lg font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors rounded-lg"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                {usuarioAutenticado?.acceso.esAdministrador && (
                  <SheetClose asChild>
                    <Link href="/administracion">
                      <Button
                        variant="outline"
                        className="w-full gap-2 py-6 text-lg font-bold bg-transparent border-outline-variant text-on-background hover:bg-surface-container-high"
                      >
                        <Settings className="h-5 w-5" />
                        Administración
                      </Button>
                    </Link>
                  </SheetClose>
                )}
                <SheetClose asChild>
                  <Link href="/peticiones/crear">
                    <button
                      type="button"
                      className="w-full bg-primary text-on-primary py-4 rounded-lg font-label text-sm tracking-widest uppercase hover:bg-primary-fixed-dim transition-colors active:scale-95 duration-100 font-bold"
                    >
                      Crear Petición
                    </button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
