import { Bug, Menu } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeaderProps {
  currentTheme: "light" | "dark";
}

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/peticiones", label: "Peticiones" },
  { href: "/noticias", label: "Noticias" },
  { href: "/nosotros", label: "Nosotros" },
];

export function Header({ currentTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-secondary dark:border-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="border-2 border-black bg-primary p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:group-hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <Bug className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="hidden text-xl font-bold sm:block">
              InsectosVivos
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-2 border-transparent px-4 py-2 font-semibold transition-all hover:border-black hover:bg-primary hover:text-primary-foreground dark:hover:border-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle currentTheme={currentTheme} />

            <Link href="/peticiones/crear" className="hidden sm:block">
              <Button className="border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                Crear Petición
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-2 border-black dark:border-white"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-l-4 border-black bg-background dark:border-white"
              >
                <div className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="border-2 border-black bg-card px-4 py-3 text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-primary hover:text-primary-foreground dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link href="/peticiones/crear">
                      <Button className="w-full border-2 border-black py-6 text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                        Crear Petición
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
