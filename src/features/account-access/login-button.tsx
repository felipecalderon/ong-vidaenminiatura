import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <Button
      asChild
      variant="outline"
      className="not-md:hidden gap-2 border border-outline-variant rounded-full"
    >
      <a href="/auth/login" className="flex items-center gap-2">
        <LogIn className="size-4" />
        <span>Accederr</span>
      </a>
    </Button>
  );
}
