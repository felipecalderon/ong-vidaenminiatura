import { cambiarTema } from "@/actions/theme";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Theme } from "@/lib/theme";

interface ThemeToggleProps {
  currentTheme: Theme;
}

export function ThemeToggle({ currentTheme }: ThemeToggleProps) {
  const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
  const tooltipText =
    currentTheme === "light"
      ? "Cambiar a visión ultravioleta de abeja"
      : "Cambiar a visión humana común";

  return (
    <form action={cambiarTema}>
      <input type="hidden" name="theme" value={nextTheme} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="submit"
            variant="outline"
            size="icon"
            className="border-outline-variant bg-surface-container-low text-base shadow-none hover:border-primary/60"
          >
            {currentTheme === "dark" ? (
              <span role="img" aria-label="Cambiar a modo claro">
                😉
              </span>
            ) : (
              <span role="img" aria-label="Cambiar a visión ultravioleta">
                🐝
              </span>
            )}
            <span className="sr-only">
              Cambiar a tema {nextTheme === "dark" ? "oscuro" : "claro"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{tooltipText}</TooltipContent>
      </Tooltip>
    </form>
  );
}
