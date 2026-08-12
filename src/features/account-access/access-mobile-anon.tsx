import { LogIn } from "lucide-react";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";

export function MobileAnonymousAccess() {
  return (
    <SheetClose asChild>
      <Link
        href="/auth/login"
        prefetch={false}
        className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-transparent bg-primary px-4 py-3.5 font-bold text-on-primary transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] shadow-sm shadow-primary/20"
      >
        <LogIn className="size-4" />
        Acceder
      </Link>
    </SheetClose>
  );
}
