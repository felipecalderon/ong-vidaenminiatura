import { Moon, Sun } from "lucide-react";
import { cambiarTema } from "@/actions/theme";
import { Button } from "@/components/ui/button";
import type { Theme } from "@/lib/theme";

interface ThemeToggleProps {
  currentTheme: Theme;
}

export function ThemeToggle({ currentTheme }: ThemeToggleProps) {
  const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
  const Icon = currentTheme === "dark" ? Sun : Moon;

  return (
    <form action={cambiarTema}>
      <input type="hidden" name="theme" value={nextTheme} />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="border-2 border-black dark:border-white"
      >
        <Icon className="h-5 w-5" />
        <span className="sr-only">
          Cambiar a tema {nextTheme === "dark" ? "oscuro" : "claro"}
        </span>
      </Button>
    </form>
  );
}
