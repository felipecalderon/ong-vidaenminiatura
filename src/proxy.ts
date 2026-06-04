import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resolverAccesoUsuario } from "@/features/usuarios/access";
import { auth0 } from "./lib/auth0";

/**
 *
 * @param request By Next
 * @returns NextResponse by Next
 * The proxy layer automatically mounts these authentication routes:
 * /auth/login - Redirects to Auth0 login page
 * /auth/logout - Logs out the user
 * /auth/callback - Handles the OAuth callback
 * /auth/profile - Returns the user profile as JSON
 * /auth/access-token - Returns the access token
 * /auth/backchannel-logout - Receives a logout_token when a configured Back-Channel Logout initiator occurs
 */
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (/^\/auth(?:\/|$)/.test(pathname)) {
    return auth0.middleware(request);
  }

  const authResponse = await auth0.middleware(request);
  const requerimientoAcceso = resolverRequerimientoAcceso(pathname);

  if (!requerimientoAcceso) {
    return authResponse;
  }

  const session = await auth0.getSession(request);
  const usuarioSesion = session?.user as
    | {
        usuario?: {
          auth0Id?: string;
          correo?: string;
          nombre?: string;
          picture?: string | null;
          rol?: "USUARIO" | "AUTOR" | "ADMINISTRADOR";
          estado?: "ACTIVO" | "SUSPENDIDO";
        };
        auth0Id?: string;
        correo?: string;
        nombre?: string;
        picture?: string | null;
        rol?: "USUARIO" | "AUTOR" | "ADMINISTRADOR";
        estado?: "ACTIVO" | "SUSPENDIDO";
      }
    | undefined;
  const usuarioLocal = usuarioSesion?.usuario ?? usuarioSesion;

  if (!session?.user?.sub || !usuarioLocal?.rol || !usuarioLocal?.estado) {
    return redirigirALogin(request);
  }

  const acceso = resolverAccesoUsuario({
    rol: usuarioLocal.rol,
    estado: usuarioLocal.estado,
  });

  if (!acceso.puedeAcceder) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    requerimientoAcceso === "backoffice" &&
    !acceso.puedeGestionarBackoffice
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (requerimientoAcceso === "contenido" && !acceso.puedeCrearContenido) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return authResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

type RequerimientoAcceso = "contenido" | "backoffice";

const RUTAS_BACKOFFICE = [
  /^\/dashboard(?:\/|$)/,
  /^\/admin(?:\/|$)/,
  /^\/backoffice(?:\/|$)/,
  /^\/administracion(?:\/|$)/,
];

const RUTAS_CONTENIDO = [
  /^\/peticiones\/crear(?:\/|$)/,
  /^\/noticias\/crear(?:\/|$)/,
  /^\/peticiones\/[^/]+\/editar(?:\/|$)/,
  /^\/noticias\/[^/]+\/editar(?:\/|$)/,
];

function resolverRequerimientoAcceso(
  pathname: string,
): RequerimientoAcceso | null {
  if (RUTAS_BACKOFFICE.some((expresion) => expresion.test(pathname))) {
    return "backoffice";
  }

  if (RUTAS_CONTENIDO.some((expresion) => expresion.test(pathname))) {
    return "contenido";
  }

  return null;
}

function redirigirALogin(request: NextRequest) {
  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set(
    "returnTo",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}
