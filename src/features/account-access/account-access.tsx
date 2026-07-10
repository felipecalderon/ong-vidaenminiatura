import type { UsuarioAutenticadoResumen } from "../usuarios/types";
import { DesktopAccountAccess } from "./access-desktop";
import { MobileAccountAccess } from "./access-mobile";
import { MobileAnonymousAccess } from "./access-mobile-anon";
import { LoginButton } from "./login-button";

interface AccountAccessProps {
  usuario: UsuarioAutenticadoResumen | null;
  variant: "desktop" | "mobile";
}

export function AccountAccess({ usuario, variant }: AccountAccessProps) {
  if (!usuario) {
    return variant === "desktop" ? <LoginButton /> : <MobileAnonymousAccess />;
  }

  return variant === "desktop" ? (
    <DesktopAccountAccess usuario={usuario} />
  ) : (
    <MobileAccountAccess usuario={usuario} />
  );
}
