import { Menu, Settings } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AccountAccess } from "@/features/account-access/account-access";
import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";
import type { Theme } from "@/lib/theme";
import { LogoIcon } from "./compartido/logo";

interface HeaderProps {
  usuarioAutenticado: UsuarioAutenticadoResumen | null;
  currentTheme: Theme;
}

export function Header({ usuarioAutenticado, currentTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/70 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-[4.5rem] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 active:scale-95 transition-transform duration-100"
        >
          <div className="flex items-center justify-center text-primary">
            <LogoIcon size={45} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-primary">
              Más
            </span>
            <span className="text-xl font-black tracking-[-0.06em]">
              Insectos
            </span>
          </div>
        </Link>

        <Navigation className="hidden md:flex" variant="desktop" />

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle currentTheme={currentTheme} />
          <AccountAccess usuario={usuarioAutenticado} variant="desktop" />

          {usuarioAutenticado?.acceso.esAdministrador && (
            <Link
              href="/administracion"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              title="Administración"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Administración</span>
            </Link>
          )}

          <Sheet>
            <SheetTrigger className="inline-flex size-10 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-outline-variant bg-surface-container-lowest flex flex-col h-full p-6"
            >
              {/* Brand Header */}
              <div className="flex items-center gap-2.5 pb-5 border-b border-outline-variant/60">
                <div className="text-primary flex items-center justify-center">
                  <LogoIcon size={36} />
                </div>
                <div className="flex items-center gap-0.5 font-black tracking-tighter">
                  <span className="text-lg leading-none">Insectos</span>
                </div>
              </div>

              {/* Scrollable content container */}
              <div className="flex-1 py-6 flex flex-col justify-between overflow-y-auto min-h-0 gap-6">
                <Navigation variant="mobile" />

                <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-outline-variant/60">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm font-bold text-on-surface-variant font-label uppercase tracking-widest">
                      Tema
                    </span>
                    <ThemeToggle currentTheme={currentTheme} />
                  </div>

                  <AccountAccess
                    usuario={usuarioAutenticado}
                    variant="mobile"
                  />

                  {usuarioAutenticado?.acceso.esAdministrador && (
                    <SheetClose asChild>
                      <Link href="/administracion">
                        <Button
                          variant="outline"
                          className="w-full gap-2 py-5 text-base font-bold bg-transparent border-outline-variant text-on-background hover:bg-surface-container-high rounded-xl"
                        >
                          <Settings className="h-5 w-5" />
                          Administración
                        </Button>
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
