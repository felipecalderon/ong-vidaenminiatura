import Link from "next/link";
import { Bug, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

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
    <header className="sticky top-0 z-50 w-full border-b-4 border-black dark:border-white bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all">
              <Bug className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden sm:block">InsectosVivos</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 font-semibold hover:bg-primary hover:text-primary-foreground border-2 border-transparent hover:border-black dark:hover:border-white transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle currentTheme={currentTheme} />
            
            <Link href="/peticiones/crear" className="hidden sm:block">
              <Button className="font-bold border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all">
                Crear Petición
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="border-2 border-black dark:border-white">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l-4 border-black dark:border-white bg-background">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="px-4 py-3 font-bold text-lg border-2 border-black dark:border-white bg-card hover:bg-primary hover:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link href="/peticiones/crear">
                      <Button className="w-full font-bold text-lg py-6 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
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
