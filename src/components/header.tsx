import { Menu, Settings } from "lucide-react";
import Link from "next/link";
import { AccountAccess } from "@/components/account-access";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { UsuarioAutenticadoResumen } from "@/features/usuarios/types";
import { LogoIcon } from "./compartido/logo";

interface HeaderProps {
  usuarioAutenticado: UsuarioAutenticadoResumen | null;
}

export function Header({ usuarioAutenticado }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 active:scale-95 transition-transform duration-100"
        >
          <div className="text-primary flex items-center justify-center">
            <LogoIcon size={45} />
          </div>
          <div className="hidden sm:flex items-center gap-1 font-black tracking-tighter">
            <span className="relative -top-0.5 text-4xl text-emerald-800 leading-none">
              +
            </span>
            <span className="text-xl leading-none">Insectos</span>
          </div>
        </Link>

        <Navigation className="hidden md:flex" variant="desktop" />

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

          <Sheet>
            <SheetTrigger className="inline-flex size-9 items-center justify-center rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all active:scale-95 md:hidden">
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
                  <span className="relative -top-0.5 text-2xl text-emerald-800 leading-none">
                    +
                  </span>
                  <span className="text-lg leading-none">Insectos</span>
                </div>
              </div>

              {/* Scrollable content container */}
              <div className="flex-1 py-6 flex flex-col justify-between overflow-y-auto min-h-0 gap-6">
                <Navigation variant="mobile" />

                <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-outline-variant/60">
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
